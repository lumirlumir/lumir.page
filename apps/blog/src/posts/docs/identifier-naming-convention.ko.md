---
title: '식별자(변수) 이름 명명 규칙: Camel, Pascal, Snake, Kebab'
description: '프로그래밍에서 식별자 이름 규칙으로 camelCase, PascalCase, snake_case, kebab-case등이 있으며, 각각 코드 가독성과 일관성을 위해 사용된다.'
created: '2024-07-18'
updated: '2024-07-18'
categories:
  - 'convention'
references:
  - 'https://en.wikipedia.org/wiki/Camel_case'
  - 'https://ccomccomhan.tistory.com/185'
  - 'https://etloveguitar.tistory.com/104'
  - 'https://blog.naver.com/ege1001/220466932974'
  - 'https://namu.wiki/w/%EC%BD%94%EB%94%A9%20%EC%8A%A4%ED%83%80%EC%9D%BC#s-3.2'
---

개발을 하다보면, 프로그래밍 언어마다 식별자 이름 규칙이 서로 다르다는 것을 알 수 있다. 변수, 함수, 클래스 등의 식별자 이름을 지을 때 사용하는 이름 명명 규칙(Naming Convention)을 알아보자.

## 1. camelCase(lowerCamelCase) {#1-camel-case-lower-camel-case}

첫 단어의 첫 글자를 소문자로 표기한 이후, 각 단어의 첫 글자를 대문자로 표기한다.

식별자의 특성에 따라 camelCase와 PascalCase를 적절하게 혼합하여 쓰는 경우가 많다.

### 1-1. 유래 {#1-1-camel-case-origin}

합성한 단어의 모양이 낙타의 등과 비슷하다는 뜻에서 유래했다.

### 1-2. 예시 {#1-2-camel-case-examples}

```txt
camelCase
lowerCamelCase
```

### 1-3. 자주 사용하는 곳 {#1-3-camel-case-common-usage}

1. JavaScript: 변수, 함수, 프로퍼티, 메서드 이름.
1. React: 변수, 함수, 프로퍼티, 메서드 이름.
1. Java: 변수, 함수, 프로퍼티, 메서드 이름.
1. JSON: 키(key) 이름.

## 2. PascalCase(UpperCamelCase) {#2-pascal-case-upper-camel-case}

모든 단어의 첫 글자를 대문자로 표기한다.

식별자의 특성에 따라 camelCase와 PascalCase를 적절하게 혼합하여 쓰는 경우가 많다.

### 2-1. 유래 {#2-1-pascal-case-origin}

프로그래밍 언어 파스칼(Pascal)에서 유래했다. 이는 1970년대에 닉라우스 비르트(Niklaus Wirth)에 의해 개발된 프로그래밍 언어이다. 파스칼 언어는 코드 가독성을 중시했으며, 그 일환으로 변수와 함수 이름에 파스칼 케이스를 사용하는 것이 권장되었다.

### 2-2. 예시 {#2-2-pascal-case-examples}

```txt
PascalCase
UpperCamelCase
```

### 2-3. 자주 사용하는 곳 {#2-3-pascal-case-common-usage}

1. JavaScript: 클래스 이름.
1. React: 클래스 컴포넌트, 함수 컴포넌트 이름.
1. Java: 클래스, 인터페이스 이름.

## 3. snake_case {#3-snake-case}

각 단어 사이에 언더바(`_`)를 넣어 표기한다.

### 3-1. 유래 {#3-1-snake-case-origin}

언더바(`_`)가 마치 땅바닥에 미끄러져 있는 뱀 모양 같다는 뜻에서 유래했다.

### 3-2. 예시 {#3-2-snake-case-examples}

```txt
snake_case
```

### 3-3. 자주 사용하는 곳 {#3-3-snake-case-common-usage}

1. C, Cpp: 변수, 함수, 프로퍼티, 메서드 이름.
1. Python: 변수, 함수, 프로퍼티, 메서드 이름.
1. Database: Column 이름.

### 3-4. 세부 분류 {#3-4-snake-case-subtypes}

Train_Case, spinal_case, SCREAMING_SNAKE_CASE(MACRO_CASE)로 더욱 세부적으로 나눌 수 있다.

#### 3-4-1. Train_Case {#3-4-1-train-case}

snake_case에서, 각 단어의 맨 앞글자를 대문자로 표기하는 것.

- 예시

  ```txt
  Train_Case
  ```

#### 3-4-2. spinal_case {#3-4-2-spinal-case}

snake_case에서, 각 단어의 맨 앞글자를 소문자로 표기하는 것.

- 예시

  ```txt
  spinal_case
  ```

#### 3-4-3. SCREAMING_SNAKE_CASE(MACRO_CASE) {#3-4-3-screaming-snake-case-macro-case}

snake_case에서, 모든 문자를 전부 대문자로 표기하는 것.

주로 상수, 환경 변수 정의 등에 사용한다. 한글에는 없는 특징으로, 영어에서 문장을 전부 대문자로 적을 경우 굉장히 강조되어 마치 화자가 소리치는 느낌을 준다. 따라서 경고의 의미가 있거나, 사용 시 주의해야 하는 경우에도 사용한다.

- 예시

  ```txt
  SCREAMING_SNAKE_CASE
  MACRO_CASE
  ```

## 4. kebab-case {#4-kebab-case}

각 단어 사이에 대시(`-`)를 넣어 표기한다.

### 4-1. 유래 {#4-1-kebab-case-origin}

단어들이 마치 케밥 꼬치에 꽂힌 것처럼 보인다는 뜻에서 유래했다.

### 4-2. 예시 {#4-2-kebab-case-examples}

```txt
kebab-case
```

### 4-3. 자주 사용하는 곳 {#4-3-kebab-case-common-usage}

1. HTML: [특성(Attribute)](https://developer.mozilla.org/ko/docs/Web/HTML/Attributes) 이름에 사용된다.
1. CSS: [속성(Property)](https://developer.mozilla.org/ko/docs/Web/CSS/Reference) 이름에 사용된다.
1. URI Parameter.
