---
title: 'Node.js의 전역 변수와 전역 객체'
description: 'Node.js는 브라우저의 `window` 객체 대신, 전역 변수(`__filename`, `__dirname`)와 전역 객체(`global`, `process`, `exports`)를 제공하여 시스템 정보, 프로세스 제어, 모듈화를 지원한다.'
created: '2024-04-02'
updated: '2024-04-02'
categories:
  - 'nodejs'
references:
  - 'https://leejabba.gitbooks.io/node-js/content/chapter1.html'
  - 'https://kss7547.tistory.com/40'
  - 'https://blog.naver.com/hj_kim97/222217313571'
---

웹 브라우저에서 동작하는 JavaScript의 최상위 객체는 `window` 객체이다. 하지만, Node.js는 브라우저에서 동작하는 것이 아니므로 `window` 객체가 없는 대신, 전역 변수와 전역 함수를 가지고 있다.

## 1. 전역 변수 {#1-global-variables}

Variable | Explanation
--- | ---
`__filename` | 현재 실행중인 코드의 파일 경로 반환.
`__dirname` | 현재 실행중인 코드의 디렉터리 경로 반환.

## 2. 전역 객체 {#2-global-objects}

코드의 어디서나 사용할 수 있다. `global.console.log()`처럼 사용 가능하고, `global`은 생략할 수 있다.
(JavaScript의 기본 객체인 `String`, `Number`, `Math` 등도 포함된다.)

### 2-1. `console` 객체 {#2-1-console-object}

콘솔 창에 결과를 보여주는 객체.

Method | Explanation
--- | ---
`console.log()` | 괄호 안의 내용 출력.
`console.dir()` | 괄호 안의 객체 속성 출력.

> `console.log()`와 `console.dir()`에 대한 자세한 내용은 다른 마크다운 문서 참조.

### 2-2. `process` 객체 {#2-2-process-object}

프로세스(프로그램)와 관련된 정보를 나타내는 객체.

Node.js만이 가진 객체로, 웹 브라우저에서 동작하는 JavaScript에는 존재하지 않는다.

#### 2-2-1. Property {#2-2-1-process-property}

Property | Explanation
--- | ---
`process.arch` | 프로세스 아키텍처.
`process.argv` | 프로세스를 실행할 때 전달되는 파라미터(매개변수).
`process.env` | 환경 변수.
`process.platform` | 플랫폼.
`process.version` | Node.js 버전.
`process.versions` | Node.js와 종속된 프로그램 버전.

#### 2-2-2. Method {#2-2-2-process-method}

Method | Explanation
--- | ---
`process.exit()` | 프로세스 실행 종료.
`process.cwd()` | 현재 작업 디렉토리 반환.
`process.uptime()` | 프로세스 지속 시간 반환.
`process.cpuUsage()` | cpu 사용 정보 객체 반환.
`process.memoryUsage()` | 메모리 사용 정보 객체 반환.

### 2-3. `exports` 객체 {#2-3-exports-object}

모듈을 생성할 때 사용하는 객체.

> `exports`(`require`, `import`) 객체에 대한 자세한 내용은 다른 마크다운 문서 참조.
