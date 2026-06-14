---
title: 'What Are `nvm` and `.nvmrc`?'
description: '`nvm` is a Node.js version management tool, and it uses a `.nvmrc` file to record the Node.js version required by a project and help install or switch versions easily.'
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

Let us look at `nvm` and `.nvmrc`, which are used for smooth collaboration during Node.js work.

## 1. What Is `nvm`?

`nvm` is the Version Manager for Node.js, and its [Github Repository](https://github.com/nvm-sh/nvm) contains the following introduction.

"nvm allows you to quickly install and use different versions of node via the command line."

In other words, the role of `nvm` is that it "lets you quickly install and use different versions of Node through the CLI."

## 2. What Is `.nvmrc`?

`.nvmrc` is a file where you can record the Node.js version needed to run a project. When running a Node.js project made by someone else, you have probably experienced at least once that version problems prevented the project from running or prevented some libraries from being used. Rather than writing the version in the `README.md` file, it is much more useful to let collaborators sync versions with a single command.

### 2-1. How to Write

1. Create a `.nvmrc` file at the top level of the project.
1. Write the version in that `.nvmrc` file.

```txt
24.15.0
```

Or write it with `v` at the front.

```txt
v24.15.0
```

### 2-2. How to Use

This is mainly a method that can be used when you have Cloned a project.

#### 2-2-1. When the Version Is Not Installed

Entering the command below reads `.nvmrc` and installs the version written there.

```sh
nvm install
```

#### 2-2-2. Switch to That Version

Entering the command below reads `.nvmrc` and switches to that version.

```sh
nvm use
```
