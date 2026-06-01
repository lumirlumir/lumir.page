---
title: 'Dotenv: `dotenv`, `dotenv-webpack`'
description: '`dotenv` 라이브러리를 사용하면 Node.js 프로젝트에서 환경 변수를 `.env` 파일로 관리하고 쉽게 접근할 수 있으며, 이를 통해 개발 환경에 따라 다른 설정을 안전하게 사용할 수 있다.'
created: '2024-04-04'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://www.daleseo.com/js-dotenv/#%EB%A7%88%EC%B9%98%EB%A9%B4%EC%84%9C'
  - 'https://db2dev.tistory.com/entry/React-Webpack%EC%9C%BC%EB%A1%9C-%EA%B5%AC%EC%B6%95%ED%95%9C-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98env-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0'
---

`dotenv`를 통해 환경 변수를 `.env` 파일로 관리하는 방법에 대해 알아보자.

환경 변수(Environment Variables)란, 프로세스가 컴퓨터에서 동작하는 방식에 영향을 미치는 동적인 값들의 모임이다. 즉, OS 입장에서 특정 프로세스를 실행하기 위해 참조하는 변수들이다.

개발을 하다 보면, 서비스나 API의 URL처럼 개발ㆍ테스트ㆍ배포 환경별로 다른 값을 적용해야 하는 경우가 있다. 또한, API를 사용하기 위해 발급받은 Key들은 외부(Github 등)에 올라가면 안된다. 이러한 상황에서, 특정 변수를 환경별로 설정하거나, 빌드 단계가 끝나면 제외하기 위해 환경 변수를 활용한다.

많은 Node.js 프로젝트에서 환경 변수를 좀 더 효과적으로 관리하기 위해서 `dotenv`라는 라이브러리를 사용하고 있다. 이번에는 환경 변수를 파일에 저장해놓고 접근할 수 있게 도와주는 `dotenv` 라이브러리에 대해 알아보자.

## 1. `dotenv` 패키지 설치 {#1-install-dotenv-package}

npm 패키지 매니저를 이용하여 `dotenv` 라이브러리를 `dependencies`로 Node.js 프로젝트에 설치한다.

```sh
$ npm i dotenv
```

## 2. `.env` 파일 작성 {#2-write-env-file}

`dotenv` 라이브러리는 아무 설정을 하지 않으면, 현재 디렉토리에 위치한 `.env` 파일로 부터 환경 변수를 읽어온다. `.env` 파일을 생성하고, 그 안에 필요한 환경 변수를 `Key=Value`의 포맷으로 나열해보겠다.

> `.env` 파일은 JSON이나 YAML 형식이 아닌, 단순히 키와 값의 쌍을 나열하는 형식으로 구성된다.

```sh
# .env

DB_HOST=localhost
DB_USER=root
DB_PASS=1234
```

이렇게 `.env` 파일에 저장해놓은 환경 변수들을 `dotenv` 라이브러리를 이용해서 `process.env`에 설정할 수 있다.

본인 프로젝트가 CommonJS 기반인지 ES 모듈 기반인지에 따라 라이브러리 사용법이 약간 상이하므로, 나눠서 설명하겠다.

## 3. CommonJS에서 환경 변수 불러오기 (`require`) {#3-load-environment-variables-in-commonjs-require}

먼저, Node.js에서 전통적으로 제공해왔던 모듈 시스템인 CommonJS에서 `dotenv` 라이브러리를 어떻게 사용하는지 알아보자.

프로그램을 구동할 때 제일 먼저 실행되는 자바스크립트 파일(ex. `index.js`, `main.js`)의 최상위에 다음과 같이 `dotenv` 라이브러리를 임포트한 후 `config()` 함수를 호출해주기만 하면 된다.

```js
/* index.js */

require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

예를 들어, 위 코드를 실행하면 `process.env`로 부터 읽혀진 환경 변수가 출력되는 것을 볼 수 있다.

```sh
$ Node index.js
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

하지만, 같은 파일 내에서 `dotenv` 라이브러리의 `config()` 함수를 호출하기 전에 `process.env`를 읽으면 안 되니 주의하자.

```js
/* index.js */

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

require("dotenv").config();
```

```sh
$ Node index.js
DB_HOST: undefined
DB_USER: undefined
DB_PASS: undefined
```

## 4. ES 모듈에서 환경 변수 불러오기 (`import`) {#4-load-environment-variables-in-es-modules-import}

ES 모듈을 사용하고 있는 Node.js 환경에서는 `require` 대신에 `import` 키워드를 사용해서 `dotenv` 패키지를 불러오면 된다.

```js
/* index.mjs */

import dotenv from "dotenv";

dotenv.config();

console.log("DB_HOST", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

## 5. React 프로젝트에서 환경 변수 불러오기 {#5-load-environment-variables-in-react-project}

CRA(create-react-app)로 구축한 React 프로젝트에는 이미 `dotenv` 패키지가 포함되어 있어 별도의 설치가 필요없다. 하지만, Webpack 등을 통해 직접 구축한 React 프로젝트에는 `dotenv` 패키지가 포함되어 있지 않아 설치가 필요하다.

### 5-1. CRA로 구축한 React 프로젝트 {#5-1-react-project-built-with-cra}

이미 `dotenv` 패키지가 포함되어 있어, 별도의 패키지 추가나 Webpack에 대한 설정 없이, 프로젝트 Root에 `.env` 파일을 생성하고 변수를 선언하는 것만으로도 환경 변수를 사용할 수 있다.

```sh
# .env

REACT_APP_ENV=development
REACT_APP_API_URL=<https://api.random-api.com>
REACT_APP_API_KEY=1234asdf
```

- 변수명은 반드시 `REACT_APP_`으로 시작해야 한다. CRA가 내부적으로 `REACT_APP_`으로 시작하는 환경 변수만 읽어들인다.

- `process.env.REACT_APP_[변수명]`으로 변수에 접근한다.

- `.env`에 변수를 추가 혹은 수정한 경우, 서버를 재실행해야만 설정이 반영된다.

### 5-2. Webpack으로 구축한 React 프로젝트 {#5-2-react-project-built-with-webpack}

#### 5-2-1. 만날 수 있는 오류 {#5-2-1-possible-errors}

앞서 설명한 Common JS와 ES 모듈에서의 방식을 React에서도 동일하게 사용하면, 아래와 같은 `Error`를 만나기 십상이다.

```txt
Module not found: Error: Can't resolve 'fs' in '/node_modules/dotenv/lib'
Module not found: Error: Can't resolve 'path' in '/node_modules/dotenv/lib'
Module not found: Error: Can't resolve 'os' in '/node_modules/dotenv/lib'
...
If you want to include a polyfill, ...
If you don't want to include a polyfill, ...
```

이는 `fs`, `path`, `os` 모듈을 찾지 못해 발생하는 `Error`이다. 이때, Webpack의 `resolve` 옵션에 `polyfill`을 지정하라고 안내하지만, 이를 지정하더라도 또 다른 에러가 발생할 뿐이다.

문제의 핵심은 `fs`, `path`, `os` 같은 Node.js의 기본 모듈들이 React와 같은 클라이언트 사이드(브라우저 환경) 자바스크립트에서는 사용할 수 없다는 것이다. (이는 특정 자바스크립트 파일을 Node.js 상에서 실행했는지, 아니면 브라우저 환경에서 실행했는지의 차이로 볼 수 있다.) 이러한 모듈들은 서버 사이드에서 실행되는 Node.js 환경에서만 사용 가능하며, 클라이언트 사이드에서는 지원되지 않는다. 즉, React에서는 `fs`, `path`, `os`가 제공되지 않아 프로젝트 내부에서 사용할 수 없는 것이다. 따라서, React와 같이 클라이언트 사이드에서 실행되는 애플리케이션에서 이러한 모듈들을 직접 사용하려고 하면 `Module not found` 오류를 만나게 된다.

`dotenv` 패키지는 `.env` 파일에 선언한 환경 변수를 `process.env`에 로드해주는 무의존성(zero-dependency) 모듈이다. `os`, `path` 모듈로 `.env`의 절대 경로를 찾고, `fs` 모듈로 `.env` 파일을 읽어 `process.env`에 `Key=Value`의 포맷으로 담는다. 이 과정에서 `fs`, `path`, `os` 모듈을 사용한다. 결국, `dotenv`는 Node.js 환경에서만 실행되는 서버 사이드 패키지인 것이다. 따라서, 클라이언트 사이드에서는 다른 방법을 모색해야만 한다.

#### 5-2-2. React에서 `dotenv`를 환경 변수로 사용하는 3가지 방법 {#5-2-2-three-ways-to-use-dotenv-in-react}

> `webpack.DefinePlugin()`, `webpack.EnvironmentPlugin()`, `JSON.stringify()` 메소드 자체에 대한 자세한 내용은 다른 마크다운 문서 참조.

아래 코드를 통해, `process.env`에 `.env` 파일의 환경 변수들이 포함되었나 우선적으로 확인할 수 있다.

```js
/* webpack.config.js */

const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  ...
}

console.log(process.env)
```

```sh
$ node webpack.config.js
```

##### 5-2-2-1. `webpack.DefinePlugin()` {#5-2-2-1-webpack-define-plugin}

`webpack.DefinePlugin()`을 사용해, 파일 어디서든 접근할 수 있도록 `process.env`라는 전역 변수를 정의한다.

이 때, 반드시 `JSON.stringify()`를 통해 JSON 문자열로 변환해주어야 한다. 이를 누락하면 Syntex Error가 발생한다.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  ...
}
```

##### 5-2-2-2. `webpack.EnvironmentPlugin()` {#5-2-2-2-webpack-environment-plugin}

`webpack.EnvironmentPlugin()`은 `webpack.DefinePlugin()`에 `process.env` 변수를 정의하는 것과 동일하지만, 단축된 문법을 지원한다. 배열에 설정한 `Key`들은 똑같이 `process.env`로 접근할 수 있다.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.EnvironmentPlugin([
      "KEY_1",
      "KEY_2",
      "KEY_3",
    ]),
  ],
  ...
}
```

위 코드는 아래처럼 `webpack.DefinePlugin()`으로 정의하는 것과 완전히 동일하다.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin([
      "process.env.KEY_1": JSON.stringify(process.env.KEY_1),
      "process.env.KEY_2": JSON.stringify(process.env.KEY_2),
      "process.env.KEY_3": JSON.stringify(process.env.KEY_3),
    ]),
  ],
  ...
}
```

##### 5-2-2-3. `dotenv-webpack` 패키지 {#5-2-2-3-dotenv-webpack-package}

`dotenv`가 아니라, `dotenv-webpack` 패키지를 사용하는 간단한 방법도 있다.

먼저, 패키지를 설치한다.

```sh
$ npm install -D dotenv-webpack
```

그 다음, 다음과 같이 `webpack.config.js`를 설정한다.

```js
/* webpack.config.js */

const Dotenv = require("dotenv-webpack");

module.exports = {
  ...
  plugins: [
    new Dotenv(),
  ],
  ...
}
```

### 5-3. 요약 {#5-3-summary}

CRA로 구축한 React 프로젝트.

- `.env` 파일에 환경 변수를 선언할 때, 반드시 `REACT_APP_`으로 시작해야 한다.
- 별도의 설정 없이, `/src` 디렉터리의 하위 파일에서 `process.env`로 환경 변수에 접근할 수 있다.

Webpack으로 구축한 React 프로젝트.

- `.env` 파일에 환경 변수를 선언할 때, `REACT_APP_`으로 시작하지 않아도 된다.
- `dotenv` 패키지: Webpack의 `plugins`에 `new webpack.DefinePlugin()`을 추가하여 수동으로 전역 변수를 정의한다.
- `dotenv-webpack` 패키지: Webpack의 `plugins`에 `new Dotenv()`를 추가한다.

## 6. 다른 파일에 환경 변수 저장하기 {#6-store-environment-variables-in-another-file}

만약에 `.env`가 아닌 다른 경로에 있는 파일에 환경 변수를 저장해야 한다면 어떻게 해야할까?

```sh
# .env.local

DB_HOST=localhost
# DB_USER=root
DB_USER=test
# DB_PASS=1234
DB_PASS=5678
```

그럴 때는 `config()` 함수를 호출 시 `path` 옵션에 해당 파일 경로를 넘기면 된다.

```js
/* index.mjs */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: test
DB_PASS: 5678
```

## 7. 프로그램을 실행하면서 환경 변수 불러오기 {#7-load-environment-variables-while-running-program}

`dotenv`를 임포트(`import`)하여 `dotenv.config()` 함수를 코드에서 호출하기 힘든 상황이라면, 프로그램을 구동할 때, `node` 커맨드의 `-r` 또는 `--require` 옵션으로 `dotenv/config`를 넘기는 방법도 있다. 이 방법을 사용하면 `dotenv` 라이브러리를 코드에 직접 `import`하지 않아도 `.env` 파일에 저장된 환경 변수가 `process.env`에 설정된다.

우선 `index.js`나 `index.mjs` 파일을 열고 `dotenv` 패키지를 불러와서 `dotenv.config()` 함수를 호출하는 부분을 삭제한다.

```js
/* index.mjs */

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

`-r` 옵션으로 `dotenv/config`를 넘겨서 실행을 해보면 정상적으로 환경 변수가 출력되는 것을 볼 수 있다.

```sh
$ Node -r dotenv/config index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

만약에 `.env`가 아닌 다른 경로에 있는 파일에 환경 변수를 저장해놨다면 `DOTENV_CONFIG_PATH` 환경 변수를 사용하면 된다.

```sh
$ DOTENV_CONFIG_PATH=.env.local Node -r dotenv/config index.mjs
DB_HOST: localhost
DB_USER: test
DB_PASS: 5678
```

이 방법은 어떤 프로젝트가 CommonJS 기반인지 ES 모듈 기반인지 미리 알 수 없을 때 매우 유용하다. 왜냐하면 해당 Node.js 런타임(runtime)이 어떤 모듈 시스템을 사용하든지 상관없이 통하는 방법이기 때문이다.

## 8. ES 모듈에서 발생하기 쉬운 실수 {#8-common-mistakes-in-es-modules}

ES 모듈을 사용할 때는 CommonJS를 사용할 때 보다 좀 더 주의가 필요하다. 흔히 발생하는 문제를 재현해보겠다.

아래 코드를 보면, `dotenv` 라이브러리를 제일 먼저 `import`하기 때문에 `db.js` 파일이 `process.env`에 접근할 때 환경 변수가 설정되어 있을 것만 같다.

```js
/* db.mjs */

export const db_host = process.env.DB_HOST;
export const db_user = process.env.DB_USER;
export const db_pass = process.env.DB_PASS;
```

```js
/* index2.mjs */

import dotenv from "dotenv";
import { db_host, db_user, db_pass } from "./db.js";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

console.log({ db_host, db_user, db_pass });
```

하지만 실제 실행을 해보면, `db.js` 파일이 `process.env`에 접근했을 시점에는 환경 변수가 설정이 되어 있지 않았던 것을 알 수 있다.

```sh
$ Node index2.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
{ db_host: undefined, db_user: undefined, db_pass: undefined }
```

이러한 현상이 발생하는 이유는 `dotenv.config()` 함수가 `db.js` 파일이 `import`된 이후에 호출되었기 때문이다. 이 문제는 `dotenv` 라이브러리를 `import`하는 코드를 별도의 파일로 빼고, 그 안에서 `dotenv.config()` 함수를 호출하면 피할 수 있다.

```js
/* env.mjs */

import dotenv from "dotenv";

dotenv.config();
```

```js
/* index2.mjs */

import "./env.js";
import { db_host, db_user, db_pass } from "./db.js";

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

console.log({ db_host, db_user, db_pass });
```

이제 다시 프로그램을 실행을 해보면 환경 변수가 모든 파일에서 정상적으로 읽히는 것을 볼 수 있다.

```sh
$ Node index2.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
{ db_host: 'localhost', db_user: 'root', db_pass: '1234' }
```

이처럼, 프로그램이 시작된 후 가급적 `dotenv.config()` 함수를 빨리 호출하는 것이 안전하다.

## 9. 이미 설정되어 있는 환경 변수 {#9-already-configured-environment-variables}

운영체제 수준에서 이미 설정되어 있는 환경 변수는 `dotenv`를 통해 파일에서 읽어온 환경 변수 값들로 덮어써지지 않으니 주의가 필요하다. 예를 들어, 리눅스 계열 운영체제에서 다음과 같이 프로그램을 실행하기 전에 미리 `DB_PASS` 환경 변수를 설정해놓으면,

```sh
$ export DB_PASS=0000
$ Node index.mjs
```

`.env` 파일에 설정해놓은 `1234`가 무시되고 `0000`이 적용되는 것을 볼 수 있다.

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

참고로, 어느 환경 변수가 이미 설정되어 있었는지는 `debug` 옵션을 `true`로 주면 쉽게 알아낼 수 있다.

```js
/* index.mjs */

import dotenv from 'dotenv';
const result = dotenv.config({ debug: true });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index.mjs
[dotenv@16.0.3][DEBUG] "DB_PASS" is already defined in `process.env` and was NOT overwritten
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

`.env` 파일에 설정해놓은 환경 변수의 값이 기 설정된 환경 변수의 값을 덮어쓰기를 원한다면 (좋은 관행은 아니다.) `override`를 `true`로 설정하면 된다.

```js
/* index.mjs */

import dotenv from 'dotenv';
const result = dotenv.config({ debug: true, override: true });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index2.mjs
[dotenv@16.0.3][DEBUG] "DB_PASS" is already defined in `process.env` and was overwritten
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

## 10. 보안상 주의 사항 {#10-security-precautions}

`.env` 파일에는 보통 데이터베이스의 비밀번호나 서드파티(3rd-party) 서비스의 API 키와 같이 민감한 인증 정보가 들어가기 때문에 Github와 같은 코드 저장소(repository)에 올리면 상당히 위험할 수 있다. 특히, 협업 프로젝트에서는 `.gitignore` 파일에 이용하여 개발자들이 실수로라도 코드 저장소에 올릴 수 없도록 설정해놓는 것이 바람직하다.

```js
/* .gitignore */

.env
.env.local
```

뿐만 아니라, `.env.production`, `.env.staging`, `.env.qa`, `.env.development`, `.env.local`, `.env.test` 이런 식으로 각 배포(deploy) 환경 별로 환경 변수를 다른 파일에 저장해두고 사용하는 것도 심심치 않게 볼 수 있다. 이렇게 하면 위와 마찬가지 이유로 보안 이슈에 취약할 뿐만 아니라, 일반적으로 코드(code)와 설정(config)을 한 곳에서 관리하는 것은 좋지 않은 소프트웨어 개발 관행으로 여겨진다.

따라서, `.env` 파일은 개발자가 로컬 환경에서 환경 변수를 설정해야할 때만 제한적으로 사용하는 것이 좋으며, 그 밖에 환경에서는 운영 체제 수준에서 제대로 환경 변수를 설정해줘야한다.
