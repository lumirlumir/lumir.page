---
title: 'Composition of ***JavaScript***'
description: 'JavaScript in a web browser is centered on the `window` object and consists of three sub-elements: ECMAScript(core), DOM, and BOM, each of which controls web page content and browser features.'
created: '2024-05-08'
updated: '2024-06-12'
categories:
  - 'javascript'
references:
  - 'https://developer.mozilla.org/ko/'
  - 'https://boycoding.tistory.com/2'
  - 'https://velog.io/@imok-_/JavaScript-DOM-BOM-%EC%9D%B4%EB%9E%80'
  - 'https://idlecomputer.tistory.com/40'
  - 'https://postlude.github.io/2020/02/16/javascript-object/'
  - 'https://bigtop.tistory.com/48'
  - 'https://cbw1030.tistory.com/46'
---

In a web browser(client) environment, ***JavaScript*** consists of the top-level object called `window`***<sup>1</sup>*** and three lower-level object elements: ***core(JavaScript, ECMAScript)<sup>2</sup>***, ***Document Object Model(DOM)<sup>3</sup>***, and ***Browser Object Model<sup>4</sup>***.

> <u>***Host Environment***</u>
>
> The platform where ***JavaScript*** runs is called a host. A host can be a web browser, a web server, or even a coffee machine. Each platform provides features specific to that platform, and the ***JavaScript*** specification calls this the Host Environment.
>
> In addition to the core(***ECMAScript***), the host environment provides objects and functions specific to the platform. A web browser provides means for controlling web pages, and ***Node.js*** provides server-side features.
>
> Therefore, the core always exists in common, but depending on the host, the ***DOM*** and ***BOM*** may not exist.

The figure below gives a broad overview of the features available when the host environment is a web browser(client).

![window, JavaScript, DOM, BOM](/apps/blog/public/images/posts/composition-of-javascript/1.webp?raw=true)

## 1. `window` Object

It is the <u>top-level(root) object</u> of ***JavaScript*** and the <u>***Global***</u> object to which every object belongs. It is called the global object because it can be accessed from anywhere, and it consists of many objectified components.

![window object](/apps/blog/public/images/posts/composition-of-javascript/2.webp?raw=true)

### 1-1. Role

The `window` object has two roles.

1. It is the global object of ***JavaScript***.
1. It represents the browser window and provides ***Property*** and ***Method*** values that can control it.

    ```js
    console.log(window.innerWidth); // window width
    console.log(window.innerHeight); // window height
    window.close(); // opens the window
    window.open(); // closes the window
    ```

### 1-2. Characteristics

The ***Property*** or ***Method*** of the `window` object can be used directly while omitting `window`.

ex. `alert('My Message')`

Creating an object is ultimately the same as creating a ***Property*** of the `window` object. Global variables and functions are actually ***Property*** and ***Method*** values of the `window` object. Therefore, the ways to access `a` are as follows.

```js
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
```

```js
var a = {id: 1};
console.log(a.id); // 1
console.log(window.a.id); // 1
```

## 2. Core(***JavaScript***, ***ECMAScript***)

> Core features of ***JavaScript***

This is the low-level part of the language, such as syntax, types, declarations, keywords, reserved words, operators, and objects.

***ECMAScript*** is not dependent on web browsers, and a web browser is only a 'host environment' that implements ***ECMAScript***.

Such 'host environments(browsers, ***Node.js***, ***Adobe Flash***, and so on)' basically implement ***ECMAScript*** and provide extensions such as the ***DOM*** and ***BOM***.

## 3. Document Object Model(***DOM***)

> ***Method*** and ***Interface*** values that manipulate web page content

It is structured so that the browser can understand web documents, and it is an Application Programming Interface(***API***) extended so that ***XML*** can be used in ***HTML***.

As the bridge between ***HTML*** and ***JavaScript***, it accesses each element using ***JavaScript*** and dynamically controls ***HTML*** tags.

The `document` object serves as the basic 'entry point' of the page.

While the browser loads an ***HTML*** page, it represents all content in the web page, such as ***Tag*** values, as objects.

The ***DOM*** transforms the entire page into objects in a node hierarchy(Node Tree) structure, and represents each part of the ***HTML*** page as various types of nodes that contain different data.

![Document Object](/apps/blog/public/images/posts/composition-of-javascript/3.webp?raw=true)

### 3-1. Structure of the ***DOM*** (The ***HTML*** ***DOM*** tree of objects)

![The HTML DOM tree of objects](/apps/blog/public/images/posts/composition-of-javascript/4.webp?raw=true)

Node Type | Role
:--- | :---
Document Node | The entire <u>***HTML*** document</u> at the top of the tree
Element Node | <u>***Tag*** values</u> such as `<p>` and `<div>`
Attribute Node | <u>***Attribute*** values</u> such as `name` and `value` inside tags like `<input>`
Text Node | <u>***Text***</u> in an ***HTML*** document
Comment Node | <u>***Comment***</u> in an ***HTML*** document

## 4. Browser Object Model(***BOM***)

> ***Method*** and ***Interface*** values that interact with the browser

It represents additional objects provided by the browser(host environment) to control everything other than `document`. It means every object element included in the web browser window except web page content.

Using the ***BOM***, you can access and manipulate the browser window.

### 4-1. `navigator`

The `navigator` object provides information about the browser and operating system. The object has various ***Property*** values, and the best-known ***Property*** values are `navigator.userAgent`, which provides information about the browser currently in use, and `navigator.platform`, which provides information about the operating system(***Windows***, ***Linux***, ***Mac***, and so on) on which the browser is running. This is mainly used to resolve compatibility issues.

![navigator object](/apps/blog/public/images/posts/composition-of-javascript/5.webp?raw=true)

### 4-2. `screen`

The `screen` object provides information about the screen. It includes width(`width`), height(`height`), pixels(`pixelDepth`), color(`colorDepth`), screen orientation(`orientation`), and width and height excluding the taskbar(`availWidth`, `availHeight`). Use it when you want different behavior depending on screen size.

![screen object](/apps/blog/public/images/posts/composition-of-javascript/6.webp?raw=true)

### 4-3. `location`

The `location` object provides information about the ***URL*** address, allowing you to read the current ***URL*** and change(redirect) to a new ***URL***.

![location object](/apps/blog/public/images/posts/composition-of-javascript/7.webp?raw=true)

### 4-4. `frames`

The `frames` object is described below.

Returns the `window` itself, which is an ***array-like object***, listing the direct sub-frames of the current `window`.

### 4-5. `history`

The `history` object provides a way to manipulate the browser's session history, that is, the visit history of the tab or frame that loaded the current page.

![history object](/apps/blog/public/images/posts/composition-of-javascript/8.webp?raw=true)

### 4-6. `XMLHttpRequest`

The `XMLHttpRequest`(***XHR***) object is used when interacting with a server. With ***XHR***, you can fetch data from a ***URL*** without refreshing the page. Using this, you can update part of the page without interrupting the user's work.
