---
title: 'Differences between `console.log()` and `console.dir()`'
description: '`console.log()` is a function that mainly prints information to the console for debugging and outputs HTML elements as a tree structure, while `console.dir()` displays object properties and tree structures in detail and provides an object representation similar to JSON.'
created: '2024-04-02'
updated: '2024-05-26'
categories:
  - 'javascript'
references:
  - 'https://my-t-space.tistory.com/119'
  - 'https://velog.io/@jeongda/console.log-%EC%99%80-console.dir-%EC%9D%98-%EC%B0%A8%EC%9D%B4'
  - 'https://velog.io/@irish/JS-console.log-and-console.dir'
---

## 1. `console.log()`

### 1-1. Definition

`console.log()` is a function used for console output in ***JavaScript***.

### 1-2. Purpose

You can use `console.log()` to print information to the console that helps with debugging and logging. It is mainly used for the following purposes.

- Debugging: Used to check variable values or trace where code is executed.
- Logging: Used to track which function was executed, what data was returned, and so on.
- Troubleshooting: Used to find unexpected results during code execution or trace and fix errors.

### 1-3. Output

`console.log()` outputs elements in a tree structure like ***HTML*** and provides special handling for ***DOM*** elements.

### 1-4. Format Specifiers

In `console.log()`, you can output strings using format specifiers.

Format Specifier | Description | Example
--- | --- | ---
`%d` | Number | `console.log('Number: %d', 273);`
`%s` | String | `console.log('String: %s', 'hi~');`
`%j` | JSON | `console.log('Json: %j', {name:'jay'});`

## 2. `console.dir()`

### 2-1. Definition

`console.dir()` is used to print an object's properties to the console. This is useful for listing objects or displaying an object's tree structure.

### 2-2. Purpose

Unlike `console.log()`, it is used to check all properties of an object. It is mainly used for the following purposes.

- Display object properties: You can check the structure of an object's properties and property values.
- Display tree structure: You can show an object's hierarchy to understand complex objects more clearly.
- Display details of object representation in the console: Unlike `console.log()`, it can display objects in more detail, allowing you to obtain more information.

### 2-3. Output

`console.dir()` outputs elements in a tree structure like ***JSON*** and is useful when you want to see the full representation of a ***DOM*** ***JS*** object. In other words, use `console.dir()` when you want to see an object's data.

## 3. Summary

<u> | Structure | Object | Function
--- | --- | --- | ---
`console.log()` | Tree structure output in a form like ***HTML*** | Tag content output | Code output
`console.dir()` | Tree structure output in a form like ***JSON*** | Tag attribute output | Property output

It is convenient to use `console.dir()` for objects and properties, and `console.log()` for the rest.

## 4. Examples

### 4-1. `document` Output

- `console.log()`: Outputs a tree structure in ***HTML*** form.

  ![console.log()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/1.webp?raw=true)

- `console.dir()`: Outputs a tree structure in ***JSON*** form.

  ![console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/2.webp?raw=true)

### 4-2. `document.body` Output

- `console.log()`: Outputs the elements of the corresponding `<body>`.

  ![console.log()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/3.webp?raw=true)

- `console.dir()`: Outputs the entire element.

  ![console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/4.webp?raw=true)

### 4-3. Function `a()` Output

- Functions(objects) are output in the same way.
- If you use `console.log(a());` and `console.dir(a());`, the `()` causes the function to execute, so both output `true`.

  ![console.log() vs console.dir()](/apps/blog/public/images/posts/difference-between-console-log-and-console-dir/5.webp?raw=true)
