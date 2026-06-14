---
title: 'Differences between ***VScode*** and ***Visual Studio***'
description: '***VScode*** is a lightweight code editor with extensibility, while ***Visual Studio*** is a full-featured integrated development environment (IDE) that is heavy and slower but optimized for ***.NET*** and ***C*** family language development, so the choice depends on the purpose of use.'
created: '2024-05-26'
updated: '2024-05-26'
categories:
  - 'vscode'
references: []
---

Let us look at the differences between ***VScode***(Visual Studio Code) and ***Visual Studio***.

## 1. ***VScode***

***VScode*** is a <u>free</u> code editor. It is much faster and lighter than ***Visual Studio***. By default, if no ***Extension*** is installed, it provides only simple features similar to Notepad. Instead, you can install the features you need as extensions, which allows it to get close to the level of an ***IDE***.

***VScode*** is built using ***Electron Shell***, ***Node.js***, ***TypeScript***, and so on. It runs on desktop computers and is available on ***Windows***, ***Mac OS***, and ***Linux***. Support for ***Node.js***, ***JavaScript***, ***TypeScript***, and similar technologies is built in, and there is a rich ecosystem of language extensions for runtimes such as ***.NET*** and ***Unity*** and languages such as ***C++***, ***C#***, ***Java***, ***Python***, ***PHP***, and ***Go***.

***VScode*** has many features that are configured differently depending on the programming language and extensions. These include syntax highlighting, bracket matching, Intellisense for variables and methods (code syntax autocompletion), debugging, linting, multi-cursor editing, parameter hints, code navigation, refactoring, and ***Git*** support. Many of these were taken from ***Visual Studio*** and modified.

### 1-1. Advantages

- It is fast and lightweight.
- It has good extensibility.

### 1-2. Disadvantages

- Because it is highly extensible, individual configuration can be difficult.
- Additional development environments must be configured.

## 2. ***Visual Studio***

It is a full-featured integrated development environment (***IDE***, Integrated Development Environment). It is available on ***Windows*** and ***Mac OS***. It supports software development, analysis, debugging, testing, collaboration, deployment, and more. You can develop for ***Web***, ***Mobile***, and ***Desktop*** with ***.NET***, and support for ***Unity***, ***Azure***, and ***Docker*** is included by default.

It is optimized for ***.NET*** and ***C*** family language development and has many convenient parts, but because it is an ***IDE***, the program itself is heavy. The larger the project, the much longer its loading time is compared with ***VScode***.

### 2-1. Advantages

- It is a finished product. (There is no need to configure an additional development environment.)
- It is optimized for ***.NET*** and ***C*** family language development.

### 2-2. Disadvantages

- It is slow and heavy.

## 3. ***VScode*** vs ***Visual Studio***

Then which should you use between ***VScode*** and ***Visual Studio***?

You might think deciding whether to use ***VScode*** or ***Visual studio*** for a specific software development task is as simple as choosing between an ***Editor*** and an ***IDE***, but the reality is not so simple. This is because ***VScode*** can be configured to be very close to an ***IDE*** that can be used with many programming languages.

Therefore, I recommend using the ***IDE/Editor*** that is most commonly used in your own development environment. This is because preferred ***IDE/Editor*** choices differ by country (Korea, the United States, and so on), role (Web, Mobile, AI, Game, and so on), and language (C++, Java, JavaScript, and so on). Also, rankings change every year, and better ***IDE/Editor*** tools may appear, so search Google for the most popular ***IDE/Editor*** of the current or previous year and use it. (However, as of 2024, ***VScode*** holds the top market share in almost every country, role, and language.)
