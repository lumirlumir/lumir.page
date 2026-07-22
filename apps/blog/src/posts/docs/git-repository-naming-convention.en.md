---
title: 'Git Repository Naming Rules'
description: 'Git Repository names should be written clearly and consistently using lowercase letters and dashes(`-`), and it is good to make them specific so that Repositories with similar names can be distinguished later.'
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

For consistent and readable Repository management, let us look at commonly used Git Repository naming rules.

## 1. kebab-case with lower case

I referred to a Stack Overflow answer related to Git Repository naming rules. The referenced content is as follows.

### 1-1. First answer

> `_` is harder to type than `-`

### 1-2. Second answer

> The problem with camel case is that there are often different interpretations of words - for example, checkinService vs checkInService. Going along with Aaron's answer, it is difficult with auto-completion if you have many similarly named repos to have to constantly check if the person who created the repo you care about used a certain breakdown of the upper and lower cases. avoid upper case.
>
> His point about dashes is also well-advised.
>
> 1. use lower case.
> 1. use dashes.
> 1. be specific. you may find you have to differentiate between similar ideas later - ie use purchase-rest-service instead of service or rest-service.
> 1. be consistent. consider usage from the various GIT vendors - how do you want your repositories to be sorted/grouped?

### 1-3. Third answer

> `lowercase-with-hyphens` is the style I most often see on Github.*
>
> `lowercase_with_underscores` is probably the second most popular style I see.
>
> The former is my preference because it saves keystrokes.
>
> *Anecdotal; I haven't collected any data.

### 1-4. Summary

In summary, it is as follows.

1. Use lowercase. (Use lower case)
1. Use dashes(`-`). (Use dashes)
1. Write clearly. (Be specific)
1. Write consistently. (Be consistent)
