---
title: '`nvm`과 `.nvmrc`란 무엇인가?'
description: '`nvm`은 Node.js 버전 관리 도구로, `.nvmrc` 파일을 사용해 프로젝트에 필요한 Node.js 버전을 기록하고 쉽게 설치하거나 변경할 수 있도록 돕는다.'
created: '2024-07-20'
updated: '2026-05-17'
categories:
  - 'nodejs'
references:
  - 'https://github.com/nvm-sh/nvm'
  - 'https://chatgpt.com/share/10d12a70-cc6e-4770-9318-24b864d5d8d6'
  - 'https://velog.io/@hyevvy/nvm%EA%B3%BC-nvmrc'
  - 'https://univdev.page/posts/nvmrc/'
---

Node.js 작업 간, 원활한 협업을 위해 사용하는 `nvm`과 `.nvmrc`에 대해 알아보자.

## 1. `nvm`이란?

`nvm`은 Node.js의 Version Manager로, [Github Repository](https://github.com/nvm-sh/nvm)에 아래와 같은 소개 문구가 적혀있다.

"nvm allows you to quickly install and use different versions of node via the command line."

즉, "서로 다른 버전의 Node를 CLI를 통해 빠르게 설치하고 사용할 수 있도록 해준다." 라는 것이 바로 `nvm`의 역할이다.

## 2. `.nvmrc`란?

`.nvmrc`란, 프로젝트 구동을 위한 Node.js 버전을 기록할 수 있는 파일을 말한다. Node.js 프로젝트에서 타인이 만든 프로젝트를 구동할 때, 버전 문제가 발생해서 실행을 못한다거나 일부 라이브러리를 사용하지 못했던 경험이 한 번 쯤은 있을 것이다. `README.md` 파일에 버전을 적어두는 것 보다, 협업 대상자가 명령어 한 줄로 Version Sync를 가능하게 만드는게 훨씬 유용할 것이다.

### 2-1. 작성 방법

1. 프로젝트 최상단에 `.nvmrc` 파일을 생성한다.
1. 해당 `.nvmrc` 파일에 버전을 기재한다.

```txt
24.15.0
```

혹은, 맨 앞에 `v`를 붙여 작성한다.

```txt
v24.15.0
```

### 2-2. 사용 방법

주로, 프로젝트를 Clone 하였을 때 사용할 수 있는 방법이다.

#### 2-2-1. 해당 버전이 설치 되어있지 않은 경우

아래 명령어를 입력하면 `.nvmrc`를 읽어 기재된 버전을 설치한다.

```sh
nvm install
```

#### 2-2-2. 해당 버전으로 변경

아래 명령어를 입력하면 `.nvmrc`를 읽어 해당 버전으로 변경한다.

```sh
nvm use
```
