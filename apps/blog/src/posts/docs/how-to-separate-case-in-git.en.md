---
title: 'How to Distinguish File or Directory Case in Git'
description: 'Git does not distinguish case by default, so case-only changes are not tracked correctly; to reflect them properly, use the `git mv` command through a temporary name.'
created: '2024-08-09'
updated: '2024-08-09'
categories:
  - 'git'
references:
  - 'https://kangdanne.tistory.com/148'
  - 'https://progyu.github.io/2019/11/02/191102-TIL-git-%ED%8F%B4%EB%8D%94%EB%AA%85-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0/'
  - 'https://papababo.tistory.com/entry/git-%EC%9D%80-%ED%8F%B4%EB%8D%94%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9D%98-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90%EB%A5%BC-%EA%B0%9C%EB%AC%B4%EC%8B%9C%ED%95%9C%EB%8B%A4-%EA%B7%B8%EB%9F%BC-%EC%9A%B0%EC%A7%B8'
---

There are cases where a 'file or directory whose only change is case' is not tracked correctly, such as changing the file `myComponent.jsx` to `MyComponent.jsx` or changing the directory `Src` to `src`.

Because Git does not distinguish case by default, even if you change a file or directory name using the rename feature provided by the operating system, it is not reflected in Git.

The solutions to the problem above are as follows.

## 1. Method 1

```sh
# Case sensitive O
git config core.ignorecase false

# Case sensitive X
git config core.ignorecase true
```

If you command Git to distinguish uppercase and lowercase through `git config core.ignorecase false`, the changed file name is tracked correctly. However, because of the disadvantages below, it is recommended to use [Method 2](#2-method-2).

### 1-1. Disadvantage 1

Even if you distinguish uppercase and lowercase through the method above and `push` the content, if a team member's Git cannot distinguish uppercase and lowercase, it will not be `pull`ed for them. In the end, an error that no longer occurs for me still remains for the team member.

Therefore, this option should not be used carelessly during team work, and if unavoidable, the setting must be shared with team members.

### 1-2. Disadvantage 2

Even if you rename the directory `Src` to `src` through the method above and `push` it to Git, the `Src` directory is still not deleted and remains, while the `src` directory is newly added. In other words, a situation occurs where both the `Src` and `src` directories exist.

## 2. Method 2

```sh
git mv oldName newName
```

Use the command above when you want to change a file or directory name and apply it to Git. Enter the existing file or directory name first, and the new name after it.

However, if you only changed uppercase and lowercase without changing the entire name, you must rename it through the following two steps to avoid errors. In other words, do not try to rename directly from `oldName` to `newName`; change it through a temporary folder name(`temp`).

```sh
git mv oldName temp
git mv temp newName
```
