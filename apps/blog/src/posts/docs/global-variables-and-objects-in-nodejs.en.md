---
title: 'Global Variables and Global Objects in Node.js'
description: 'Instead of the browser `window` object, Node.js provides global variables(`__filename`, `__dirname`) and global objects(`global`, `process`, `exports`) to support system information, process control, and modularization.'
created: '2024-04-02'
updated: '2024-04-02'
categories:
  - 'nodejs'
references:
  - 'https://leejabba.gitbooks.io/node-js/content/chapter1.html'
  - 'https://kss7547.tistory.com/40'
  - 'https://blog.naver.com/hj_kim97/222217313571'
---

The top-level object of JavaScript running in a web browser is the `window` object. However, because Node.js does not run in the browser, it does not have a `window` object; instead, it has global variables and global functions.

## 1. Global Variables

Variable | Explanation
--- | ---
`__filename` | Returns the file path of the currently running code.
`__dirname` | Returns the directory path of the currently running code.

## 2. Global Objects

They can be used anywhere in the code. You can use them like `global.console.log()`, and `global` can be omitted.
(JavaScript's built-in objects such as `String`, `Number`, and `Math` are also included.)

### 2-1. `console` Object

An object that displays results in the console window.

Method | Explanation
--- | ---
`console.log()` | Outputs the content inside parentheses.
`console.dir()` | Outputs the properties of the object inside parentheses.

> For more details about `console.log()` and `console.dir()`, see another Markdown document.

### 2-2. `process` Object

An object that represents information related to a process(program).

This object exists only in Node.js and does not exist in JavaScript running in a web browser.

#### 2-2-1. Property

Property | Explanation
--- | ---
`process.arch` | Process architecture.
`process.argv` | Parameters passed when running the process.
`process.env` | Environment variables.
`process.platform` | Platform.
`process.version` | Node.js version.
`process.versions` | Versions of Node.js and dependent programs.

#### 2-2-2. Method

Method | Explanation
--- | ---
`process.exit()` | Ends process execution.
`process.cwd()` | Returns the current working directory.
`process.uptime()` | Returns process uptime.
`process.cpuUsage()` | Returns a cpu usage information object.
`process.memoryUsage()` | Returns a memory usage information object.

### 2-3. `exports` Object

An object used when creating modules.

> For more details about the `exports`(`require`, `import`) object, see another Markdown document.
