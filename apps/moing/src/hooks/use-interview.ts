/**
 * @fileoverview use-interview
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useEffect } from 'react';

import { type Config } from '@/hooks/use-config';
import useInterviewContent from '@/hooks/use-interview-content';
import useInterviewHistory from '@/hooks/use-interview-history';
import useInterviewObj from '@/hooks/use-interview-obj';
import useTrigger from '@/hooks/use-trigger';

import type { QuestionType } from '@/hooks/use-config';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function createURL(pathname: string, urlSearchParams: URLSearchParams): string {
  const url = `http://${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}/${pathname}?${urlSearchParams.toString()}`;

  return url;
}

async function fetchQuestionMain(type: QuestionType, history: string[]) {
  const urlSearchParams = new URLSearchParams([
    ['type', type],
    ...history.map(item => ['history', item]),
  ]);

  const res = await fetch(createURL('question/main', urlSearchParams));
  const data = await res.json();

  return data?.text;
}

async function fetchQuestionSub(question: string, answerUser: string) {
  const urlSearchParams = new URLSearchParams([
    ['question', question],
    ['answerUser', answerUser],
  ]);

  const res = await fetch(createURL('question/sub', urlSearchParams));
  const data = await res.json();

  return data?.text;
}

async function fetchAnswer(question: string) {
  const urlSearchParams = new URLSearchParams([['question', question]]);

  const res = await fetch(createURL('answer', urlSearchParams));
  const data = await res.json();

  return data?.text;
}

async function fetchFeedback(answerSystem: string, answerUser: string) {
  const urlSearchParams = new URLSearchParams([
    ['answerSystem', answerSystem],
    ['answerUser', answerUser],
  ]);

  const res = await fetch(createURL('feedback', urlSearchParams));
  const data = await res.json();

  return data?.text;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterview() {
  const { contentRef, listening, toggleListening } = useInterviewContent();
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
    interviewObjState,
    initInterviewObj,
    addInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
    getQuestion,
  } = useInterviewObj();
  const { triggerState, trigger } = useTrigger();

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
    fetchFeedback(interviewObjState.answerSystem, interviewObjState.answerUser).then(
      result => {
        addInterviewObj({ feedback: JSON.parse(result) });
      },
    );
  }, [interviewObjState, addInterviewObj]);

  useEffect(() => {
    if (!triggerState) return; // before init.
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
      interviewHistoryRef.current.push(interviewObjState);
      // console.log('initInterviewObj()');
      initInterviewObj();
    }
  }, [
    interviewHistoryRef,
    isInterviewDone,
    interviewObjState,
    initInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
    fetchChainFirst,
    fetchChainSecond,
    triggerState,
  ]);

  const initInterview = (configState: Config) => {
    initInterviewHistory(configState);
    trigger();
  };
  const submit = () => {
    // @ts-expect-error -- TODO
    addInterviewObj({ answerUser: contentRef.current.innerText });
    // @ts-expect-error -- TODO
    contentRef.current.innerHTML = '';
  };

  return {
    contentRef,
    listening,
    toggleListening,
    isInterviewDone,
    getInterviewInfo,
    getInterviewHistory,
    getQuestion,
    initInterview,
    submit,
  };
}
