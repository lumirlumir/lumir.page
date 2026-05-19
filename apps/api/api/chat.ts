/**
 * @fileoverview TODO
 * @see https://vercel.com/docs/functions
 * @see https://aistudio.google.com
 * @see https://ai.google.dev/gemini-api/docs
 * @see https://ai.google.dev/gemini-api/docs/openai
 */

// --------------------------------------------------------------------------------
// Temp
// --------------------------------------------------------------------------------

// import {
//   fetchQuestionMain,
//   fetchQuestionSub,
//   fetchAnswer,
//   fetchFeedback,
// } from './fetch.ts';

/*
    const { pathname, query } = new URL(req.url);
    const urlSearchParams = new URLSearchParams(query); // for array
*/

/*
    console.log(`TIME: ${new Date()}\nMETHOD: ${req.method}\nURL: ${req.url}`); // eslint-disable-line no-console -- for debugging.
    console.log(urlSearchParams, '\n'); // eslint-disable-line no-console -- for debugging.

    if (req.method === 'GET') {
      switch (pathname) {
        case '/question/main': {
          const type = urlSearchParams.get('type');
          const history = urlSearchParams.getAll('history');

          // @ts-expect-error -- TODO
          fetchQuestionMain(type, history).then(result => response(res, 200, result));
          break;
        }
        case '/question/sub': {
          const question = urlSearchParams.get('question');
          const answerUser = urlSearchParams.get('answerUser');

          // @ts-expect-error -- TODO
          fetchQuestionSub(question, answerUser).then(result =>
            response(res, 200, result),
          );
          break;
        }
        case '/answer': {
          const question = urlSearchParams.get('question');

          // @ts-expect-error -- TODO
          fetchAnswer(question).then(result => response(res, 200, result));
          break;
        }
        case '/feedback': {
          const answerSystem = urlSearchParams.get('answerSystem');
          const answerUser = urlSearchParams.get('answerUser');

          // @ts-expect-error -- TODO
          fetchFeedback(answerSystem, answerUser).then(result =>
            response(res, 200, result),
          );
          break;
        }
        default: {
          response(res, 400, 'Invalid Request');
          break;
        }
      }
    }
*/

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/*
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

const completion = await client.chat.completions.create({
  model: 'gemini-2.5',
  messages: [{ role: 'user', content: "How's the weather today in south korea, Seoul?" }],
});

console.log(completion.choices[0]?.message?.content);
*/

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/chat` API route handler.
 */
export default {
  fetch(request: Request) {
    return new Response(`Request received\n\n${request.method} ${request.url}`, {
      status: 200,
    });
  },
} as const;
