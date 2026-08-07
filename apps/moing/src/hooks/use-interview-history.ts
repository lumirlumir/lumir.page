/**
 * @fileoverview use-interview-history
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef } from 'react';
import { questionTypes, type Config, type QuestionType } from '@/contexts/config-context';
import { type InterviewObj } from '@/hooks/use-interview-obj';

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
  const getInterviewInfo = () => ({
    questionType:
      questionTypeRef.current[
        Math.floor(historyRef.current.length / (rowRef.current * colRef.current))
      ],
    questionMain:
      (Math.floor(historyRef.current.length / colRef.current) % rowRef.current) + 1,
    questionSub: (historyRef.current.length % colRef.current) + 1,
  });
  const getInterviewHistory = () => {
    let str = '';

    const printAllStrings = (obj: InterviewObj) => {
      Object.values(obj).map(val => {
        if (typeof val === 'string') {
          str += `---\n\n${val}\n\n`;
        } else if (typeof val === 'object') {
          printAllStrings(val);
        }
        return null;
      });
    };

    for (let i = 0; i < historyRef.current.length; i += 1) {
      const questionType =
        questionTypeRef.current[Math.floor(i / (rowRef.current * colRef.current))];
      const questionMain = (Math.floor(i / colRef.current) % rowRef.current) + 1;
      const questionSub = (i % colRef.current) + 1;

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
