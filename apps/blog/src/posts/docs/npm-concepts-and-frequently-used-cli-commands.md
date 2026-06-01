---
title: '`npm` 개념 및 자주 사용하는 CLI 명령어 모음'
description: '`npm`은 Node.js의 패키지 관리 도구로, 패키지 설치, 초기화, 업데이트 및 삭제를 지원하며, 다양한 플래그를 통해 의존성과 개발 의존성을 효율적으로 관리할 수 있게 해준다.'
created: '2024-08-01'
updated: '2024-08-01'
categories:
  - 'npm'
references:
  - 'https://docs.npmjs.com/cli/v10/commands/npm-install'
  - 'https://carrotweb.tistory.com/107'
  - 'https://binit.tistory.com/36'
  - 'https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/'
  - 'https://hellominchan.tistory.com/10'
  - 'https://velog.io/@me2designer/NPM-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%A4%EC%A0%95'
  - 'https://c17an.netlify.app/blog/node.js/npm-install-%EC%A0%95%EB%A6%AC/article/'
---

Package(Module)는 프로그램의 구성요소 중 특정 기능을 수행할 수 있는 코드 집합을 의미한다. 유명 플랫폼들은 저마다의 Package Manager를 가지고 있다.

- Python: pip
- Java: Maven, Gradle
- PHP: Composer
- Ruby: RubyGems
- Linux(RedHat): rpm, yum
- Linux(Debian): dpkg, apt
- Mac: Homebrew

이처럼, `npm`(Node Package Manager)은 Node.js 기반 모듈의 설치 및 관리를 도와주는 프로그램이다. 전 세계 개발자들이 JavaScript 기반의 오픈 소스 모듈을 `npm` 저장소에 올려두면, 사용자들은 `npm` 명령어를 통해 특정 모듈을 다운로드하여 사용한다.

`npm`은 따로 설치할 필요 없이, Node.js를 설치하면 자동으로 함께 설치된다.

여러 강좌나 개발 문서를 따라가다 보면, `npm install` 등의 다양한 명령어에 `--save-dev`, `-g` 등 여러 플래그가 붙은 것을 확인할 수 있는데, 이것들은 무엇이고 어떤 역할을 하는지 알아보자.

## 1. `npm` {#1-npm}

### 1-1. Flags {#1-1-npm-flags}

#### 1-1-1. `--version` {#1-1-1-npm-version-flag}

> aliases: `-v`

`npm`의 버전을 확인할 수 있다.

- 입력

  ```sh
  npm --version
  ```

- 출력

  ```sh
  10.8.1
  ```

## 2. `npm init` {#2-npm-init}

> aliases: `create`, `innit`

`npm` 패키지를 생성(초기화)하며, `package.json`을 생성한다.

- 입력

  ```sh
  npm init
  ```

- 출력

  ```sh
  package name: (name) # 패키지 및 디렉토리 이름이다. (name)은 기본 값이다.
  version: (1.0.0) # 패키지 버전이다. (1.0.0)은 기본 값이다.
  description: # 패키지에 대한 설명이다.
  entry point: (index.js) # 시작 파일 이름이다. (index.js)는 기본 값이다.
  git repository: # 패키지가 저장되어 있는 Git 저장소의 URL이다.
  keywords: # 패키지의 키워드이다.
  author: # 원작자의 이름이다. 이름이나 아이디를 입력하면 된다.
  license: (ISC) # 패키지 사용에 대한 라이선스이다. (ISC)는 기본 값이다.
  ```

### 2-1. Flags {#2-1-npm-init-flags}

#### 2-1-1. `--yes` {#2-1-1-npm-init-yes-flag}

> aliases: `-y`

`--yes` 플래그를 통해 질문에 답변할 필요 없이, 모든 답변에 <Kbd>y</kbd>를 입력한 것과 같은 효과를 낼 수 있다.

주로, 터미널에서 직접 설정하기 보다는 `package.json`을 변경하는 것이 직관적이므로, `npm init --yes` 명령어를 통해 터미널 설정을 생략하고 `package.json`을 생성하기 위해 사용한다.

```sh
npm init --yes
```

## 3. `npm install` {#3-npm-install}

> aliases: `add`, `i`, `in`, `ins`, `inst`, `insta`, `instal`, `isnt`, `isnta`, `isntal`, `isntall`

`npm install`의 동작을 둘로 나누면 아래와 같다.

1. 패키지를 명시해 특정 패키지를 설치하는 동작.<sup>1</sup>
1. 패키지를 명시하지 않고, `package.json` 파일의 `dependencies`(의존성) 및 `devDependencies`(개발의존성)를 모두 설치하는 동작.<sup>2</sup>

예를 들어,

1. `npm install react`를 실행하면 `react` 모듈을 설치할 것이고<sup>1</sup>,
1. `npm install`을 실행하면 `package.json`에 포함된 의존성 패키지들을 일괄적으로 설치할 것이다<sup>2</sup>.

### 3-1. 패키지를 명시해 특정 패키지를 설치하는 동작<sup>1</sup> {#3-1-install-specific-package}

특정 패키지를 설치할 때<sup>1</sup>에도, 크게 두 가지 옵션이 존재한다.

1. `npm install [<@scope>/]<name>@<version>`을 통해, 프로젝트를 구동할 때 필요한 `dependencies` 목록에 추가될 패키지를 설치하는 옵션<sup>1-1</sup>.
1. `npm install --save-dev [<@scope>/]<name>@<version>`을 통해, 개발 단계에서만 필요한 `devDependencies` 목록에 추가될 패키지를 설치하는 옵션<sup>1-2</sup>.

#### 3-1-1. Flags: <code>&nbsp;</code>(생략)<sup>1-1</sup> {#3-1-1-install-save-flag-omitted}

> aliases: `--save-prod`, `--save`, `-P`

플래그를 생략할 경우, 자동으로 `--save-prod`로 인식한다.

`package.json`의 `dependencies`(의존성)에 추가한다. `dependencies`는 `react` 패키지처럼, 실제 코드에 포함되는 앱 구동을 위해 필요한 의존성 파일들을 뜻한다.

```sh
npm install [<@scope>/]<name>@<version>
```

> [!TIP]
>
> 1. `@<version>`을 입력하지 않으면, 패키지의 최신 버전으로 설치된다.
>
> 1. `@latest`를 통해 최신 버전을 설치할 수 있다. (업데이트에 활용.)
>
> 1. 여러 패키지를 나열하여, 동시에 여러 패키지를 설치할 수 있다.
>
>     ```sh
>     $ npm install react react-dom@latest
>     ```

#### 3-1-2. Flags: `--save-dev`<sup>1-2</sup> {#3-1-2-install-save-dev-flag}

> aliases: `-D`

`package.json`의 `devDependencies`(개발의존성)에 추가한다. `devDependencies`는 `eslint` 패키지처럼 실제 코드에 포함되지 않으며, 개발 단계에만 필요한 의존성 파일들을 뜻한다.

```sh
npm install --save-dev [<@scope>/]<name>@<version>
```

#### 3-1-3. Flags: `--global` {#3-1-3-install-global-flag}

> aliases: `-g`

패키지를 프로젝트(Local)가 아닌, 시스템의 `node_modules` 폴더에 전역(Global)으로 설치한다. 이를 통해 다른 Node.js 프로젝트에서도 해당 패키지를 사용할 수 있다.

|OS|Path|
|---|---|
|Window|`C:\Users\%USERPROFILE%\AppData\Roaming\npm\node_modules`|
|Mac|`/usr/local/lib/node_modules`|

`--global`(`-g`) 플래그를 사용할 경우, `package.json`에 기록되지 않는다.

시스템의 `node_modules` 경로는 `npm root -g`를 통해 찾을 수 있다.

### 3-2. 패키지를 명시하지 않고, ... 모두 설치하는 동작<sup>2</sup> {#3-2-install-all-packages-from-package-json}

패키지명 없이 `npm install`만을 실행하게 되면, 프로젝트의 `package.json`에 기록된 모든 `dependencies`(의존성) 및 `devDependencies`(개발의존성)를 내려받는다.

#### 3-2-1. Flags: `--production` {#3-2-1-install-production-flag}

`devDependencies` 파일은 개발에만 사용되기에, 일반 사용자들이 해당 패키지를 내려받는 것은 낭비일 수 있다. 이때 사용하는 플래그가 `--production`으로, 해당 플래그를 붙이면 `devDependencies`(개발의존성)를 제외한 `dependencies`(의존성) 파일만을 내려받는다.

```json
{
  "devDependencies": {
    "eslint": "^9.8.0"
  },
  "dependencies": {
    "react": "^18.3.1"
  }
}
```

위와 같이 기록된 `packages.json`에 `npm install --production`을 실행하면, `eslint`를 제외한 `react` 패키지만을 설치한다.

## 4. `npm uninstall` {#4-npm-uninstall}

> aliases: `unlink`, `remove`, `rm`, `r`, `un`

명령 뒤에 삭제할 패키지명을 입력하면, 설치된 패키지 관련 모든 파일이 `node_modules`에서 삭제될 뿐만 아니라, `package.json`에서도 삭제된다.
(단, 설치할 때 특정 옵션을 사용했다면, 삭제할 때도 같은 옵션을 넣어주자.)

```sh
npm uninstall [<@scope>/]<pkg>...
```

## 5. `npm update` {#5-npm-update}

> aliases: `up`, `upgrade`, `udpate`

설치된 패키지를 최신 버전으로 업데이트한다. (의존성이 엮여있는 패키지를 잘못 업데이트할 경우, 기존 프로젝트에 오류가 발생할 수 있으니 주의하자.)

```sh
npm update [<pkg>...]
```
