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
import { questionTypes, type Config, type QuestionType } from '@/contexts/config';
import * as prompts from '../utils/prompt.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents an interview consisting of a question, the user's answer, and feedback.
 */
interface Interview {
  /**
   * The question being asked in the interview.
   */
  readonly question: string;

  /**
   * The user's answer to the question.
   */
  readonly answer: string;

  /**
   * The feedback derived from the question and the user's answer.
   */
  readonly feedback: {
    /**
     * The textual feedback for the question and the user's answer.
     */
    readonly feedback: string;

    /**
     * The score for the user's answer.
     */
    readonly score: 'poor' | 'fair' | 'good';
  };
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Fetches chat completion text from the backend API.
 */
async function fetchChatCompletionText(
  ...messages: ChatCompletionMessageParam[]
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

function fetchQuestionMain(type: QuestionType, history: string[]): Promise<string> {
  return fetchChatCompletionText(
    ...prompts.questionMain[type],
    ...history.map(content => ({ role: 'assistant' as const, content })),
  );
}

function fetchQuestionSub(question: string, answerUser: string) {
  return fetchChatCompletionText(...prompts.questionSub, {
    role: 'user',
    content: `Previous Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
  });
}

function fetchFeedback(question: string, answerUser: string) {
  return fetchChatCompletionText(...prompts.feedback, {
    role: 'user',
    content: `Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
  });
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterview<T extends HTMLElement>() {
  const contentRef = useRef<T | null>(null);
  const historyRef = useRef<Interview[]>([]);
  const questionConfigRef = useRef({
    selectedTypes: [] as QuestionType[],
    mainQuestionsPerType: 0,
    questionsPerMain: 0,
  });
  const turnRef = useRef<{
    question: Promise<string | null>;
    submitted: boolean;
  } | null>(null);
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(
    () => () => {
      turnRef.current = null;
    },
    [],
  );

  const isInterviewDone = () => {
    const { selectedTypes, mainQuestionsPerType, questionsPerMain } =
      questionConfigRef.current;
    return (
      historyRef.current.length ===
      selectedTypes.length * mainQuestionsPerType * questionsPerMain
    );
  };

  const getQuestionMainHistory = () => {
    const questionMainHistory = [];
    const { questionsPerMain } = questionConfigRef.current;

    for (let i = 0; i < historyRef.current.length; i += questionsPerMain) {
      questionMainHistory.push(historyRef.current[i].question);
    }

    return questionMainHistory;
  };

  const getInterviewInfo = (index = historyRef.current.length) => {
    const { selectedTypes, mainQuestionsPerType, questionsPerMain } =
      questionConfigRef.current;
    const mainIndex = Math.floor(index / questionsPerMain);

    return {
      index,
      questionType: selectedTypes[Math.floor(mainIndex / mainQuestionsPerType)],
      questionMain: (mainIndex % mainQuestionsPerType) + 1,
      questionSub: (index % questionsPerMain) + 1,
    };
  };

  const getInterviewHistory = () => {
    let str = '';

    for (let i = 0; i < historyRef.current.length; i += 1) {
      const { questionType, questionMain, questionSub } = getInterviewInfo(i);
      const { question: questionText, answer, feedback } = historyRef.current[i];

      str += `> ${questionType.toUpperCase()}분야 ${questionMain}-${questionSub}번 문제, 사용자 답변, 피드백, 성적입니다.\n\n`;

      for (const text of [questionText, answer, feedback.feedback, feedback.score]) {
        if (typeof text === 'string') {
          str += `---\n\n${text}\n\n`;
        }
      }

      str += '----------------------------------------\n\n';
    }

    return str;
  };

  const startNextQuestion = async () => {
    setQuestion(null);

    if (isInterviewDone()) {
      turnRef.current = null;
      return;
    }

    const previous = historyRef.current.at(-1);
    const { questionType, questionSub } = getInterviewInfo();
    const request =
      !previous || questionSub === 1
        ? fetchQuestionMain(questionType, getQuestionMainHistory())
        : fetchQuestionSub(previous.question, previous.answer);

    const turn = {
      question: request.catch(error => {
        window.reportError(error);
        return null;
      }),
      submitted: false,
    };
    turnRef.current = turn;

    const text = await turn.question;
    if (turnRef.current === turn) setQuestion(text);
  };

  const initInterview = (config: Config) => {
    if (turnRef.current) return;

    questionConfigRef.current = {
      selectedTypes: questionTypes.filter(key => config[key]),
      mainQuestionsPerType: config.main,
      questionsPerMain: config.sub + 1,
    };
    startNextQuestion();
  };

  const submit = async (questionIndex = historyRef.current.length) => {
    const turn = turnRef.current;
    const input = contentRef.current;
    if (!input || !turn || turn.submitted || questionIndex !== historyRef.current.length)
      return;

    turn.submitted = true;
    const answer = input.innerText;
    input.innerHTML = '';

    try {
      const questionText = await turn.question;
      if (!questionText || turnRef.current !== turn) return;

      const feedback = JSON.parse(await fetchFeedback(questionText, answer));
      if (feedback === null || turnRef.current !== turn) return;

      historyRef.current.push({ question: questionText, answer, feedback });
      startNextQuestion();
    } catch (error) {
      window.reportError(error);
    } finally {
      turn.submitted = false;
    }
  };

  return {
    contentRef,
    question,
    isInterviewDone,
    getInterviewInfo,
    getInterviewHistory,
    initInterview,
    submit,
  };
}
