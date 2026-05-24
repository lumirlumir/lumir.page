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
  const [interviewObj, setInterviewObj] = useState<InterviewObj>(INTERVIEW_OBJ);

  const initInterviewObj = () => {
    setInterviewObj(prevState => ({
      ...prevState,
      ...INTERVIEW_OBJ,
    }));
  };
  const addInterviewObj = (obj: Partial<InterviewObj>) => {
    setInterviewObj(prevState => ({
      ...prevState,
      ...obj,
    }));
  };
  const isInterviewObjEmpty = () =>
    interviewObj.question === null &&
    interviewObj.answerSystem === null &&
    interviewObj.answerUser === null &&
    interviewObj.feedback === null;
  const isInterviewObjFull = () =>
    interviewObj.question !== null &&
    interviewObj.answerSystem !== null &&
    interviewObj.answerUser !== null &&
    interviewObj.feedback !== null;
  const isOnlyFeedbackEmpty = () =>
    interviewObj.question !== null &&
    interviewObj.answerSystem !== null &&
    interviewObj.answerUser !== null &&
    interviewObj.feedback === null;

  return {
    interviewObj,
    initInterviewObj,
    addInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
  };
}
