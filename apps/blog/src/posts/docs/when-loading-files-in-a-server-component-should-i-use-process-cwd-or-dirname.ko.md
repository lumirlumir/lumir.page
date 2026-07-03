---
title: '서버 컴포넌트에서 파일을 불러올 때, `process.cwd()`와 `__dirname` 중 어떤 것을 사용해야 할까?'
description: 'Next.js에서는 번들링 후 경로가 변경될 수 있는 `__dirname`보다, 항상 프로젝트 루트 디렉토리를 가리키는 `process.cwd()`를 사용하는 것이 파일 경로 관리에 더 안정적이다.'
created: '2024-09-14'
updated: '2024-09-14'
categories:
  - 'nextjs'
references:
  - 'https://vercel.com/guides/loading-static-file-nextjs-api-route'
  - 'https://nodejs.org/api/process.html#processcwd'
  - 'https://nodejs.org/docs/latest/api/globals.html#__dirname'
---

**Vercel**(**Next.js**)의 공식 가이드 [How to Load Data from a File in Next.js](https://vercel.com/guides/loading-static-file-nextjs-api-route)를 읽다 문득 궁금한 점이 생겼다.

```js
import { promises as fs } from 'fs';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  //...
}
```

앞선 공식 가이드 링크에서 언급된 위 코드를 살펴보자. 불러올 파일의 경로를 지정할 때 `process.cwd()`를 사용한다. 이때, Node.js의 전역변수인 `__dirname`을 대신 사용하면 안되는 것일까?

## 1. `process.cwd()`와 `__dirname` {#1-process-cwd-and-dirname}

`process.cwd()`와 `__dirname`은 Node.js에서 현재 디렉토리를 나타내지만, 사용하는 상황과 의미가 다르다.

### 1-1. [`process.cwd()`](https://nodejs.org/api/process.html#processcwd) {#1-1-process-cwd}

현재 프로세스를 시작한 디렉토리를 반환하며, 이는 프로세스를 실행한 위치에 따라 변할 수 있다. 즉, 코드가 있는 위치와는 관계없이 동작하며, 현재 프로세스가 실행되는 작업 디렉토리(working directory)를 반환한다.

- 동작 방식: Node.js 프로세스가 시작될 때의 디렉토리를 기준으로 반환한다.
- 특징: `process.chdir()`을 통해 작업 디렉토리를 변경할 수 있다.

### 1-2. [`__dirname`](https://nodejs.org/docs/latest/api/globals.html#__dirname) {#1-2-dirname}

실행 중인 JavaScript 파일이 위치한 폴더의 경로를 반환하며, 고정된 경로를 제공한다. 즉, 프로세스를 실행한 위치와는 무관하게 파일 위치를 기준으로 하며, 현재 JavaScript 파일이 저장된 디렉토리에 따른 경로만을 나타낸다.

- 동작 방식: 실행 중인 JavaScript 파일의 저장 위치를 기준으로 반환한다.
- 특징: `__dirname`은 고정되어 있으며, 항상 파일이 저장된 디렉토리 경로만을 반환한다.

### 1-3 예시 {#1-3-process-cwd-and-dirname-example}

현재 작업 디렉토리를 `/`(루트)라 하자. `/my-folder` 경로에 아래와 같은 JavaScript 파일을 만든다. (이때, 작업 디렉토리는 여전히 `/`여야 한다.)

```js
/* code.js */

console.log(process.cwd());
console.log(__dirname);
```

아래 명령어를 통해 `/my-folder/code.js`파일을 실행한다.

```sh
node my-folder/code.js
```

출력 결과는 아래와 같다.

```sh
/ # process.cwd()
/my-folder # __dirname
```

## 2. **Next.js** 서버 컴포넌트에서의 활용 {#2-nextjs-server-component-usage}

Next.js에서는 `__dirname`을 사용하는 것이 일반적인 Node.js 환경과 다르게 동작할 수 있다. 그 이유는 Next.js가 빌드 타임에 코드를 번들링하고, 서버와 클라이언트 환경을 구분하기 때문이다. Next.js에서 `__dirname`은 서버에서 실행될 때 번들링된 파일의 경로를 가리키기에, 예상과는 다른 경로를 반환할 수 있어 주의해야 한다.

### 2-1. 차이점 {#2-1-differences}

1. `process.cwd()`: 현재 프로세스를 실행하는 디렉토리, 즉 **프로젝트 루트 디렉토리**를 반환한다. Next.js의 경우, 이는 주로 프로젝트의 루트 디렉토리를 가리키며, 파일을 찾을 때 사용하기 적합하다.

1. `__dirname`: 현재 파일이 위치한 디렉토리를 반환하는데, Next.js에서는 이 값이 번들링된 파일의 경로가 될 수 있다. 즉, Next.js가 빌드하고 배포한 후에는 경로가 다르게 동작할 수 있어 상대 경로를 설정하기 어려울 수 있다.

### 2-2. 예시 {#2-2-nextjs-server-component-example}

```js
/* /src/app/page.js */

export default function Page() {
  return (
    <>
      <p>process.cwd(): {process.cwd()}</p>
      <p>__dirname: {__dirname}</p>
    </>
  );
}
```

현재 작업 디렉토리를 `/`(루트)라 하자. 위 코드에서 `page.js`가 위치한 디렉토리는 `/src/app`이다. 만약, `__dirname`을 사용하여 특정 파일을 불러온다면, `path.resolve()`등의 함수와 조합하여 `/src/app/../data/data.json`과 같은 상대 경로를 이용하는 경우가 많을 것이다.

하지만, Next.js 빌드 후 `__dirname`이 번들링된 파일의 경로로 바뀌기에 원하는 파일을 찾지 못할 가능성이 매우 높아진다. 즉, 우리가 기대한 `__dirname`의 경로는 `/src/app`이었지만, 실제로는 `/.next/server/app`과 같은 번들링된 파일의 경로가 반환된다. 앞선 코드를 브라우저의 HTML에서 살펴보면, 아래와 같이 출력된다.

```txt
process.cwd(): /
__dirname: /.next/server/app
```

### 2-3. 결론 {#2-3-conclusion}

Next.js 프로젝트에서 파일 경로를 찾을 때는 `process.cwd()`를 사용하는 것이 훨씬 안정적이다. `process.cwd()`는 항상 프로젝트의 루트 디렉토리를 가리키기 때문에, 파일 경로를 지정할 때 더 일관성 있게 사용할 수 있다. **따라서, Next.js 환경에서는 `__dirname`보다는 `process.cwd()`의 사용을 권장한다.**
