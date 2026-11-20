/**
 * @fileoverview use-interview
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';
import type {
  ChatCompletion,
  ChatCompletionCreateRequestBody,
  ChatCompletionMessageParam,
} from '@lumir/types/openai';

import type { Config, QuestionType } from '@/contexts/config';
import useInterviewContent from '@/hooks/use-interview-content';
import useInterviewHistory from '@/hooks/use-interview-history';

import {
  questionMain,
  questionSub,
  answer,
  feedback as feedbackPrompt,
} from '../utils/prompt.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Fetches chat completion text from the backend API.
 */
async function fetchChatCompletionText(
  messages: ChatCompletionMessageParam[],
): Promise<string> {
  if (process.env.BACKEND_URL === undefined) {
    throw new Error('BACKEND_URL is not defined');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      max_completion_tokens: 2048,
      reasoning_effort: 'high',
      temperature: 1,
    } satisfies ChatCompletionCreateRequestBody),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}\n${text}`);
  }

  const json: ChatCompletion = JSON.parse(text);

  return json?.choices?.[0]?.message?.content ?? '';
}

/**
 * Creates a message object for OpenAI API.
 */
function createMessageObject(
  role: ChatCompletionMessageParam['role'],
  text: string,
): ChatCompletionMessageParam {
  return {
    role,
    content: [
      {
        text,
        type: 'text',
      },
    ],
  };
}

async function fetchQuestionMain(type: QuestionType, history: string[]): Promise<string> {
  return fetchChatCompletionText([
    ...questionMain[type].messages,
    ...history.map(text => createMessageObject('assistant', text)),
  ]);
}

async function fetchQuestionSub(question: string, answerUser: string) {
  return fetchChatCompletionText([
    ...questionSub.messages,
    createMessageObject(
      'user',
      `Previous Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}

async function fetchAnswer(question: string) {
  return fetchChatCompletionText([
    ...answer.messages,
    createMessageObject('user', question),
  ]);
}

async function fetchFeedback(answerSystem: string, answerUser: string) {
  return fetchChatCompletionText([
    ...feedbackPrompt.messages,
    createMessageObject(
      'user',
      `Correct Answer\n\n${answerSystem}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterview<T extends HTMLElement>() {
  const { contentRef, listening, toggleListening } = useInterviewContent<T>();
  const {
    interviewHistoryRef,
    initInterviewHistory,
    isQuestionMain,
    isInterviewDone,
    getQuestionMainHistory,
    getInterviewInfo,
    getInterviewHistory,
  } = useInterviewHistory();
  const [question, setQuestion] = useState<string | null>(null);
  const turnRef = useRef<{
    answers: Promise<{ question: string; answerSystem: string } | null>;
    submitted: boolean;
  } | null>(null);

  useEffect(
    () => () => {
      turnRef.current = null;
    },
    [],
  );

  const startNextQuestion = () => {
    setQuestion(null);

    if (isInterviewDone()) {
      turnRef.current = null;
      return;
    }

    const previous = interviewHistoryRef.current.at(-1);
    const request =
      !previous || isQuestionMain()
        ? fetchQuestionMain(getInterviewInfo().questionType, getQuestionMainHistory())
        : fetchQuestionSub(previous.question, previous.answerUser);

    const answers = request.then(async text => {
      if (!turnRef.current) return null;

      setQuestion(text);

      return { question: text, answerSystem: await fetchAnswer(text) };
    });

    turnRef.current = {
      answers: answers.catch(error => {
        window.reportError(error);
        return null;
      }),
      submitted: false,
    };
  };

  const initInterview = (config: Config) => {
    if (turnRef.current) return;

    initInterviewHistory(config);
    startNextQuestion();
  };

  const submit = async (questionIndex = interviewHistoryRef.current.length) => {
    const turn = turnRef.current;
    const input = contentRef.current;
    if (
      !input ||
      !turn ||
      turn.submitted ||
      questionIndex !== interviewHistoryRef.current.length
    )
      return;

    turn.submitted = true;
    const answerUser = input.innerText;
    input.innerHTML = '';

    try {
      const answers = await turn.answers;
      if (!answers || turnRef.current !== turn) return;

      const feedback = JSON.parse(await fetchFeedback(answers.answerSystem, answerUser));
      if (feedback === null || turnRef.current !== turn) return;

      interviewHistoryRef.current.push({ ...answers, answerUser, feedback });
      startNextQuestion();
    } catch (error) {
      window.reportError(error);
    } finally {
      turn.submitted = false;
    }
  };

  return {
    contentRef,
    listening,
    question,
    toggleListening,
    isInterviewDone,
    getInterviewInfo,
    getInterviewHistory,
    initInterview,
    submit,
  };
}
