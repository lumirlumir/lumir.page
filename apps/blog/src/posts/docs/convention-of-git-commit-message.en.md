---
title: 'Git Commit Message Rules'
description: 'A Commit Message is written in imperative form and consists of Header, Body, and Footer. The title is written within 50 characters, starts with a capital letter, and has no period; detailed explanations are added in the Body, and issue-related information is written in the Footer.'
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

For communication with team members and convenient tracking of past records, it is important to write Commit Messages that follow rules.

## 1. Seven Rules for Commit Messages

1. Separate the `Title` and `Body` with a <u>blank line</u>.
1. Limit the `Title` to <u>50 characters</u> in English.
1. Write the <u>first letter of the `Title` in uppercase</u>.
1. <u>Do not put a period at the end of the `Title`.</u>
1. Use the `Title` as an <u>imperative sentence</u> and <u>do not use past tense.</u>
1. Limit <u>each line of the `Body` to 72 English characters</u>.
1. Explain <u>what and why</u> rather than how.

## 2. Commit Message Structure

```sh
# Separate Header, Body, and Footer with blank lines.

Type(Scope): Title # Header

Body # Body

Footer # Footer
```

### 2-1. `Header`

- `Header` is required.
- `Type` indicates the nature of the Commit and must be one of the following.

  `Type` | Description
  :---: | ---
  build | Modify build-related files. Install or remove modules.
  chore | Various small changes such as package managers and `.gitignore`.
  ci | Modify CI-related configuration files.
  design | Change user UI design(CSS and so on).
  docs | Modify documentation.
  feat | New feature.
  fix | Bug fix.
  perf | Performance improvement.
  refactor | Code refactoring.
  remove | Only delete files.
  rename | Only modify file or folder names.
  style | Code style(formatting) changes without functional changes.
  test | Add and modify test code.

- `Scope` can be omitted.
- Enter the title or topic in `Title`.

### 2-2. `Body`

The `Body` is the main text and contains detailed content that cannot be expressed in the `Header`.

It can be omitted if the `Header` can express enough.

### 2-3. `Footer`

```txt
Resolves(Closes, Fixes): #IssueNo, ... (resolved issue, optional)

See also(Ref, Related to): #IssueNo, ... (referenced issue, optional)
```

The `Footer` is a footer and can be omitted.

It is used to add reference information, such as which ***Issues*** it came from. For example, to reference a specific ***Issues*** item, write something like `Resolves: #1137`.

## 3. Entering a Commit Message on Multiple Lines

Use the `-m` option. This lets you write a Commit Message directly in inline form in the command window without having to write a separate message in ***vim***.

### 3-1. One Line

```sh
$ git commit -m "Commit Message"
```

### 3-2. Multiple Lines

Do not put the closing quote on the first line of the Commit Message; use it on the last line. In other words, if you put only the opening quote on the first line and press Enter, a line break is made, and the message is not saved but can continue to be entered.

```sh
$ git commit -m "Commit Message 1st Line
> Commit Message 2nd Line
> Commit Message 3rd Line
> ...
> Commit Message Last Line"
```

## 4. Commit Message Examples

```sh
$ git commit -m "fix: fix scroll issue when opening modal in Safari
>
> Fix an issue where vertical scrolling outside the modal moves
> when opening the Carousel modal in mobile Safari.
>
> Resolves: #1137"
```

![Ailbaba Fusion commit](/apps/blog/public/images/posts/convention-of-git-commit-message/1.webp?raw=true "Ailbaba Fusion commit")
![NHN tui.calendar commit](/apps/blog/public/images/posts/convention-of-git-commit-message/2.webp?raw=true "NHN tui.calendar commit")
