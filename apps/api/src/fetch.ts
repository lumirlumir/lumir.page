/**
 * @fileoverview fetch.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import OpenAI from 'openai';
import { questionMain, questionSub, answer, feedback } from './prompt.ts';
import { type CustomChatCompletionMessageParam, type QuestionType } from './types.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const openaiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetches a response from OpenAI's chat completion API.
 */
async function fetching(messages: CustomChatCompletionMessageParam[]): Promise<string> {
  const response = await openaiInstance.chat.completions.create({
    ...{
      model: 'gpt-4.1-nano',
      temperature: 1,
      top_p: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_completion_tokens: 2048,
    },
    messages,
  });

  // @ts-expect-error -- TODO
  return response?.choices?.[0]?.message?.content;
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

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Fetches the main question.
 */
export async function fetchQuestionMain(
  type: QuestionType,
  history: string[],
): Promise<string> {
  return fetching([
    ...questionMain[type].messages,
    ...history.map(text => createMessageObject('assistant', text)),
  ]);
}

/**
 * Fetches the sub question.
 */
export async function fetchQuestionSub(
  question: string,
  answerUser: string,
): Promise<string> {
  return fetching([
    ...questionSub.messages,
    createMessageObject(
      'user',
      `Previous Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}

/**
 * Fetches the answer.
 */
export async function fetchAnswer(question: string): Promise<string> {
  return fetching([...answer.messages, createMessageObject('user', question)]);
}

/**
 * Fetches the feedback.
 */
export async function fetchFeedback(
  answerSystem: string,
  answerUser: string,
): Promise<string> {
  return fetching([
    ...feedback.messages,
    createMessageObject(
      'user',
      `Correct Answer\n\n${answerSystem}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}
