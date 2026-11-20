/**
 * @fileoverview use-interview
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from '@lumir/react-kit/hooks';
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

interface InterviewFeedback {
  readonly feedback: string;
  readonly score: 'poor' | 'fair' | 'good';
}

interface InterviewObj {
  readonly question: string;
  readonly answerSystem: string;
  readonly answerUser: string;
  readonly feedback: InterviewFeedback;
}

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
    ...prompts.questionMain[type].messages,
    ...history.map(text => createMessageObject('assistant', text)),
  ]);
}

async function fetchQuestionSub(question: string, answerUser: string) {
  return fetchChatCompletionText([
    ...prompts.questionSub.messages,
    createMessageObject(
      'user',
      `Previous Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}

async function fetchAnswer(question: string) {
  return fetchChatCompletionText([
    ...prompts.answer.messages,
    createMessageObject('user', question),
  ]);
}

async function fetchFeedback(answerSystem: string, answerUser: string) {
  return fetchChatCompletionText([
    ...prompts.feedback.messages,
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
  const contentRef = useRef<T | null>(null);
  const prevContentRef = useRef<string>('');
  const {
    listening,
    transcript,
    resetTranscript,
    toggleListening: toggleSpeechRecognition,
  } = useSpeechRecognition({ continuous: true, lang: 'ko-KR' });
  const historyRef = useRef<InterviewObj[]>([]);
  const questionTypesRef = useRef<QuestionType[]>([]);
  const mainQuestionsPerTypeRef = useRef(0); // row
  const questionsPerMainRef = useRef(0); // column
  const [question, setQuestion] = useState<string | null>(null);
  const turnRef = useRef<{
    answers: Promise<{ question: string; answerSystem: string } | null>;
    submitted: boolean;
  } | null>(null);

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerText = prevContentRef.current + transcript;
  }, [transcript]);

  useEffect(
    () => () => {
      turnRef.current = null;
    },
    [],
  );

  const toggleListening = () => {
    if (!listening && contentRef.current)
      prevContentRef.current = contentRef.current.innerText;
    toggleSpeechRecognition();
    if (!listening) resetTranscript();
  };

  const isInterviewDone = () =>
    historyRef.current.length ===
    questionTypesRef.current.length *
      mainQuestionsPerTypeRef.current *
      questionsPerMainRef.current;

  const getQuestionMainHistory = () => {
    const questionMainHistory = [];

    for (let i = 0; i < historyRef.current.length; i += questionsPerMainRef.current) {
      questionMainHistory.push(historyRef.current[i].question);
    }

    return questionMainHistory;
  };

  const getInterviewInfo = (index = historyRef.current.length) => {
    const mainIndex = Math.floor(index / questionsPerMainRef.current);

    return {
      index,
      questionType:
        questionTypesRef.current[Math.floor(mainIndex / mainQuestionsPerTypeRef.current)],
      questionMain: (mainIndex % mainQuestionsPerTypeRef.current) + 1,
      questionSub: (index % questionsPerMainRef.current) + 1,
    };
  };

  const getInterviewHistory = () => {
    let str = '';

    const printAllStrings = (obj: InterviewObj | InterviewFeedback) => {
      for (const val of Object.values(obj)) {
        if (typeof val === 'string') {
          str += `---\n\n${val}\n\n`;
        } else if (typeof val === 'object') {
          printAllStrings(val);
        }
      }
    };

    for (let i = 0; i < historyRef.current.length; i += 1) {
      const { questionType, questionMain, questionSub } = getInterviewInfo(i);

      str += `> ${questionType.toUpperCase()}분야 ${questionMain}-${questionSub}번 문제, 해설, 사용자 답변, 피드백, 성적입니다.\n\n`;
      printAllStrings(historyRef.current[i]);
      str += '----------------------------------------\n\n';
    }

    return str;
  };

  const startNextQuestion = () => {
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

    questionTypesRef.current = questionTypes.filter(key => config[key]);
    mainQuestionsPerTypeRef.current = config.main;
    questionsPerMainRef.current = config.sub + 1;
    startNextQuestion();
  };

  const submit = async (questionIndex = historyRef.current.length) => {
    const turn = turnRef.current;
    const input = contentRef.current;
    if (!input || !turn || turn.submitted || questionIndex !== historyRef.current.length)
      return;

    turn.submitted = true;
    const answerUser = input.innerText;
    input.innerHTML = '';

    try {
      const answers = await turn.answers;
      if (!answers || turnRef.current !== turn) return;

      const feedback = JSON.parse(await fetchFeedback(answers.answerSystem, answerUser));
      if (feedback === null || turnRef.current !== turn) return;

      historyRef.current.push({ ...answers, answerUser, feedback });
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
