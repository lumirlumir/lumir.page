---
title: 'React: `react`, `react-dom`'
description: '`react` is the core library for creating UI components, and `react-dom` renders them to the DOM of a web browser; the two libraries are used together.'
created: '2024-04-05'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://react.dev/'
  - 'https://medium.com/programming-sage/react-vs-react-dom-a0ed3aea9745'
---

Let us look at `react` and `react-dom`, which are essential parts of React development.

## 1. Installing `react`, `react-dom`

Install `react` and `react-dom` as `dependencies`.

```sh
$ npm install react react-dom
```

## 2. `react`

This is React's core library for creating user interfaces. It provides the APIs needed to create Components and define React elements, and it handles state management, lifecycle management, props, state, context management, basic Hook management, and more.

It is not a library for the web or browsers; it only identifies changes and passes a snapshot of those changes to `react-dom`.

## 3. `react-dom`

This is the library for using `react` with the DOM. As a web interface, it is directly related to the web and is responsible for loading actual HTML elements onto the screen. It handles DOM-related features and renders components to the browser's DOM.

`react-dom` compares the change snapshot received from `react` with the actual browser DOM, checks the differences, and then manipulates the actual browser DOM. In other words, it compares the previous state and current state of a React component, then updates it when there is a difference.

Because `react-dom` is the tool that binds the ideas of `react` to the web browser, `react` itself is actually unrelated to the web or the browser. This is also why `react-native`, `react-three`, and similar tools can be developed and used by taking the core ideas of `react`.

## 4. Summary

![react react-dom](/apps/blog/public/images/posts/npm-package-react/1.webp?raw=true)
