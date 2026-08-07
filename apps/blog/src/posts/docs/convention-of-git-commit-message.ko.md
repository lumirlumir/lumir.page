---
title: 'Git Commit Message 규칙'
description: 'Commit Message는 명령문 형태로 작성하며, Header, Body, Footer로 구성된다. 제목은 50글자 이내, 첫 글자 대문자, 마침표 없이 작성하고, 상세 설명은 Body에 추가하며, 이슈 관련 정보는 Footer에 작성한다.'
created: '2024-05-29'
updated: '2024-06-11'
categories:
  - 'convention'
  - 'git'
references:
  - 'https://velog.io/@chojs28/Git-%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B7%9C%EC%B9%99'
  - 'https://jane-aeiou.tistory.com/93'
  - 'https://richone.tistory.com/26'
  - 'https://guuumi.tistory.com/128'
  - 'https://webisfree.com/2017-02-18/git-%EC%BB%A4%EB%B0%8B-%EB%AA%85%EB%A0%B9%EC%8B%9C-%EC%97%AC%EB%9F%AC%EC%A4%84%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95'
---

팀원과의 소통, 편리한 과거 기록의 추적을 위해 규칙에 맞는 Commit Message를 작성하는 것이 중요하다.

## 1. Commit Message의 7가지 규칙 {#1-commit-message-seven-rules}

1. `Title`과 `Body`를 <u>빈 행으로 구분</u>한다.
1. `Title`은 영문 기준 <u>50글자</u> 이내로 제한한다.
1. `Title`의 <u>첫 글자는 대문자</u>로 작성한다.
1. `Title` 끝에는 <u>마침표를 넣지 않는다.</u>
1. `Title`은 <u>명령문</u>으로 사용하며 <u>과거형을 사용하지 않는다.</u>
1. `Body`의 <u>각 행은 영문 기준 72글자 내</u>로 제한한다.
1. 어떻게 보다는 <u>무엇과 왜</u>를 설명한다.

## 2. Commit Message 구조 {#2-commit-message-structure}

```sh
# Header, Body, Footer는 빈 행으로 구분한다.

Type(Scope): Title # Header

Body # Body

Footer # Footer
```

### 2-1. `Header` {#2-1-commit-message-header}

- `Header`는 필수이다.
- `Type`은 해당 Commit의 성격을 나타내며, 아래 중 하나여야 한다.

  `Type` | 내용
  :---: | ---
  build | 빌드 관련 파일 수정. 모듈 설치 또는 삭제.
  chore | 패키지 매니저, `.gitignore` 등 여러가지 자잘한 수정.
  ci | CI 관련 설정 파일 수정.
  design | 사용자 UI 디자인(CSS 등) 변경.
  docs | 문서 수정.
  feat | 새로운 기능.
  fix | 버그 수정.
  perf | 성능 개선.
  refactor | 코드 리팩토링.
  remove | 파일을 삭제만 한 경우.
  rename | 파일 혹은 폴더명을 수정만 한 경우.
  style | 기능 수정 없는 코드 스타일(포맷팅) 변경.
  test | 테스트 코드 추가 및 수정.

- `Scope`는 생략 가능하다.
- `Title`에는 제목, 주제를 입력한다.

### 2-2. `Body` {#2-2-commit-message-body}

`Body`는 본문으로, `Header`에서 표현할 수 없는 상세한 내용을 적는다.

`Header`에서 충분히 표현할 수 있다면 생략 가능하다.

### 2-3. `Footer` {#2-3-commit-message-footer}

```txt
Resolves(Closes, Fixes): #IssueNo, ... (해결한 이슈, 생략 가능)

See also(Ref, Related to): #IssueNo, ... (참고한 이슈, 생략 가능)
```

`Footer`는 바닥글로 생략 가능하다.

어떤 ***Issues***에서 왔는지 등의 참조 정보들을 추가하는 용도로 사용한다. 예를 들어, 특정 ***Issues***를 참조하려면 `Resolves: #1137` 와 같이 작성한다.

## 3. Commit Message 여러 줄 입력 {#3-enter-multiline-commit-message}

`-m` 옵션을 사용한다. 이는 ***vim***에서 별도의 메세지를 작성할 필요없이, 명령창에서 바로 인라인 형식으로 Commit Message를 작성할 수 있게 해준다.

### 3-1. 한 줄 {#3-1-single-line-commit-message}

```sh
$ git commit -m "Commit Message"
```

### 3-2. 여러 줄 {#3-2-multiline-commit-message}

Commit Message의 첫 줄에 '닫는 따옴표'를 넣지 말고, 마지막 줄에 사용한다. 즉, 첫 줄에 '여는 따옴표'만을 넣고 엔터를 누르면 개행이 되며, 저장되는 것이 아니라 계속해서 입력 가능하다.

```sh
$ git commit -m "Commit Message 1st Line
> Commit Message 2nd Line
> Commit Message 3rd Line
> ...
> Commit Message Last Line"
```

## 4. Commit Message 예시 {#4-commit-message-examples}

```sh
$ git commit -m "fix: Safari에서 모달을 띄웠을 때 스크롤 이슈 수정
>
> 모바일 사파리에서 Carousel 모달을 띄웠을 때,
> 모달 밖의 상하 스크롤이 움직이는 이슈 수정.
>
> Resolves: #1137"
```

![Ailbaba Fusion commit](/apps/blog/public/images/posts/convention-of-git-commit-message/1.webp?raw=true "Ailbaba Fusion commit")
![NHN tui.calendar commit](/apps/blog/public/images/posts/convention-of-git-commit-message/2.webp?raw=true "NHN tui.calendar commit")
