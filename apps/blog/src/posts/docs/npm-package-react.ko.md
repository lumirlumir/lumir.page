---
title: 'React: `react`, `react-dom`'
description: '`react`는 UI 컴포넌트를 생성하는 핵심 라이브러리이고, `react-dom`은 이를 웹 브라우저의 DOM에 렌더링하는 역할을 하며 두 라이브러리는 함께 사용된다.'
created: '2024-04-05'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://react.dev/'
  - 'https://medium.com/programming-sage/react-vs-react-dom-a0ed3aea9745'
---

React 개발의 필수 요소인 `react`, `react-dom`에 대해 알아보자.

## 1. `react`, `react-dom` 설치 {#1-install-react-and-react-dom}

`dependencies`로 `react`, `react-dom`을 설치한다.

```sh
$ npm install react react-dom
```

## 2. `react` {#2-react}

사용자 인터페이스를 만들기 위한 React의 핵심 라이브러리이다. Component를 만들고, React 요소를 정의하는 데 필요한 API를 제공하며, 상태 관리, 생명주기 관리, props, state, context 관리, 기본적인 훅(Hook) 관리 등을 진행한다.

웹 또는 브라우저를 위한 라이브러리가 아니며, 변경 사항을 파악하고 변경 사항 snap shot을 `react-dom`에 전달하는 역할만을 한다.

## 3. `react-dom` {#3-react-dom}

DOM에서 `react`를 사용하기 위한 라이브러리이다. 웹 인터페이스로 웹과 직접적인 연관이 있으며, 실제 HTML 요소를 화면에 불러오는 역할을 한다. DOM과 관련된 기능을 처리하며, 브라우저의 DOM에 컴포넌트를 렌더링한다.

`react-dom`은 `react`에서 받은 변경 사항 snap shot과 실제 브라우저 DOM을 비교하여 차이점을 확인 후, 실제 브라우저 DOM을 조작한다. 즉, 리액트 컴포넌트의 이전 state와 현재 state를 비교한 뒤, 차이점이 있을 때 업데이트를 진행한다.

`react-dom`은 `react`의 아이디어를 웹 브라우저에 바인딩하는 도구이기에, 사실상 `react`는 웹 또는 브라우저와 아무 관련이 없다. 이것은 `react`의 핵심 아이디어를 가져와 사용하는 `react-native`, `react-three` 등이 개발되어 사용될 수 있는 이유이기도 하다.

## 4. 정리 {#4-summary}

![react react-dom](/apps/blog/public/images/posts/npm-package-react/1.webp?raw=true)
