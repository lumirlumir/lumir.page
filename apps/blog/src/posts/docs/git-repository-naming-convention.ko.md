---
title: 'Git Repository 이름 규칙'
description: 'Git Repository 이름은 소문자와 대시(`-`)를 사용하여 명확하고 일관성 있게 작성해야 하며, 나중에 비슷한 이름의 Repository를 구분할 수 있도록 구체적으로 작성하는 것이 좋다.'
created: '2024-07-21'
updated: '2024-07-21'
categories:
  - 'convention'
  - 'git'
references:
  - 'https://stackoverflow.com/a/30529354'
  - 'https://siahn95.tistory.com/144'
  - 'https://velog.io/@youvel88/Github-%EB%A0%88%ED%8F%AC%EC%A7%80%ED%86%A0%EB%A6%AC-%EC%9D%B4%EB%A6%84-%EA%B7%9C%EC%B9%99'
---

일관성 및 가독성 있는 Repository 관리를 위해, 자주 사용되는 Git Repository 이름 규칙을 알아보자.

## 1. kebab-case with lower case {#1-lowercase-kebab-case}

Git Repository 이름 규칙과 관련된 Stack Overflow의 답변을 참고하였다. 참고한 내용은 아래와 같다.

### 1-1. First answer {#1-1-first-answer}

> `_` is harder to type than `-`

### 1-2. Second answer {#1-2-second-answer}

> The problem with camel case is that there are often different interpretations of words - for example, checkinService vs checkInService. Going along with Aaron's answer, it is difficult with auto-completion if you have many similarly named repos to have to constantly check if the person who created the repo you care about used a certain breakdown of the upper and lower cases. avoid upper case.
>
> His point about dashes is also well-advised.
>
> 1. use lower case.
> 1. use dashes.
> 1. be specific. you may find you have to differentiate between similar ideas later - ie use purchase-rest-service instead of service or rest-service.
> 1. be consistent. consider usage from the various GIT vendors - how do you want your repositories to be sorted/grouped?

### 1-3. Third answer {#1-3-third-answer}

> `lowercase-with-hyphens` is the style I most often see on Github.*
>
> `lowercase_with_underscores` is probably the second most popular style I see.
>
> The former is my preference because it saves keystrokes.
>
> *Anecdotal; I haven't collected any data.

### 1-4. Summary {#1-4-summary}

정리하면 아래와 같다.

1. 소문자를 사용하라. (Use lower case)
1. 대시(`-`)를 사용하라. (Use dashes)
1. 명확하게 작성하라. (Be specific)
1. 일관성있게 작성하라. (Be consistent)
