---
title: '자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (`require` 및 `import`)'
description: 'Node.js에서 모듈을 불러오는 방법으로 `require`(CommonJS)와 `import`(ES6)가 있으며, 각각의 사용법과 장단점이 있다. CommonJS는 하위 호환성을 유지하며, `exports`와 `module.exports`를 통해 객체를 내보내고 불러온다. 반면, ES6 모듈은 가독성이 높고 성능이 우수하며, `export`와 `default export`를 사용해 더 명확하게 모듈을 관리한다. ES 모듈을 사용할 때는 `.js` 확장자를 붙여야 한다.'
created: '2024-04-02'
updated: '2024-07-22'
categories:
  - 'nodejs'
references:
  - 'https://www.daleseo.com/js-module-require/#%EC%A3%BC%EC%9D%98-%EC%82%AC%ED%95%AD'
  - 'https://www.daleseo.com/js-module-import/#%EB%8B%A8%EC%9D%BC-%EA%B0%9D%EC%B2%B4-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0'
---

자바스크립트 개발을 하다보면 `require`나 `import` 키워드를 통해 외부 라이브러리를 불러오는 코드를 자주 보게 된다. `require`는 Node.js에서 예전부터 사용되고 있는 CommonJS의 키워드이고, `import`는 ES6(ES2015)에서 새롭게 도입되어 현재 자바스크립트 생태계에서 표준이 되어가고 있는 키워드이다. 두 개의 키워드 모두 하나의 파일에서 다른 파일의 코드를 불러온다는 동일한 목적을 가지고 있지만, 비슷한듯 약간씩 다른 문법 때문에 개발자들을 혼란스럽게 하기도 한다.

> Node.js 버전 13.2부터는 CommonJS 뿐만 아니라 ES Modules에 대한 정식 지원이 시작됨에 따라 굳이 트랜스파일링을 하지 않더라도 Node.js에서 ES 모듈을 사용할 수 있게 되었다.

```js
const express = require("express");

const app = express();
```

```js
import express from "express";

const app = express();
```

예를 들어, 위 두 코드는 ExpressJS 라이브러리를 불러와서 서버 객체를 생성하는 동일한 작업을 수행하고 있다. CommonJS 방식을 따른 첫 번째 코드는 Ruby 언어처럼 `require` 키워드를 사용하여 여타 다른 변수를 할당하듯이 모듈을 불러오는 반면에, ES Module 방식을 따른 두 번째 코드는 Java나 Python 언어처럼 `import` 키워드를 사용하여 좀 더 명시적으로 모듈을 불러오고 있다.

> 모듈이란, 관련된 코드들을 하나의 코드 단위로 캡슐화 하는 것을 말한다.

## 1. 자바스크립트 CommonJS 모듈 내보내기/불러오기 (`require`) {#1-javascript-commonjs-export-and-import-require}

첫 번째 방식인 CommonJS 기반 모듈 내보내기/불러오기 방법에 대해 알아보자.

### 1-1. CommonJS 모듈 시스템의 필요성 {#1-1-why-commonjs-module-system-is-needed}

많은 프로젝트에서 ES6 모듈 시스템이 점점 더 널리 사용되고 있는 추세이기는 하지만, 안타깝게도 아직까지 항상 `import` 키워드를 사용해서 코딩을 할 수 있는 것은 아니다. `<script>` 태그를 사용하는 브라우저 환경에서는 물론이고, Node.js에서도 ES Module을 지원하기 시작했지만, 여전히 하위 호환성을 위해서 CommonJS를 기본 모듈 시스템으로 채택하고 있다. Babel과 같은 ES6 코드를 변환(transpile)해주는 도구를 사용할 수 없는 상황에서는 좋든 싫든 `require` 키워드를 사용해야 한다. 따라서, CommonJS 사용 방법도 어느 정도 숙지하고 있는 것이 도움이 된다.

### 1-2. 주의 사항 {#1-2-cautions}

CommonJS 방식으로 모듈을 내보낼 때는 ES6처럼 명시적으로 선언하는 것이 아니라, 특정 변수나 그 변수의 속성으로 내보낼 객체를 세팅해줘야 한다. 특히, 제일 햇갈리는 부분이 바로 유사해보이는 `exports` 변수와 `module.exports` 변수를 상황에 맞게 잘 사용해야 한다는 점이다. 기본적으로 다음 2가지 규칙만 기억하면 된다.

1. 여러 개의 객체(복수 객체)를 내보낼 경우, `exports` 변수의 속성으로 할당한다.
1. 딱 하나의 객체(단일 객체)를 내보낼 경우, `module.exports` 변수 자체에 할당한다.

### 1-3. 복수 객체 {#1-3-multiple-objects}

먼저, 하나의 자바스크립트 모듈 파일에서 여러 개의 객체를 내보내고 불러오는 방법을 알아보자.

#### 1-3-1. 복수 객체 내보내기 {#1-3-1-export-multiple-objects}

아래는 미국과 캐나다 달러를 상호 변환해주는 자바스크립트 예제 코드이다. 이 파일에는 3개의 함수가 있는데, 아래 2개의 함수만 다른 파일에서 접근할 수 있도록 내보내기를 하였다. `exports` 변수의 속성으로 내보낼 함수들을 세팅한다.

```js
/* currency-functions.js */

const exchangeRate = 0.91;

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

const canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};

function usToCanadian(us) {
  return roundTwoDecimals(us / exchangeRate);
}

exports.canadianToUs = canadianToUs; // 내보내기 1
exports.usToCanadian = usToCanadian; // 내보내기 2
```

#### 1-3-2. 복수 객체 불러오기 {#1-3-2-import-multiple-objects}

위에서 내보낸 여러 개의 객체는 `require` 키워드를 통해 한 번에 불러와 변수에 할당할 수 있으며, 그 변수를 통해서 내보낸 객체에 접근할 수 있다.

> 이때, `require` 키워드는 객체(object)를 반환한다.

```js
/* test-currency-functions.js */

const currency = require("./currency-functions");

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- 실행 결과

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

### 1-4. 단일 객체 {#1-4-single-object}

다음으로, 하나의 자바스크립트 모듈 파일에서 단 하나의 객체를 내보내고 불러오는 방법을 알아보자.

#### 1-4-1. 단일 객체 내보내기 {#1-4-1-export-single-object}

이번에는 예제 코드를 살짝 수정하여 아래 두 개 함수를 객체로 묶어서 내보내기를 하였다. 내보낼 객체를 `module.exports` 변수에 할당해주면 된다.

```js
/* currency-object.js */

const exchangeRate = 0.91;

// 안 내보냄
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// 내보내기
const obj = {};
obj.canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};
obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
module.exports = obj;
```

#### 1-4-2. 단일 객체 불러오기 {#1-4-2-import-single-object}

위에서 내보낸 하나의 객체는 `require` 키워드를 통해 변수에 할당할 수 있으며, 그 변수를 통해서 일반 객체에 접근하는 것 처럼 속성에 세팅되어있는 함수에 접근할 수 있다.

> 이때, `require` 키워드는 객체(object)를 반환한다.

```js
/* test-currency-object.js */

const currency = require("./currency-object");

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- 실행 결과

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

## 2. 자바스크립트 ES 모듈 내보내기/불러오기 (`import`) {#2-javascript-es-module-export-and-import}

두 번째 방식인 ES6 기반 모듈 내보내기/불러오기 방법에 대해 알아보자.

### 2-1. ES6 모듈 시스템의 이점 {#2-1-benefits-of-es6-module-system}

아무래도 ES6 모듈 시스템이 좀 더 최신 스펙이다 보니, CommonJS 방식 대비 여러 가지 이점들이 있다. 우선 `import`, `from`, `export`, `default`처럼 모듈 관리 전용 키워드를 사용하기 때문에 가독성이 좋다. 또한 비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에서 유리한 측면이 있다. 뿐만 아니라, 앞으로 다룰 Named Parameter와 같이 CommonJS에서는 지원하지 않는 기능들이 있다.

### 2-2. 복수 객체 {#2-2-es-module-multiple-objects}

먼저, 하나의 자바스크립트 모듈 파일에서 여러 개의 객체를 내보내고 불러오는 방법을 알아보자.

#### 2-2-1. 복수 객체 내보내기 {#2-2-1-export-es-module-multiple-objects}

CommonJS에서는 내보낼 복수 객체들을 `exports` 변수의 속성으로 할당하는 방식을 썼는데, ES6에서는 `import` 키워드의 짝꿍인 `export` 키워드를 사용해서 명시적으로 선언해준다. 이 때, 내보내는 변수나 함수의 이름이, 그대로 불러낼 때 사용하게 되는 이름이 되기 때문에, 이를 Named Exports라고 일겉는다.

아래는 미국과 캐나다 달러를 상호 변환해주는 자바스크립트 예제 코드이다. 이 파일에는 3개의 함수가 있는데, 아래 2개의 함수만 다른 파일에서 접근할 수 있도록 내보내기를 하였다. 첫번째 방법처럼 선언과 동시에 내보낼 수도 있고, 두번째 방법처럼 선언 후에 별도로 내보낼 수도 있다.

> `export`를 통해, 함수(`function`)ㆍ변수(`let`, `const`)ㆍ클래스(`class`) 등 모든 것을 내보낼 수 있다.

```js
/* currency-functions.js */

const exchangeRate = 0.91;

// 안 내보냄
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// 내보내기 1
export function canadianToUs(canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
}

// 내보내기 2
const usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
export { usToCanadian };
```

#### 2-2-2. 복수 객체 불러오기 {#2-2-2-import-es-module-multiple-objects}

여러 객체(Named Exports)를 불러올 때는 ES6의 Destructuring 문법을 사용해서 필요한 객체만 선택적으로 전역에서 사용하거나, 모든 객체에 별명을 붙이고 그 별명을 통해서 접근할 수도 있다.

> Named Exports의 경우, 반드시 `export`한 이름으로만 `import`할 수 있다.
>
> 또한, `import`할 때 반드시 중괄호로 가져와야 한다.

```js
/* test-currency-functions.js */

// Destructuring
import { canadianToUs } from "./currency-functions";

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(canadianToUs(50));

// Alias
import * as currency from "./currency-functions";

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- 실행 결과

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

### 2-3. 단일 객체 {#2-3-es-module-single-object}

다음으로, 하나의 자바스크립트 모듈 파일에서 단 하나의 객체를 내보내고 불러오는 방법을 알아보자.

#### 2-3-1. 단일 객체 내보내기 {#2-3-1-export-es-module-single-object}

CommonJS에서는 내보낼 단일 객체를 `module.exports` 변수에 할당하는 방식을 썼었는데, ES6에서는 그 대신 `export default` 키워드를 사용해서 명시적으로 선언해준다. 하나의 모듈에서 하나의 객체만 내보내기 때문에 이를 Default Export라고 일겉는다.

이번에는 예제 코드를 살짝 수정하여 아래 두 개 함수를 객체로 묶어서 내보내기를 하였다. (객체 내에서 첫 번째 함수는 ES6 문법을 사용하였다.) 이름이 필요없기 때문에 별도로 변수 할당 없이 바로 객체를 내보내기를 할 수 있다. 내보낼 때 어떤 이름도 지정하기 않기 때문에 불러올 때도 아무 이름이나 사용할 수 있다.

```js
/* currency-object.js */

const exchangeRate = 0.91;

// 안 내보냄
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// 내보내기
export default {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  },

  usToCanadian: function (us) {
    return roundTwoDecimals(us / exchangeRate);
  },
};
```

굳이 꼭 변수에 할당하고 내보내기를 하고 싶다면 다음과 같이 작성할 수도 있다. 하지만 불러내는 쪽에서 반드시 이 `obj`라는 변수 이름을 사용하도록 강제되지는 않는다.

```js
/* currency-object.js */

const obj = {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  },
};

obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};

export default obj;
```

#### 2-3-2. 단일 객체 불러오기 {#2-3-2-import-es-module-single-object}

하나의 객체(Default Export)를 불러올 때는 간단하게 `import` 키워드를 사용해서 아무 이름이나 원하는 이름을 주고 해당 객체를 통해 속성에 접근하면 된다.

> Default Export의 경우, `export`한 이름과 상관없이 원하는 이름으로 `import`가 가능하다.
>
> 또한, `import`시에 중괄호 작성이 필요없다.

```js
/* test-currency-object.js */

import currency from "./currency-object";

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- 실행 결과

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

## 3. 마치면서 {#3-closing}

한 가지 주의할 점은 Babel 없이 순수하게 Node.js 최신 버전으로 ES 모듈을 사용하고 있다면, `import`를 사용할 때 `.js` 확장자를 붙여주어야 한다.
