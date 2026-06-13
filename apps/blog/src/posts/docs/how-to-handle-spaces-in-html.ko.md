---
title: 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`'
description: '`&nbsp;`, `&ensp;`, `&emsp;`는 각각 1칸, 2칸, 3칸 정도 너비의 공백을 생성한다.'
created: '2024-07-16'
updated: '2024-07-16'
categories:
  - 'html'
references:
  - 'https://developer.mozilla.org/ko/docs/Glossary/Entity'
  - 'https://grandj.tistory.com/143'
  - 'https://ziszini.tistory.com/34'
---

HTML의 경우 연속된 공백을 하나의 공백으로 처리하는 성질이 있기에, 공백 특수문자, 정확히는 [HTML 엔터티(Entity)](https://developer.mozilla.org/ko/docs/Glossary/Entity)를 이용하여 연속된 공백을 처리할 수 있다.

## 1. `&nbsp;` {#1-non-breaking-space-entity}

### 1-1. 의미 {#1-1-non-breaking-space-meaning}

- Non-Breaking Space의 약자이다.
- 줄 바꿈이 되지 않는 공백을 의미한다. 텍스트가 줄 바꿈되지 않고 같은 줄에 유지되어야 할 때 사용한다.

### 1-2. 출력 {#1-2-non-breaking-space-output}

- 작게 띄어쓰기로, 1칸을 띄어쓴다.

### 1-3. 예시 {#1-3-non-breaking-space-example}

- 입력

  ```html
  left|&nbsp;|right
  ```

- 출력

  left|&nbsp;|right

## 2. `&ensp;` {#2-en-space-entity}

### 2-1. 의미 {#2-1-en-space-meaning}

- En Space의 약자이다.
- 보통 영문자의 'N' 자 폭에 해당하는 공백을 의미한다. 이는 보통 현재 폰트의 문자 폭의 절반 크기이다.

### 2-2. 출력 {#2-2-en-space-output}

- 보통 띄어쓰기로, 약 2칸 정도의 공백 너비를 띄어쓴다. (단, 2개의 공백 문자로 인식하는 것이 아닌, 1개의 공백 문자로 인식한다.)

### 2-3. 예시 {#2-3-en-space-example}

- 입력

  ```html
  left|&ensp;|right
  ```

- 출력

  left|&ensp;|right

## 3. `&emsp;` {#3-em-space-entity}

### 3-1. 의미 {#3-1-em-space-meaning}

- Em Space의 약자이다.
- 보통 영문자의 'M' 자 폭에 해당하는 공백을 의미한다. 이는 보통 현재 폰트의 문자 폭과 동일한 크기이다.

### 3-2. 출력 {#3-2-em-space-output}

- 크게 띄어쓰기로, 약 3칸 정도의 공백 너비를 띄어쓴다. (단, 3개의 공백 문자로 인식하는 것이 아닌, 1개의 공백 문자로 인식한다.)

### 3-3. 예시 {#3-3-em-space-example}

- 입력

  ```html
  left|&emsp;|right
  ```

- 출력

  left|&emsp;|right

## 4. 출력 결과 비교 {#4-output-result-comparison}

- 입력

  ```html
  left|&nbsp;|right

  left|&ensp;|right

  left|&emsp;|right
  ```

- 출력

  left|&nbsp;|right

  left|&ensp;|right

  left|&emsp;|right
