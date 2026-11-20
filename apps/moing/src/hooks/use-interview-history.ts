/**
 * @fileoverview use-interview-history
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef } from 'react';
import { questionTypes, type Config, type QuestionType } from '@/contexts/config';
import type { InterviewObj } from '@/hooks/use-interview-obj';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewHistory() {
  const historyRef = useRef<InterviewObj[]>([]);
  const questionTypeRef = useRef<QuestionType[]>([]);
  const rowRef = useRef<number>(0);
  const colRef = useRef<number>(0);

  const initInterviewHistory = (config: Config) => {
    const { main, sub } = config;

    questionTypeRef.current = questionTypes.filter(key => config[key]); // Extract only the keys with true values
    rowRef.current = main;
    colRef.current = sub + 1;
  };
  const isQuestionMain = () => historyRef.current.length % colRef.current === 0;
  const isInterviewDone = () =>
    historyRef.current.length ===
    questionTypeRef.current.length * rowRef.current * colRef.current;
  const getQuestionMainHistory = () => {
    const questionMainHistory = [];

    for (let i = 0; i < historyRef.current.length; i += colRef.current) {
      questionMainHistory.push(historyRef.current[i].question);
    }

    return questionMainHistory;
  };
  const getInterviewInfo = (index = historyRef.current.length) => ({
    questionType:
      questionTypeRef.current[Math.floor(index / (rowRef.current * colRef.current))],
    questionMain: (Math.floor(index / colRef.current) % rowRef.current) + 1,
    questionSub: (index % colRef.current) + 1,
  });
  const getInterviewHistory = () => {
    let str = '';

    const printAllStrings = (obj: InterviewObj) => {
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

  return {
    interviewHistoryRef: historyRef,
    initInterviewHistory,
    isQuestionMain,
    isInterviewDone,
    getQuestionMainHistory,
    getInterviewInfo,
    getInterviewHistory,
  };
}
