/**
 * @fileoverview use-interview-obj
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface InterviewObj {
  readonly question: string | null;
  readonly answerSystem: string | null;
  readonly answerUser: string | null;
  readonly feedback: unknown | null; // TODO: remove `unknown`
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const INTERVIEW_OBJ: InterviewObj = Object.freeze({
  question: null,
  answerSystem: null,
  answerUser: null,
  feedback: null,
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewObj() {
  const [interviewObjState, setInterviewObjState] = useState<InterviewObj>(INTERVIEW_OBJ);

  const initInterviewObj = () => {
    setInterviewObjState(prevState => ({
      ...prevState,
      ...INTERVIEW_OBJ,
    }));
  };
  const addInterviewObj = (obj: Partial<InterviewObj>) => {
    setInterviewObjState(prevState => ({
      ...prevState,
      ...obj,
    }));
  };
  const isInterviewObjEmpty = () =>
    interviewObjState.question === null &&
    interviewObjState.answerSystem === null &&
    interviewObjState.answerUser === null &&
    interviewObjState.feedback === null;
  const isInterviewObjFull = () =>
    interviewObjState.question !== null &&
    interviewObjState.answerSystem !== null &&
    interviewObjState.answerUser !== null &&
    interviewObjState.feedback !== null;
  const isOnlyFeedbackEmpty = () =>
    interviewObjState.question !== null &&
    interviewObjState.answerSystem !== null &&
    interviewObjState.answerUser !== null &&
    interviewObjState.feedback === null;
  const getQuestion = () => interviewObjState.question;

  return {
    interviewObjState,
    initInterviewObj,
    addInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
    getQuestion,
  };
}
