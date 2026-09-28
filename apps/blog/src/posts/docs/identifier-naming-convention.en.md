---
title: 'Identifier(Variable) Naming Rules: Camel, Pascal, Snake, Kebab'
description: 'In programming, identifier naming rules include camelCase, PascalCase, snake_case, and kebab-case, and each is used for code readability and consistency.'
created: '2024-07-18'
updated: '2024-07-18'
categories:
  - 'convention'
references:
  - 'https://en.wikipedia.org/wiki/Camel_case'
  - 'https://ccomccomhan.tistory.com/185'
  - 'https://etloveguitar.tistory.com/104'
  - 'https://blog.naver.com/ege1001/220466932974'
  - 'https://namu.wiki/w/%EC%BD%94%EB%94%A9%20%EC%8A%A4%ED%83%80%EC%9D%BC#s-3.2'
---

When developing, you can see that identifier naming rules differ from one programming language to another. Let us look at the Naming Convention used when naming identifiers such as variables, functions, and classes.

## 1. camelCase(lowerCamelCase) {#1-camel-case-lower-camel-case}

After writing the first letter of the first word in lowercase, write the first letter of each following word in uppercase.

Depending on the characteristics of the identifier, camelCase and PascalCase are often mixed appropriately.

### 1-1. Origin {#1-1-camel-case-origin}

It originated from the idea that the shape of the combined words looks similar to a camel's back.

### 1-2. Examples {#1-2-camel-case-examples}

```txt
camelCase
lowerCamelCase
```

### 1-3. Common Usage {#1-3-camel-case-common-usage}

1. JavaScript: variable, function, property, and method names.
1. React: variable, function, property, and method names.
1. Java: variable, function, property, and method names.
1. JSON: key names.

## 2. PascalCase(UpperCamelCase) {#2-pascal-case-upper-camel-case}

Write the first letter of every word in uppercase.

Depending on the characteristics of the identifier, camelCase and PascalCase are often mixed appropriately.

### 2-1. Origin {#2-1-pascal-case-origin}

It originated from the Pascal programming language. This is a programming language developed in the 1970s by Niklaus Wirth. The Pascal language emphasized code readability, and as part of that, using Pascal case for variable and function names was recommended.

### 2-2. Examples {#2-2-pascal-case-examples}

```txt
PascalCase
UpperCamelCase
```

### 2-3. Common Usage {#2-3-pascal-case-common-usage}

1. JavaScript: class names.
1. React: class component and function component names.
1. Java: class and interface names.

## 3. snake_case {#3-snake-case}

Write it by placing an underscore(`_`) between each word.

### 3-1. Origin {#3-1-snake-case-origin}

It originated from the idea that the underscore(`_`) looks like a snake sliding on the ground.

### 3-2. Example {#3-2-snake-case-examples}

```txt
snake_case
```

### 3-3. Common Usage {#3-3-snake-case-common-usage}

1. C, Cpp: variable, function, property, and method names.
1. Python: variable, function, property, and method names.
1. Database: Column names.

### 3-4. Subtypes {#3-4-snake-case-subtypes}

It can be divided into more detailed types: Train_Case, spinal_case, and SCREAMING_SNAKE_CASE(MACRO_CASE).

#### 3-4-1. Train_Case {#3-4-1-train-case}

In snake_case, writing the first letter of each word in uppercase.

- Example

  ```txt
  Train_Case
  ```

#### 3-4-2. spinal_case {#3-4-2-spinal-case}

In snake_case, writing the first letter of each word in lowercase.

- Example

  ```txt
  spinal_case
  ```

#### 3-4-3. SCREAMING_SNAKE_CASE(MACRO_CASE) {#3-4-3-screaming-snake-case-macro-case}

In snake_case, writing every character in uppercase.

It is mainly used for constants, environment variable definitions, and so on. This is a characteristic that Korean does not have; in English, writing an entire sentence in uppercase creates a very strong emphasis and gives the feeling that the speaker is shouting. Therefore, it is also used when there is a warning meaning or when caution is required during use.

- Example

  ```txt
  SCREAMING_SNAKE_CASE
  MACRO_CASE
  ```

## 4. kebab-case

Write it by placing a dash(`-`) between each word.

### 4-1. Origin {#4-1-kebab-case-origin}

It originated from the idea that the words look as if they are skewered on a kebab skewer.

### 4-2. Example {#4-2-kebab-case-examples}

```txt
kebab-case
```

### 4-3. Common Usage {#4-3-kebab-case-common-usage}

1. HTML: Used for [Attribute](https://developer.mozilla.org/ko/docs/Web/HTML/Attributes) names.
1. CSS: Used for [Property](https://developer.mozilla.org/ko/docs/Web/CSS/Reference) names.
1. URI Parameter.
