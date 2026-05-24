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

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function createURL(pathname: string, urlSearchParams: URLSearchParams): string {
  return `http://${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}/${pathname}?${urlSearchParams.toString()}`;
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
    fetchFeedback(interviewObjState.answerSystem, interviewObjState.answerUser).then(
      result => {
        addInterviewObj({ feedback: JSON.parse(result) });
      },
    );
  }, [interviewObjState, addInterviewObj]);

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
    isInterviewStarted,
  ]);

  const initInterview = (configState: Config) => {
    initInterviewHistory(configState);
    setIsInterviewStarted(true);
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
