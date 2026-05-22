/**
 * @fileoverview prompt.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type CustomChatCompletionMessageParam } from './types.js';
import { type QuestionType } from '../hooks/use-config.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const questionMain = {
  cs: {
    messages: [
      {
        role: 'system',
        content: [
          {
            text: "Generate a list of advanced technical interview questions for a Computer Science(CS) position.\nThe questions should cover topics like algorithms, data structures, operating systems, software engineering, computer architecture, and computer networks.\nDo not include topics related to Front End(FE), Back End(BE), Database(DB), or Object Oriented Programming(OOP).\n\nRules:\n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 150 tokens and less than 300 tokens.\n- Topic of the same subject shouldn't come out in a row.\n- Ensure no question is repeated.",
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: 'JavaScript에서 비동기 처리에 대해 설명해주세요. 비동기 함수와 동기 함수의 차이점은 무엇이며, 비동기 처리의 장단점에 대해 설명해주세요. 또한, 콜백 함수, 프로미스(Promise), async/await을 활용한 비동기 처리 방법에 대해 설명하고, 각각의 사용 시나리오와 장단점에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: 'React Hooks에 대해 설명해주세요. 함수형 컴포넌트에서 상태(state)와 생명주기 메서드를 어떻게 관리할 수 있는지, useState, useEffect, useContext 등의 훅에 대해 설명해주세요. 또한, 클래스형 컴포넌트와 함수형 컴포넌트의 차이점과 React Hooks를 사용하는 이유에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
    ],
  },
  fe: {
    messages: [
      {
        role: 'system',
        content: [
          {
            text: "Generate a list of advanced technical interview questions for a Front End(FE) position.\nThe questions should cover topics such as JavaScript, CSS, HTML, and modern frameworks.\nDo not include topics related to Computer Science(CS), Back End(BE), Database(DB), or Object Oriented Programming(OOP).\n\nRules:\n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 150 tokens and less than 300 tokens.\n- Topic of the same subject shouldn't come out in a row.\n- Ensure no question is repeated.",
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.',
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '네트워크에서 TCP와 UDP의 차이점에 대해 설명해주세요. 각 프로토콜의 특징과 사용되는 상황, 데이터 전송 방식, 연결 설정 과정 등에 대해 자세히 설명해주세요. 또한, TCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
    ],
  },
  be: {
    messages: [
      {
        role: 'system',
        content: [
          {
            text: "Generate a list of advanced technical interview questions for a Back End(BE) position.\nThe questions should cover topics such as server-side programming, APIs, and system design.\nDo not include topics related to Computer Science(CS), Front End(FE), Database(DB), or Object Oriented Programming(OOP).\n\nRules:\n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 150 tokens and less than 300 tokens.\n- Topic of the same subject shouldn't come out in a row.\n- Ensure no question is repeated.",
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.',
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '네트워크에서 TCP와 UDP의 차이점에 대해 설명해주세요. 각 프로토콜의 특징과 사용되는 상황, 데이터 전송 방식, 연결 설정 과정 등에 대해 자세히 설명해주세요. 또한, TCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
    ],
  },
  db: {
    messages: [
      {
        role: 'system',
        content: [
          {
            text: "Generate a list of advanced technical interview questions for a Database(DB) position.\nThe questions should cover topics such as SQL, NoSQL, database design, indexing, and transactions.\nDo not include topics related to Computer Science(CS), Front End(FE), Back End(BE), or Object Oriented Programming(OOP).\n\nRules:\n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 150 tokens and less than 300 tokens.\n- Topic of the same subject shouldn't come out in a row.\n- Ensure no question is repeated.",
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.',
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '네트워크에서 TCP와 UDP의 차이점에 대해 설명해주세요. 각 프로토콜의 특징과 사용되는 상황, 데이터 전송 방식, 연결 설정 과정 등에 대해 자세히 설명해주세요. 또한, TCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
    ],
  },
  oop: {
    messages: [
      {
        role: 'system',
        content: [
          {
            text: "Generate a list of advanced technical interview questions for a Object Oriented Programming(OOP) position.\nThe questions should cover topics such as design patterns, principles of OOP, and practical implementation in a major programming language like Java or C++.\nDo not include topics related to Computer Science(CS), Front End(FE), Back End(BE), or Database(DB).\n\nRules:\n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 150 tokens and less than 300 tokens.\n- Topic of the same subject shouldn't come out in a row.\n- Ensure no question is repeated.",
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.',
            type: 'text',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            text: '네트워크에서 TCP와 UDP의 차이점에 대해 설명해주세요. 각 프로토콜의 특징과 사용되는 상황, 데이터 전송 방식, 연결 설정 과정 등에 대해 자세히 설명해주세요. 또한, TCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소에 대해서도 언급해주세요.',
            type: 'text',
          },
        ],
      },
    ],
  },
} satisfies Record<QuestionType, Record<'messages', CustomChatCompletionMessageParam[]>>;

export const questionSub = {
  messages: [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: "Generate a list of follow-up technical interview questions based on the Previous Question. Refers to USER's Answer only when it has given a response related to Previous Question.\n\nRules:\n- No explanation is needed. Just generate follow-up questions. \n- Use Korean and honorifics only.\n- Be sure to make only 1 question at a time at the request of USER.\n- The length of the question should be more than 100 tokens and less than 200 tokens.\n- Ensure no question is repeated.",
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: "Previous Question\n\n이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.\n\nUSER's answer\n\n이진 검색 트리의 삽입 연산은 현재 노드와 삽입할 값을 비교하여 작은 경우 왼쪽, 큰 경우 오른쪽으로 이동하며 적절한 위치를 찾아 삽입합니다. 균형을 유지하기 위해 AVL 트리나 레드-블랙 트리 같은 방법을 사용합니다. 이는 트리의 높이를 최소화하고 검색 효율을 높이는 데 도움을 줍니다.",
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: 'AVL 트리와 레드-블랙 트리가 균형을 유지하는 방법을 자세히 설명해주세요. AVL 트리는 삽입 및 삭제 후 어떻게 균형을 유지하는지 예를 들어 설명해주시고, 레드-블랙 트리는 삽입 및 삭제 후 색상 변경과 회전을 통해 균형을 유지하는 방법을 예를 들어 설명해주세요.',
          type: 'text',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: "Previous Question\n\nAVL 트리와 레드-블랙 트리가 균형을 유지하는 방법을 자세히 설명해주세요. AVL 트리는 삽입 및 삭제 후 어떻게 균형을 유지하는지 예를 들어 설명해주시고, 레드-블랙 트리는 삽입 및 삭제 후 색상 변경과 회전을 통해 균형을 유지하는 방법을 예를 들어 설명해주세요.\n\nUSER's answer\n\n잘 모르겠어.",
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'AVL 트리의 네 가지 회전 방법인 LL, RR, LR, RL 회전이 어떤 상황에서 사용되는지, 그리고 각 회전이 어떻게 이루어지는지 자세히 설명해 주세요. 특정 노드를 삽입하여 균형이 깨진 상황에서 어떤 회전이 필요한지와 그 과정을 구체적으로 설명해 주세요.',
        },
      ],
    },
  ],
} satisfies Record<'messages', CustomChatCompletionMessageParam[]>;

export const answer = {
  messages: [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: 'You will be provided with text, and your task is to write down the answer. The answer should be summarized and should be between 400 and 700 tokens in length.\n\nRules:\n- Use Korean and honorifics only.',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: '이진 검색 트리(Binary Search Tree)의 삽입 연산을 설명해주세요. 삽입 연산 시에 어떤 규칙을 따르며 새로운 노드를 적절한 위치에 추가하는지 자세히 설명해주세요. 또한, 이진 검색 트리의 균형을 유지하기 위해 어떤 방법들이 사용될 수 있는지에 대해도 설명해주세요.',
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: '이진 검색 트리(Binary Search Tree)의 삽입 연산은 새로운 노드를 추가하는 과정으로, 다음과 같은 규칙을 따릅니다. 먼저, 삽입할 노드의 값과 현재 노드의 값을 비교하여 적절한 위치를 찾습니다. 만약 삽입할 값이 현재 노드의 값보다 작다면, 왼쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 반대로 삽입할 값이 현재 노드의 값보다 크다면, 오른쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 이 과정을 반복하여 leaf 노드에 도달하면 새로운 노드를 추가합니다.\n\n이진 검색 트리의 균형을 유지하기 위해 여러 방법들이 사용될 수 있습니다. 대표적인 방법으로는 AVL 트리나 레드-블랙 트리와 같은 균형 잡힌 이진 검색 트리가 있습니다. AVL 트리는 각 노드의 왼쪽 서브트리와 오른쪽 서브트리의 높이 차이가 1을 넘지 않도록 균형을 유지하는 방식입니다. 레드-블랙 트리는 각 노드가 레드나 블랙 중 하나의 색상을 갖고, 다음과 같은 규칙을 따라 균형을 유지합니다. 루트 노드는 블랙이고, 모든 리프 노드는 블랙입니다. 레드 노드의 자식은 모두 블랙이어야 합니다. 어떤 노드로부터 모든 리프 노드까지의 경로에는 동일한 개수의 블랙 노드가 있어야 합니다.\n\n이러한 방법들을 사용하여 이진 검색 트리의 균형을 유지하면 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.',
          type: 'text',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: '네트워크에서 TCP와 UDP의 차이점에 대해 설명해주세요. 각 프로토콜의 특징과 사용되는 상황, 데이터 전송 방식, 연결 설정 과정 등에 대해 자세히 설명해주세요. 또한, TCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소에 대해서도 언급해주세요.',
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: 'TCP와 UDP는 네트워크에서 주로 사용되는 두 가지 전송 계층 프로토콜로, 각각의 특징과 차이점이 있습니다. \n\n먼저, TCP는 신뢰성 있는 연결 지향형 프로토콜로, 데이터 전송 과정에서 패킷 손실이나 오류를 감지하고 복구하는 기능을 제공합니다. TCP는 3-way handshake를 통해 연결을 설정하고, 데이터를 전송한 후에는 수신 여부를 확인하고 순서대로 재조립하여 안정적인 데이터 전송을 보장합니다. 이에 비해 UDP는 비연결형 프로토콜로, 데이터 전송 시 신뢰성을 보장하지 않고 오류 발생 시 복구하지 않습니다. UDP는 단순하고 빠른 데이터 전송을 지원하며, 실시간 음성, 영상 스트리밍 등에서 사용됩니다.\n\nTCP는 웹 브라우징, 이메일 전송, 파일 전송과 같이 신뢰성이 중요한 응용 프로그램에서 주로 사용됩니다. 반면에 UDP는 DNS 조회, IPTV, 온라인 게임 등에서 실시간 통신이 필요한 경우에 사용됩니다. TCP는 흐름 제어, 혼잡 제어, 오류 복구 등의 기능을 제공하여 안정적인 데이터 전송을 지원하고, UDP는 신속한 데이터 전송이 필요한 경우에 선택됩니다.\n\nTCP와 UDP 중 어떤 프로토콜을 선택해야 하는지 결정하는 요소는 주로 데이터의 신뢰성과 전송 속도에 있습니다. 데이터의 완전성과 순서가 중요한 경우에는 TCP를 선택하여 안정적인 전송을 보장할 수 있습니다. 반면에 신속한 데이터 전송이 우선시되고 데이터의 일부 손실이 허용되는 경우에는 UDP를 선택하여 빠른 전송 속도를 확보할 수 있습니다. 따라서 사용하고자 하는 응용 프로그램의 요구 사항과 환경에 맞게 TCP 또는 UDP를 선택하여 적절한 프로토콜을 사용해야 합니다.',
          type: 'text',
        },
      ],
    },
  ],
} satisfies Record<'messages', CustomChatCompletionMessageParam[]>;

export const feedback = {
  messages: [
    {
      role: 'system',
      content: [
        {
          text: "Your role is to compare correct answer and USER's answer and then proceed with feedback and score.\n\nFeedback Rules:\n- The length of the feedback should be more than 150 tokens and less than 300 tokens.\n- The feedback should include a detailed reason for the score you gave.\n\nScore Rules:\n- The score should be either 'poor', 'fair' or 'good'.\n- You must have a clear standard for the score.\n\nOther Rules:\n- Use Korean and honorifics only.\n- The output should be in json format.",
          type: 'text',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: "Correct Answer\n\n이진 검색 트리(Binary Search Tree)의 삽입 연산은 새로운 노드를 추가하는 과정으로, 다음과 같은 규칙을 따릅니다. 먼저, 삽입할 노드의 값과 현재 노드의 값을 비교하여 적절한 위치를 찾습니다. 만약 삽입할 값이 현재 노드의 값보다 작다면, 왼쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 반대로 삽입할 값이 현재 노드의 값보다 크다면, 오른쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 이 과정을 반복하여 leaf 노드에 도달하면 새로운 노드를 추가합니다.\n\n이진 검색 트리의 균형을 유지하기 위해 여러 방법들이 사용될 수 있습니다. 대표적인 방법으로는 AVL 트리나 레드-블랙 트리와 같은 균형 잡힌 이진 검색 트리가 있습니다. AVL 트리는 각 노드의 왼쪽 서브트리와 오른쪽 서브트리의 높이 차이가 1을 넘지 않도록 균형을 유지하는 방식입니다. 레드-블랙 트리는 각 노드가 레드나 블랙 중 하나의 색상을 갖고, 다음과 같은 규칙을 따라 균형을 유지합니다. 루트 노드는 블랙이고, 모든 리프 노드는 블랙입니다. 레드 노드의 자식은 모두 블랙이어야 합니다. 어떤 노드로부터 모든 리프 노드까지의 경로에는 동일한 개수의 블랙 노드가 있어야 합니다.\n\n이러한 방법들을 사용하여 이진 검색 트리의 균형을 유지하면 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.\n\nUSER's Answer\n\n이진 검색 트리의 삽입 연산은 현재 노드와 삽입할 값을 비교하여 작은 경우 왼쪽, 큰 경우 오른쪽으로 이동하며 적절한 위치를 찾아 삽입합니다. 균형을 유지하기 위해 AVL 트리나 레드-블랙 트리 같은 방법을 사용합니다. 이는 트리의 높이를 최소화하고 검색 효율을 높이는 데 도움을 줍니다.",
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: '{"feedback":"사용자가 제공한 답변은 주어진 정답의 내용을 대부분 포함하고 있지만, 일부 정보가 부족합니다. 정확한 답변에는 이진 검색 트리의 삽입 연산이 어떻게 이루어지는지 상세히 설명되어 있고, AVL 트리와 레드-블랙 트리가 균형을 유지하는 방식에 대한 구체적인 내용이 포함되어 있습니다. 사용자의 답변은 이러한 부분이 부족하여 완벽하게 정확한 답변으로 평가하기 어렵습니다.","score":"fair"}',
          type: 'text',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: "Correct Answer\n\n이진 검색 트리(Binary Search Tree)의 삽입 연산은 새로운 노드를 추가하는 과정으로, 다음과 같은 규칙을 따릅니다. 먼저, 삽입할 노드의 값과 현재 노드의 값을 비교하여 적절한 위치를 찾습니다. 만약 삽입할 값이 현재 노드의 값보다 작다면, 왼쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 반대로 삽입할 값이 현재 노드의 값보다 크다면, 오른쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 이 과정을 반복하여 leaf 노드에 도달하면 새로운 노드를 추가합니다.\n\n이진 검색 트리의 균형을 유지하기 위해 여러 방법들이 사용될 수 있습니다. 대표적인 방법으로는 AVL 트리나 레드-블랙 트리와 같은 균형 잡힌 이진 검색 트리가 있습니다. AVL 트리는 각 노드의 왼쪽 서브트리와 오른쪽 서브트리의 높이 차이가 1을 넘지 않도록 균형을 유지하는 방식입니다. 레드-블랙 트리는 각 노드가 레드나 블랙 중 하나의 색상을 갖고, 다음과 같은 규칙을 따라 균형을 유지합니다. 루트 노드는 블랙이고, 모든 리프 노드는 블랙입니다. 레드 노드의 자식은 모두 블랙이어야 합니다. 어떤 노드로부터 모든 리프 노드까지의 경로에는 동일한 개수의 블랙 노드가 있어야 합니다.\n\n이러한 방법들을 사용하여 이진 검색 트리의 균형을 유지하면 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.\n\nUSER's Answer\n\n이진 검색 트리(Binary Search Tree)의 삽입 연산은 새로운 노드를 추가하는 과정으로, 다음과 같은 규칙을 따릅니다. 먼저, 삽입할 노드의 값과 현재 노드의 값을 비교하여 적절한 위치를 찾습니다. 만약 삽입할 값이 현재 노드의 값보다 작다면, 왼쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 반대로 삽입할 값이 현재 노드의 값보다 크다면, 오른쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 이 과정을 반복하여 leaf 노드에 도달하면 새로운 노드를 추가합니다.\n\n이진 검색 트리의 균형을 유지하기 위해 여러 방법들이 사용될 수 있습니다. 대표적인 방법으로는 AVL 트리나 레드-블랙 트리와 같은 균형 잡힌 이진 검색 트리가 있습니다. AVL 트리는 각 노드의 왼쪽 서브트리와 오른쪽 서브트리의 높이 차이가 1을 넘지 않도록 균형을 유지하는 방식입니다. 레드-블랙 트리는 각 노드가 레드나 블랙 중 하나의 색상을 갖고, 다음과 같은 규칙을 따라 균형을 유지합니다. 루트 노드는 블랙이고, 모든 리프 노드는 블랙입니다. 레드 노드의 자식은 모두 블랙이어야 합니다. 어떤 노드로부터 모든 리프 노드까지의 경로에는 동일한 개수의 블랙 노드가 있어야 합니다.\n\n이러한 방법들을 사용하여 이진 검색 트리의 균형을 유지하면 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.",
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: '{"feedback":"사용자의 답변은 주어진 정답과 거의 동일한 내용을 담고 있습니다. 이진 검색 트리의 삽입 연산과 균형을 유지하기 위한 AVL 트리와 레드-블랙 트리에 대한 설명이 정확히 포함되어 있어 내용적으로 큰 차이가 없습니다. 사용자가 제공한 답변은 정확하고 완전한 내용을 담고 있어 좋은 점수를 부여할 수 있습니다.","score":"good"}',
          type: 'text',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          text: "Correct Answer\n\n이진 검색 트리(Binary Search Tree)의 삽입 연산은 새로운 노드를 추가하는 과정으로, 다음과 같은 규칙을 따릅니다. 먼저, 삽입할 노드의 값과 현재 노드의 값을 비교하여 적절한 위치를 찾습니다. 만약 삽입할 값이 현재 노드의 값보다 작다면, 왼쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 반대로 삽입할 값이 현재 노드의 값보다 크다면, 오른쪽 서브트리로 이동하여 재귀적으로 삽입 연산을 수행합니다. 이 과정을 반복하여 leaf 노드에 도달하면 새로운 노드를 추가합니다.\n\n이진 검색 트리의 균형을 유지하기 위해 여러 방법들이 사용될 수 있습니다. 대표적인 방법으로는 AVL 트리나 레드-블랙 트리와 같은 균형 잡힌 이진 검색 트리가 있습니다. AVL 트리는 각 노드의 왼쪽 서브트리와 오른쪽 서브트리의 높이 차이가 1을 넘지 않도록 균형을 유지하는 방식입니다. 레드-블랙 트리는 각 노드가 레드나 블랙 중 하나의 색상을 갖고, 다음과 같은 규칙을 따라 균형을 유지합니다. 루트 노드는 블랙이고, 모든 리프 노드는 블랙입니다. 레드 노드의 자식은 모두 블랙이어야 합니다. 어떤 노드로부터 모든 리프 노드까지의 경로에는 동일한 개수의 블랙 노드가 있어야 합니다.\n\n이러한 방법들을 사용하여 이진 검색 트리의 균형을 유지하면 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.\n\nUSER's Answer\n\n잘 모르겠어.",
          type: 'text',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: '{"feedback":"사용자의 답변은 주어진 정답과 매우 다르며, 내용이 부족하여 정확한 설명이 없습니다. 이진 검색 트리의 삽입 연산과 균형을 유지하기 위한 AVL 트리와 레드-블랙 트리에 대한 설명이 전혀 포함되지 않았습니다. 사용자의 답변은 문제를 해결하는 데 필요한 정보가 전혀 없어서 낮은 점수를 부여해야 합니다.",\n    "score":"poor"\n}',
          type: 'text',
        },
      ],
    },
  ],
} satisfies Record<'messages', CustomChatCompletionMessageParam[]>;
