/**
 * @fileoverview Partial type definitions for OpenAI API
 * @see https://github.com/openai/openai-node/blob/v6.44.0/src/resources/chat/completions/completions.ts
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).
 */
export interface ChatCompletionContentPartText {
  /**
   * The text content.
   */
  text: string;

  /**
   * The type of the content part.
   */
  type: 'text';
}

/**
 * Developer-provided instructions that the model should follow,
 * regardless of messages sent by the user.
 */
export interface ChatCompletionSystemMessageParam {
  /**
   * The contents of the system message.
   */
  content: string | ChatCompletionContentPartText[];

  /**
   * The role of the messages author, in this case `system`.
   */
  role: 'system';

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;
}

/**
 * Messages sent by the model in response to user messages.
 */
export interface ChatCompletionAssistantMessageParam {
  /**
   * The contents of the assistant message. Required unless `tool_calls` or
   * `function_call` is specified.
   */
  content: string | ChatCompletionContentPartText[];

  /**
   * The role of the messages author, in this case `assistant`.
   */
  role: 'assistant';

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;
}

/**
 * Messages sent by an end user, containing prompts or additional context
 * information.
 */
export interface ChatCompletionUserMessageParam {
  /**
   * The contents of the user message.
   */
  content: string | ChatCompletionContentPartText[];

  /**
   * The role of the messages author, in this case `user`.
   */
  role: 'user';

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;
}

/**
 * Developer-provided instructions that the model should follow,
 * regardless of messages sent by the user.
 */
export type ChatCompletionMessageParam =
  | ChatCompletionSystemMessageParam
  | ChatCompletionAssistantMessageParam
  | ChatCompletionUserMessageParam;

/**
 * Parameters for creating a chat completion.
 */
export interface ChatCompletionCreateParams {
  /**
   * A list of messages comprising the conversation so far. Depending on the
   * [model](https://platform.openai.com/docs/models) you use, different message
   * types (modalities) are supported, like
   * [text](https://platform.openai.com/docs/guides/text-generation),
   * [images](https://platform.openai.com/docs/guides/vision), and
   * [audio](https://platform.openai.com/docs/guides/audio).
   */
  messages: ChatCompletionMessageParam[];

  /**
   * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI offers a
   * wide range of models with different capabilities, performance characteristics,
   * and price points. Refer to the
   * [model guide](https://platform.openai.com/docs/models) to browse and compare
   * available models.
   */
  model: string;

  /**
   * An upper bound for the number of tokens that can be generated for a completion,
   * including visible output tokens and
   * [reasoning tokens](https://platform.openai.com/docs/guides/reasoning).
   */
  max_completion_tokens?: number | null;

  /**
   * Number between `-2.0` and `2.0`. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood to
   * talk about new topics.
   */
  presence_penalty?: number | null;

  /**
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning). Currently
   * supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`.
   * Reducing reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   *
   * - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported
   *   reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool
   *   calls are supported for all reasoning values in gpt-5.1.
   * - All models before `gpt-5.1` default to `medium` reasoning effort, and do not
   *   support `none`.
   * - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
   * - `xhigh` is supported for all models after `gpt-5.1-codex-max`.
   */
  reasoning_effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

  /**
   * If set to `true`, the model response data will be streamed to the client as it is
   * generated using
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
   * See the
   * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
   * for more information, along with the
   * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
   * guide for more information on how to handle the streaming events.
   */
  stream?: boolean | null;

  /**
   * What sampling temperature to use, between `0` and `2`. Higher values like `0.8` will
   * make the output more random, while lower values like `0.2` will make it more
   * focused and deterministic. We generally recommend altering this or `top_p` but
   * not both.
   */
  temperature?: number | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with `top_p` probability mass. So `0.1`
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;
}

/**
 * Request body for creating a chat completion.
 * This type is a subset of `ChatCompletionCreateParams`
 * and includes only the fields that are relevant for the request body.
 * - NOTE: This type is not included in the OpenAI SDK.
 */
export type ChatCompletionCreateRequestBody = Pick<
  ChatCompletionCreateParams,
  'messages' | 'max_completion_tokens' | 'reasoning_effort' | 'temperature'
>;
