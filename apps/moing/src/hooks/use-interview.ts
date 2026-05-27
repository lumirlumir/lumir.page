/**
 * @fileoverview use-interview
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useEffect, useState } from 'react';

import { type Config, type QuestionType } from '@/contexts/config-context';
import useInterviewContent from '@/hooks/use-interview-content';
import useInterviewHistory from '@/hooks/use-interview-history';
import useInterviewObj from '@/hooks/use-interview-obj';

import { type CustomChatCompletionMessageParam } from '../temp/types.js';
import { questionMain, questionSub, answer, feedback } from '../temp/prompt.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Fetches chat completion text from the backend API.
 */
async function fetchChatCompletionText(
  messages: CustomChatCompletionMessageParam[],
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
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}\n${text}`);
  }

  const json = JSON.parse(text);

  return json?.choices?.[0]?.message?.content ?? '';
}

/**
 * Creates a message object for OpenAI API.
 */
function createMessageObject(
  role: 'system' | 'assistant' | 'user',
  text: string,
): CustomChatCompletionMessageParam {
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
    ...feedback.messages,
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
  const {
    interviewObj,
    initInterviewObj,
    addInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
  } = useInterviewObj();
  const [isInterviewStarted, setIsInterviewStarted] = useState<boolean>(false);

  // generateChain
  const fetchChainFirst = useCallback(() => {
    const generateQuestion = isQuestionMain()
      ? // @ts-expect-error -- TODO
        fetchQuestionMain(getInterviewInfo().questionType, getQuestionMainHistory())
      : fetchQuestionSub(
          // @ts-expect-error -- TODO
          interviewHistoryRef.current.at(-1).question,
          // @ts-expect-error -- TODO
          interviewHistoryRef.current.at(-1).answerUser,
        );

    generateQuestion
      .then(result => {
        addInterviewObj({ question: result });

        return result;
      })
      .then(PrevResult => {
        fetchAnswer(PrevResult).then(result => {
          addInterviewObj({ answerSystem: result });
        });
      });
  }, [
    interviewHistoryRef,
    isQuestionMain,
    getQuestionMainHistory,
    getInterviewInfo,
    addInterviewObj,
  ]);
  const fetchChainSecond = useCallback(() => {
    // @ts-expect-error -- TODO
    fetchFeedback(interviewObj.answerSystem, interviewObj.answerUser).then(result => {
      addInterviewObj({ feedback: JSON.parse(result) });
    });
  }, [interviewObj, addInterviewObj]);

  useEffect(() => {
    if (!isInterviewStarted) return; // before init.
    if (isInterviewDone()) return; // interview done.

    if (isInterviewObjEmpty()) {
      // console.log('fetchChainFirst()');
      fetchChainFirst();
    }
    if (isOnlyFeedbackEmpty()) {
      // console.log('fetchChainSecond()');
      fetchChainSecond();
    }
    if (isInterviewObjFull()) {
      // console.log('addInterviewHistory()');
      interviewHistoryRef.current.push(interviewObj);
      // console.log('initInterviewObj()');
      initInterviewObj();
    }
  }, [
    interviewHistoryRef,
    isInterviewDone,
    interviewObj,
    initInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
    fetchChainFirst,
    fetchChainSecond,
    isInterviewStarted,
  ]);

  const initInterview = (config: Config) => {
    initInterviewHistory(config);
    setIsInterviewStarted(true);
  };
  const submit = () => {
    if (contentRef.current === null) return;

    addInterviewObj({ answerUser: contentRef.current.innerText });
    contentRef.current.innerHTML = '';
  };

  return {
    contentRef,
    listening,
    question: interviewObj.question,
    toggleListening,
    isInterviewDone,
    getInterviewInfo,
    getInterviewHistory,
    initInterview,
    submit,
  };
}
