---
title: 'Differences between Frameworks and Libraries'
description: 'A framework manages the overall application flow according to the concept of inversion of control, while a library is a set of code that users call and use as needed; the two differ in where control authority is located and how code is structured.'
created: '2024-05-06'
updated: '2024-05-08'
categories:
  - 'cs'
references:
  - 'https://webclub.tistory.com/458'
  - 'https://sharonprogress.tistory.com/169'
  - 'https://cocoon1787.tistory.com/745'
  - 'https://canoe726.tistory.com/23'
  - 'https://www.miraeweb.com/single-post/%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC%EC%99%80-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8B%A4%EB%A5%B8%EA%B0%80'
---

What is the difference between a Framework and a Library? Many people confuse the two, and some even use them with the same meaning. Both share the common point of being prebuilt reusable sets of code, but there is a clear difference between them. A framework is not merely a prebuilt semi-finished product or a set of extensible abstract libraries. To understand what a framework is, you need to know how it differs from a library. First, let us look at the concepts of frameworks and libraries.

## 1. Framework

As the name suggests, a framework means a frame, skeleton, or infrastructure. It is a representative technology that applies the concept of ***Inversion of Control(IoC)***, and can be described as 'a set of classes and interfaces that cooperate with each other to solve a specific software problem.' This is one way to solve the lack of integration and consistency that occurs during object-oriented development.

A framework includes features essential for application development, such as code, algorithms, and DB integration, and it also manages common parts such as app/server operation, memory management, and event loops. Because a framework is not a finished product, users write code directly according to the framework's way and implement functions, classes, methods, and so on.

In other words, framework code does not include completed features. A framework is the skeleton of a program that provides a blueprint for an application, not a finished product. It provides the basic foundation of an application and tells developers where to modify and use it. This is a structure in which the framework itself defines the software development flow, tells developers what is needed, and calls and uses developers' code when necessary.

### 1-1. Characteristics

- It consists of several classes or components that provide abstractions of specific concepts.
- Components are reusable.
- Patterns can be operationalized at a high level.

### 1-2. Advantages

- Increased development convenience.
- Reduced development time.
- Increased code reusability.
- Provides guides, tools, and plugins.
- Simplifies DB connections.
- Improves security.
- Easy maintenance.
- Easy debugging and application monitoring.
- Standardized, so quality above a certain level can be expected.

### 1-3. Disadvantages

- If dependency becomes high, direct development becomes difficult and development ability may decline somewhat.
- It takes a long time to learn.

### 1-4. Examples

- ***Java***-based server development: ***Spring***
- ***Python***-based server development: ***Django***, ***Flask***
- ***JavaScript***(***Node.js***)-based server development: ***Express.js***
- ***Ruby***-based web development: ***Ruby on Rails***
- Web frontend development: ***Angular.js***, ***Vue.js***
- Android app development: ***Flutter***

## 2. Library

A library is a group of prewritten code composed of functions, methods, classes, and so on. It helps developers finish development faster because they do not need to rewrite code to implement specific features. Most programming languages include basic libraries, and developers can also add their own libraries.

### 2-1. Examples

- ***Python***: ***Tensorflow***, ***Pandas***, ***Beautifulsoup***, modules installed with ***pip***
- ***JavaScript***(***Node.js***): ***jQuery***, ***React***, ***Redux***, ***Three.js***, modules installed with ***npm***
- ***C++***: Standard Template Library(***STL***)

### 2-2. Is ***React.js*** Not a Framework?

![React JavaScript library for building user interfaces](/apps/blog/public/images/posts/difference-between-framework-and-library/1.webp?raw=true)

***React*** is a frontend library, not a framework. However, many developers mention and compare it as if it were a framework. One important characteristic of a framework is 'inversion of control.'

Let us look at the Life Cycle of a ***React*** Class component. If the Life Cycle of the Render process is used as an example, the order is as follows.

1. `componentWillMount()`
1. `render()`
1. `componentDidMount()`

As shown above, ***React*** has a basic frame for program flow, but you do not necessarily need to follow it. When the app runs, writing the `render()` function is required. However, explicitly writing the automatically generated `componentDidMount()` function is not required. When a developer wants to call an API or perform another task, they can define additional program behavior through the `componentDidMount()` function. In other words, because it is possible to change the program flow by adding or not adding work to the program flow, ***React*** is a library.

Also, because ***React*** is a library, it can be easily attached to and used with other frameworks.

### 2-3. Then What about ***Express.js***?

![Express Fast, unopinionated, minimalist web framework for Node.js](/apps/blog/public/images/posts/difference-between-framework-and-library/2.webp?raw=true)

As stated on the homepage, ***Express.js*** is a web framework. By using the advantages of ***Node.js***'s solid asynchronous communication support, it is lightweight and fast, and you can write easily applicable web apps and REST APIs.

## 3. Differences between Frameworks and Libraries

### 3-1. Differences

What is the difference between a library and a framework? It is in the concept of 'inversion of control.' In other words, it is about who holds the Flow of the application.

The concept of 'inversion of control' must be applied to a framework. The framework itself controls the overall flow, and the user writes the necessary code inside it. The application code written by the user is used by the framework. It is not something imported and used like a library, but something that enters into the framework. Also, unlike a library, a framework has rules for programming. For example, it has rules for tag settings in configuration files or DB integration methods, and developers must follow them.

On the other hand, with a library, the user creates the overall flow and imports the library wherever needed. The initiative lies entirely with the side that imports, uses, and calls the library.

> <u>***From Toby's Spring***</u>
>
> The difference between a framework and a library is where the authority over "control flow" exists.
>
> When using a library, the user must directly control the flow of application code. If a needed feature exists during development, the user must actively call and use the library or bring in existing functions or code.
>
> On the other hand, in a framework, application code is used by the framework. Because application code operates passively within the frame created by the framework, the framework has the flow of control and the user writes the necessary code inside it.
>
> Here, inversion of control(IoC, Inversion of Control) means delegating control authority to a Framework made to perform a certain task; simply put, it means that the program's control flow structure has been reversed. (Through this, productivity can be improved.)
>
> In the case of a library, the user must directly control the flow of the application, but in the case of a framework, it provides positions where code can be connected and has control-flow authority to call the code connected by the user when needed.

### 3-2. Summary

![alt text](/apps/blog/public/images/posts/difference-between-framework-and-library/3.webp?raw=true)

Library | Framework
:--- | :---
A set of auxiliary modules, objects, classes, and functions. | Various APIs, compilers, and application support. Includes all libraries.
When calling library methods, we have control. | Inversion of control. Inside the framework, the framework calls us.
Can be easily replaced with another library. | Changing a framework is not easy.
It is possible to simply connect a library to implement a specific feature in an existing program. | Applying a new framework to an existing program requires considerable effort.
Library creation requires relatively little code, and it guarantees good performance and fast loading time. | Framework creation requires relatively much code, and performance and loading time suffer a little.
