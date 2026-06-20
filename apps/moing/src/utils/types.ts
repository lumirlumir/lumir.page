import type {
  ChatCompletionSystemMessageParam,
  ChatCompletionAssistantMessageParam,
  ChatCompletionUserMessageParam,
} from '@lumir/types/openai';

export type CustomChatCompletionMessageParam =
  | ChatCompletionSystemMessageParam
  | ChatCompletionAssistantMessageParam
  | ChatCompletionUserMessageParam;
