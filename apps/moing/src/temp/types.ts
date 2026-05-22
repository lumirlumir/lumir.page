import type { OpenAI } from 'openai';

export type CustomChatCompletionMessageParam =
  | OpenAI.ChatCompletionSystemMessageParam
  | OpenAI.ChatCompletionAssistantMessageParam
  | OpenAI.ChatCompletionUserMessageParam;
