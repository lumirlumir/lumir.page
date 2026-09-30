---
title: 'How to Handle Spaces in HTML: `&nbsp;`, `&ensp;`, `&emsp;`'
description: '`&nbsp;`, `&ensp;`, and `&emsp;` create spaces with widths of about 1, 2, and 3 spaces respectively.'
created: '2024-07-16'
updated: '2024-07-16'
categories:
  - 'html'
references:
  - 'https://developer.mozilla.org/ko/docs/Glossary/Entity'
  - 'https://grandj.tistory.com/143'
  - 'https://ziszini.tistory.com/34'
---

In HTML, consecutive spaces are treated as a single space, so consecutive spaces can be handled using space special characters, or more precisely [HTML entities](https://developer.mozilla.org/ko/docs/Glossary/Entity).

## 1. `&nbsp;` {#1-non-breaking-space-entity}

### 1-1. Meaning {#1-1-non-breaking-space-meaning}

- It stands for Non-Breaking Space.
- It means a space that does not allow line breaks. It is used when text should remain on the same line without wrapping.

### 1-2. Output {#1-2-non-breaking-space-output}

- As a small spacing, it inserts one space.

### 1-3. Example {#1-3-non-breaking-space-example}

- Input

  ```html
  left|&nbsp;|right
  ```

- Output

  left|&nbsp;|right

## 2. `&ensp;` {#2-en-space-entity}

### 2-1. Meaning {#2-1-en-space-meaning}

- It stands for En Space.
- It means a space that usually corresponds to the width of the English letter 'N'. This is usually half the width of a character in the current font.

### 2-2. Output {#2-2-en-space-output}

- As a normal spacing, it inserts a space width of about two spaces. (However, it is not recognized as two space characters, but as one space character.)

### 2-3. Example {#2-3-en-space-example}

- Input

  ```html
  left|&ensp;|right
  ```

- Output

  left|&ensp;|right

## 3. `&emsp;` {#3-em-space-entity}

### 3-1. Meaning {#3-1-em-space-meaning}

- It stands for Em Space.
- It means a space that usually corresponds to the width of the English letter 'M'. This is usually the same size as the character width of the current font.

### 3-2. Output {#3-2-em-space-output}

- As a large spacing, it inserts a space width of about three spaces. (However, it is not recognized as three space characters, but as one space character.)

### 3-3. Example {#3-3-em-space-example}

- Input

  ```html
  left|&emsp;|right
  ```

- Output

  left|&emsp;|right

## 4. Output Result Comparison {#4-output-result-comparison}

- Input

  ```html
  left|&nbsp;|right

  left|&ensp;|right

  left|&emsp;|right
  ```

- Output

  left|&nbsp;|right

  left|&ensp;|right

  left|&emsp;|right
