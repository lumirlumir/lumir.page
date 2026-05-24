/**
 * @fileoverview use-interview-history
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef } from 'react';
import { questionTypes, type Config } from '@/contexts/config-context';
import { type InterviewObj } from '@/hooks/use-interview-obj';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewHistory() {
  const historyRef = useRef<InterviewObj[]>([]);
  const questionTypeRef = useRef<string[]>([]);
  const rowRef = useRef<number | null>(null);
  const colRef = useRef<number | null>(null);

  const initInterviewHistory = (configState: Config) => {
    const { main, sub } = configState;

    questionTypeRef.current = questionTypes.filter(key => configState[key]); // Extract only the keys with true values
    rowRef.current = main;
    colRef.current = sub + 1;
  };
  // @ts-expect-error -- TODO
  const isQuestionMain = () => historyRef.current.length % colRef.current === 0;
  const isInterviewDone = () =>
    historyRef.current.length ===
    // @ts-expect-error -- TODO
    questionTypeRef.current.length * rowRef.current * colRef.current;
  const getQuestionMainHistory = () => {
    const questionMainHistory = [];

    // @ts-expect-error -- TODO
    for (let i = 0; i < historyRef.current.length; i += colRef.current) {
      questionMainHistory.push(historyRef.current[i].question);
    }

    return questionMainHistory;
  };
  const getInterviewInfo = () => ({
    questionType:
      questionTypeRef.current[
        // @ts-expect-error -- TODO
        Math.floor(historyRef.current.length / (rowRef.current * colRef.current))
      ],
    questionMain:
      // @ts-expect-error -- TODO
      (Math.floor(historyRef.current.length / colRef.current) % rowRef.current) + 1,
    // @ts-expect-error -- TODO
    questionSub: (historyRef.current.length % colRef.current) + 1,
  });
  const getInterviewHistory = () => {
    let str = '';

    // @ts-expect-error -- TODO
    const printAllStrings = obj => {
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
        // @ts-expect-error -- TODO
        questionTypeRef.current[Math.floor(i / (rowRef.current * colRef.current))];
      // @ts-expect-error -- TODO
      const questionMain = (Math.floor(i / colRef.current) % rowRef.current) + 1;
      // @ts-expect-error -- TODO
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
