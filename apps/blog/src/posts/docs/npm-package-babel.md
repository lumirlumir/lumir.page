---
title: 'Babel: `@babel/core`, `@babel/cli`, `@babel/preset-env`, `@babel/preset-react`, `babel-loader`'
description: 'Babel은 최신 자바스크립트 문법을 구버전 문법으로 변환하여 다양한 실행 환경에서 호환성을 제공하는 트랜스파일러로, ES6+ 코드뿐만 아니라 TypeScript와 JSX도 지원하며, 개발의존성으로 설치하여 사용할 수 있다.'
created: '2024-04-03'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://babel.dev/docs/'
  - 'https://www.daleseo.com/js-babel/'
---

개발자들이 실행 환경에 구애받지 않고 항상 최신 문법의 자바스크립트로 코딩할 수 있도록 도와주는 유용한 도구인 바벨(Babel)에 대해 알아보자. 아래 내용들은 Babel 7 기반의 설명들이다.

## 1. 자바스크립트 개발자의 딜레마 {#1-javascript-developer-dilemma}

자바스크립트 언어의 문법은 빠르게 진화하고 있지만, 정작 자바스크립트 코드를 실행해주는 환경은 이를 받쳐주지 못하는 경우가 많다. 예를 들어, 브라우저의 경우 종류가 워낙 다양해서 어떤 브라우저가 어떤 스펙을 지원하는지 일일이 파악하기가 힘들 정도이고, 노드(Node.js)의 경우에도 버전별로 지원하는 언어 문법이 다르기 때문에 브라우저만큼은 아니지만 비슷한 문제를 겪게 된다.

이러한 상황에서 자바스크립트 개발자들은 재밌는 딜레마에 빠지게 된다. 자바스크립트로 코딩을 할 때 ES6 이상의 최신 문법을 쓰자니 작성한 코드가 일부 실행 환경에서 작동하지 않는 이슈가 생길 것이고, 그렇다고 모든 환경에서 돌아가도록 보수적으로 코딩을 하자니 원튼 원치 않든 예전의 ES5 이하 방식으로 코드를 작성해야 하기 때문이다.

## 2. Babel: JavaScript Transpiler(Compiler) {#2-babel-javascript-transpiler-compiler}

이러한 개발자의 딜레마를 해결하기 위해 등장한 것이 바로 자바스크립트 트랜스파일러(transpiler)인 바벨(Babel)이다. 많은 개발자들은 Babel을 좀 더 편하게 자바스크립트 컴파일러(compiler)라고 부르기도 하는데, 엄밀히 얘기하면 컴파일(compile)은 인간이 작성한 소스 코드를 컴퓨터가 이해할 수 있도록 머신 코드로 바꿔주는 과정을 의미하지만, 트랜스파일(transpile)은 다른 실행 환경에서도 돌아갈 수 있도록 같은 언어를 유지한 채 소스 코드의 형태만 바꾸는 과정을 의미한다. 따라서, 인터프리터 언어인 자바스크립트는 C나 Java와 같은 컴파일 언어가 아니기 때문에 컴파일 과정이 필요 없다. 하지만, 실제 자바스크립트 커뮤니티에서는 이 두 용어가 혼용되어 사용되고 있기 때문에 뭐라고 부르든 크게 신경쓸 필요는 없을 것 같다.

Babel을 이용하면 ES6 이상의 최신 문법으로 작성한 자바스크립트 코드를 ES5 이하의 예전 문법으로 작성한 것 처럼 소스 코드 내의 문법의 형태를 변경할 수 있다. 이렇게 Babel을 통해 문법 형태가 바뀐 소스 코드는 최신 문법을 지원하는 실행 환경 뿐만 아니라 아직 최신 문법들이 적용되지 않은 실행 환경에서도 문제없이 작동하게 된다.

예를 들어, 아래 코드는 ES6에서 도입된 arrow function 문법을 사용하여 작성되었다. 하지만 만약 이 코드가 돌아가는 브라우저에서 아직 arrow function 문법을 지원하지 않는다면,

```js
[1, 2, 3].map((n) => n + 1);
```

다음과 같이 문법 오류가 발생하여 코드가 정상적으로 실행되지 않을 것이다.

```txt
SyntaxError: Unexpected token =>
```

하지만, Babel을 이용하면 위 소스 코드는 아래와 같이 일반 function 문법을 사용하도록 변경된다.

```js
[1, 2, 3].map(function (n) {
  return n + 1;
});
```

이렇게 형태가 바뀐 코드는 이제 모든 브라우저에서 정상적으로 실행된다.

## 3. TypeScript와 JSX 지원 {#3-typescript-and-jsx-support}

Babel은 ES6 이상의 최신 문법뿐만 아니라, TypeScript나 JSX로 작성된 코드를 변환할 때도 많이 사용된다. React는 일반적으로 JSX라는 특수한 문법을 사용하여 코딩을 하기 때문에, 개발자가 작성한 원본 코드는 브라우저에서 제대로 실행되지 않는다. 따라서, 보통 Webpack 번들러와 Babel 로더를 이용하여 React 프로젝트를 빌드한다.

## 4. 실습 프로젝트 셋업 {#4-practice-project-setup}

간단한 실습을 위해 터미널에서 다음과 같이 npm 프로젝트를 생성한다.

```txt
$ mkdir learn-babel
$ cd learn-babel
$ npm init -y
```

그리고 자바스크립트 파일을 하나 생성 후에 ES6의 arrow function 문법을 사용하여 코드를 작성한다.

```js
/* before.js */

[1, 2, 3].map((n) => n + 1);
```

지금부터 Babel을 사용하여 위 코드를 transpile 해보도록 하겠다.

## 5. Babel 설치 {#5-babel-installation}

먼저 프로젝트에 `@babel/core`와 `@babel/cli` 패키지를 개발의존성(devDependencies)으로 설치한다. (개발의존성으로 설치하는 이유는 Babel은 애플리케이션이 실행 시에 필요한 것이 아니라 빌드 시에만 필요하기 때문이다.) `@babel/core`는 어떤 방식으로 Babel을 사용하든 항상 필요한 패키지이고, `@babel/cli`는 터미널에서 커맨드를 입력해서 Babel을 사용할 때 필요한 패키지이다.

```sh
$ npm i -D @babel/core @babel/cli
```

자, 이제 터미널을 다음과 같이 `npx babel <파일명/디렉터리명>` 입력하면 터미널에 변환 결과가 출력된다.

```sh
$ npx babel before.js
[1, 2, 3].map(n => n + 1);
```

어라? 소스 코드의 형태가 처음에 작성한 그대로다. 그 이유는 아직 Babel에게 어떻게 코드를 변환할지에 대해서 알려주지 않았기 때문이다.

## 6. Plugin/Preset 설정 {#6-plugin-preset-configuration}

플러그인(plugin)이나 프리셋(preset)을 통해서 Babel에게 문법 변환 규칙을 알려줄 수 있다. 보통 plugin은 규칙 하나 하나를 미세하게 적용할 때 사용하고, preset은 여러 개의 규칙을 한 번에 적용할 때 사용한다.

실습 프로젝트는 `env`라는 가장 범용적으로 사용되는 preset을 사용해보도록 하겠다. env preset에는 ES6 이상(ES2015+)의 문법으로 작성된 코드를 ES5 문법의 코드로 변환해주는 모든 규칙을 정의하고 있다.

위와 마찬가지로 개발의존성으로 `@babel/preset-env` 패키지를 프로젝트에 설치한다.

```sh
$ npm i -D @babel/preset-env
```

그 다음, 이번에는 기존 Babel 커맨드에 `--presets=@babel/env`라는 옵션을 추가해서 실행하면,

```sh
$ npx babel before.js --presets=@babel/env
"use strict";

[1, 2, 3].map(function (n) {
  return n + 1;
});
```

이번에는 ES5 문법이 적용되어 arrow function 대신에 일반 function이 사용된 코드가 출력되는 것을 볼 수 있다.

## 7. Babel 설정 파일 {#7-babel-configuration-file}

Babel 커맨드를 실행할 때 마다 매번 옵션을 붙여서 설정을 해야 한다면 매우 번거로울 것이다. 그래서 대부분의 경우에는 `babel.config.js`나 `.babelrc`와 같은 설정 파일을 이용해서 Babel을 설정한다.

실습 프로젝트의 최상위 디렉터리에 `.babelrc` 파일을 생성 후에 다음과 같이 설정을 추가한다.

```js
/* .babelrc */

{
  "presets": ["@babel/env"]
}
```

자, 이제 커맨드 뒤에 옵션을 붙이지 않고 실행해도 `env` preset이 적용되는 것을 알 수 있다.

```sh
$ npx babel before.js
"use strict";

[1, 2, 3].map(function (n) {
  return n + 1;
});
```

## 8. 다른 설정 옵션들 {#8-other-configuration-options}

`-o` 옵션을 사용해서 터미널에 변환된 코드를 출력하는 대신에 다른 파일에 저장할 수 있다.

```sh
$ npx babel before.js -o after.js
```

```js
/* after.js */

"use strict";
[1, 2, 3].map(function (n) {
  return n + 1;
});
```

`-d` 옵션을 사용하면 특정 디렉터리 안에 여러 개의 변환된 파일을 저장할 수 있다. 다음 커맨드는 `src` 디렉터리 내의 모든 자바스크립트 파일을 변환하여 `dist` 디렉터리에 저장해준다.

```sh
$ npx babel src -d dist
```

## 9. NPM 스크립트 설정 {#9-npm-script-configuration}

Babel 커맨드를 자주 사용하는 상황이라면, NPM 스크립트로 등록해두고 사용하는게 편할 것이다.

```js
/* package.json */

{
  // ...
  "scripts": {
    "build": "babel src -d dist"
  },
  // ...
}
```

위와 같이 `build` 스크립트로 Babel 명령어를 지정해두면, `npm run build`라고 입력했을 때 Babel 커맨드가 실행된다.

```sh
$ npm run build

> learn-babel@1.0.0 build /Users/dale/learn-babel
> babel src -d dist

Successfully compiled 2 files with Babel.
```

## 10. 마치면서 {#10-closing}

지금까지 실습 프로젝트에서 직접 Babel 커맨드를 실행해보면서 Babel이 어떻게 소스 코드를 transpile 해주는지 살펴보았다. Babel은 이렇게 단독으로 사용되기도 하지만 규모가 큰 프로젝트에서는 보통 Webpack이나 Rollup과 같은 번들러(bundler)와 함께 사용되거나, 프레임워크의 일부로 포함되기도 한다. 따라서, 프로젝트의 초기 셋업에 참여하지 않는 이상 직접 Babel을 다룰 기회가 많지는 않지만, Babel은 최근에 거의 모든 자바스크립트 프로젝트에서 사용되는 중요한 도구이기 때문에 간단히 다뤄보았다.

## 11. 정리 {#11-summary}

- `@babel/core`: 어떤 방식으로 Babel을 사용하든 항상 필요한, 핵심 기능을 포함한 패키지이다.
- `@babel/cli`: 터미널에서 커맨드를 입력해서 Babel을 사용할 때 필요한 패키지이다.
- `@babel/preset-env`: 가장 범용적으로 사용되는 preset이다. ES6 이상(ES2015+)의 문법으로 작성된 코드를 ES5 문법의 코드로 변환해주는 모든 규칙을 정의하고 있다.
- `@babel/preset-react`: React를 위한 preset이다. 기본적으로 JSX 문법과 React 컴포넌트를 정의할 때 사용되는 표현식을 JavaScript로 변환하는 데 필요한 모든 규칙을 정의하고 있다.
- `babel-loader`: Babel과 Webpack을 연동시켜준다.
