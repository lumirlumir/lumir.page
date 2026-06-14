---
title: '`console.log()`와 `console.dir()`의 차이점'
description: '`console.log()`는 주로 디버깅을 위해 정보를 콘솔에 출력하는 함수로, 트리 구조의 HTML 요소를 출력하며, `console.dir()`은 객체의 속성과 트리 구조를 자세히 표시하는 함수로, JSON과 유사한 객체 표현을 제공한다.'
created: '2024-04-02'
updated: '2024-05-26'
categories:
  - 'javascript'
references:
  - 'https://my-t-space.tistory.com/119'
  - 'https://velog.io/@jeongda/console.log-%EC%99%80-console.dir-%EC%9D%98-%EC%B0%A8%EC%9D%B4'
  - 'https://velog.io/@irish/JS-console.log-and-console.dir'
---

## 1. `console.log()` {#1-console-log}

### 1-1. 정의 {#1-1-console-log-definition}

`console.log()`는 ***JavaScript***에서 콘솔 출력을 위해 사용하는 함수이다.

### 1-2. 사용 목적 {#1-2-console-log-purpose}

`console.log()`를 사용하여 디버깅 및 로깅에 도움이 되는 정보를 콘솔에 출력할 수 있다. 주로 다음과 같은 목적으로 사용한다.

- 디버깅: 변수의 값을 확인하거나, 코드가 실행되는 부분을 추적하기 위해 사용한다.
- 로깅: 어떤 함수가 실행되었는지, 어떤 데이터가 반환되었는지 등을 추적하기 위해 사용한다.
- 문제 해결: 코드 실행 중 예상치 못한 결과를 찾거나, 에러를 추적하여 수정하기 위해 사용한다.

### 1-3. 출력 {#1-3-console-log-output}

`console.log()`는 요소를 ***HTML***과 같은 트리 구조로 출력 하고, ***DOM*** 요소에 대해 특별한 처리를 제공한다.

### 1-4. 서식 문자 {#1-4-console-log-format-specifiers}

`console.log()`에서는 서식 문자를 이용해 문자열을 출력할 수 있다.

서식 문자 | 설명 | 예시
--- | --- | ---
`%d` | 숫자 | `console.log('Number: %d', 273);`
`%s` | 문자열 | `console.log('String: %s', 'hi~');`
`%j` | JSON | `console.log('Json: %j', {name:'jay'});`

## 2. `console.dir()` {#2-console-dir}

### 2-1. 정의 {#2-1-console-dir-definition}

`console.dir()`은 객체의 속성을 콘솔에 출력하기 위해 사용한다. 이는 객체를 나열하거나 객체의 트리 구조를 표시하는 데 유용하다.

### 2-2. 사용 목적 {#2-2-console-dir-purpose}

`console.log()`와 달리, 객체의 모든 속성을 확인하기 위해 사용한다. 주로 다음과 같은 목적으로 사용한다.

- 객체 속성 표시: 객체의 속성과 속성 값의 구조를 확인할 수 있다.
- 트리 구조 표시: 객체의 계층 구조를 표시하여 복잡한 객체를 더욱 명확하게 파악할 수 있다.
- 콘솔에서 객체 표현의 세부 정보 표시: `console.log()`와 달리, 객체를 더욱 자세히 표시할 수 있어, 더 많은 정보를 얻을 수 있다.

### 2-3. 출력 {#2-3-console-dir-output}

`console.dir()`은 요소를 ***JSON***과 같은 트리 구조로 출력 하고, ***DOM*** ***JS*** 객체의 전체 표현을 보려고 할 때 유용하다. 즉, 객체의 데이터를 보고 싶을 때는 `console.dir()`을 사용하자.

## 3. 정리 {#3-summary}

<u> | 구조 | 객체 | 함수
--- | --- | --- | ---
`console.log()` | ***HTML***과 같은 형태의 트리 구조 출력 | 태그 내용 출력 | 코드 출력
`console.dir()` | ***JSON***과 같은 형태의 트리 구조 출력 | 태그 속성 출력 | 속성 출력

객체와 속성은 `console.dir()`, 나머지는 `console.log()`를 사용하면 편하다.

## 4. 예시 {#4-examples}

### 4-1. `document` 출력 {#4-1-document-output}

- `console.log()`: ***HTML*** 형태의 트리구조 출력.

  ![console.log()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/1.webp?raw=true)

- `console.dir()`: ***JSON*** 형태의 트리구조 출력.

  ![console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/2.webp?raw=true)

### 4-2. `document.body` 출력 {#4-2-document-body-output}

- `console.log()`: 해당 `<body>`의 요소 출력.

  ![console.log()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/3.webp?raw=true)

- `console.dir()`: 전체 요소 출력.

  ![console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/4.webp?raw=true)

### 4-3. 함수 `a()` 출력 {#4-3-function-a-output}

- 함수(객체)도 마찬가지로 출력된다.
- 만약, `console.log(a());` 및 `console.dir(a());`를 사용할 경우, `()`로 인해 함수를 실행하는 것이 되므로, 둘 다 `true`가 출력된다.

  ![console.log() vs console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/5.webp?raw=true)
