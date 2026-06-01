---
title: 'Git에서 파일 혹은 디렉토리의 대ㆍ소문자를 구분하는 방법'
description: 'Git은 대소문자 구분을 기본적으로 하지 않아 대소문자 변경 시 정상 추적되지 않으며, `git mv` 명령어를 사용해 임시 이름을 거쳐 변경해야 올바르게 반영된다.'
created: '2024-08-09'
updated: '2024-08-09'
categories:
  - 'git'
references:
  - 'https://kangdanne.tistory.com/148'
  - 'https://progyu.github.io/2019/11/02/191102-TIL-git-%ED%8F%B4%EB%8D%94%EB%AA%85-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0/'
  - 'https://papababo.tistory.com/entry/git-%EC%9D%80-%ED%8F%B4%EB%8D%94%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9D%98-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90%EB%A5%BC-%EA%B0%9C%EB%AC%B4%EC%8B%9C%ED%95%9C%EB%8B%A4-%EA%B7%B8%EB%9F%BC-%EC%9A%B0%EC%A7%B8'
---

파일 `myComponent.jsx`를 `MyComponent.jsx`로 변경하는 경우, 디렉토리 `Src`를 `src`로 변경하는 경우 등, '대ㆍ소문자만 변경된 파일 혹은 디렉토리'가 정상 추적되지 않는 경우가 존재한다.

Git은 기본적으로 대ㆍ소문자를 구분하지 않기에, 운영체제에서 제공하는 이름 바꾸기 기능을 통해 파일 혹은 디렉토리명을 바꾸어도 Git에는 적용되지 않는 것이다.

위 문제의 해결 방안은 아래와 같다.

## 1. 방법 1 {#1-method-one}

```sh
# 대소문자 구분 O
git config core.ignorecase false

# 대소문자 구분 X
git config core.ignorecase true
```

`git config core.ignorecase false` 명령어를 통해 Git에 대ㆍ소문자를 구분하도록 명령하면, 변경된 파일명이 정상 추적된다. 하지만, 아래와 같은 단점들로 인해 [방법 2](#2-method-two)를 이용할 것을 권장한다.

### 1-1. 단점 1 {#1-1-method-one-disadvantage-one}

위 방식을 통해 대ㆍ소문자를 구분하게 되어 해당 내용을 `push` 하더라도, 팀원의 Git이 대ㆍ소문자를 구분하지 못한다면 그들에게는 `pull`되지 않는다. 결국, 나에게 더이상 발생하지 않는 오류가 팀원에게는 여전히 남아있는 것이다.

따라서, 해당 옵션은 팀 작업시 함부로 사용해서는 안되며, 불가피할 경우 팀원에게 설정을 공유해야한다.

### 1-2. 단점 2 {#1-2-method-one-disadvantage-two}

위 방식을 통해 디렉토리 `Src`를 `src`로 이름 변경한 후 Git에 `push`하더라도, 여전히 `Src` 디렉토리는 삭제되지 않고 남아있는 채로 `src` 디렉토리가 새로 추가된다. 즉, `Src`와 `src` 디렉토리가 모두 존재하는 상황이 발생하는 것이다.

## 2. 방법 2 {#2-method-two}

```sh
git mv oldName newName
```

파일 혹은 디렉토리명을 변경하여 Git에 적용하고 싶을 때, 위 명령어를 이용한다. 기존 파일 혹은 디렉토리명을 앞에 입력하고, 뒤에 새 이름을 입력한다.

단, 이름 전체를 변경하지 않고 대ㆍ소문자만 변경하였을 경우에는, 아래와 같은 두 단계를 거쳐 이름을 바꿔야만 오류가 발생하지 않는다. 즉, `oldName`에서 `newName`으로 직접 이름 변경을 시도하지 말고, 임시 폴더 이름(`temp`)을 거쳐 변경해야 한다.

```sh
git mv oldName temp
git mv temp newName
```
