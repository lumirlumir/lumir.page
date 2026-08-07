---
title: 'Babel: `@babel/core`, `@babel/cli`, `@babel/preset-env`, `@babel/preset-react`, `babel-loader`'
description: 'Babel is a transpiler that converts the latest JavaScript syntax into older syntax to provide compatibility across various execution environments; it supports not only ES6+ code but also TypeScript and JSX, and can be installed and used as a development dependency.'
created: '2024-04-03'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://babel.dev/docs/'
  - 'https://www.daleseo.com/js-babel/'
---

Let us look at Babel, a useful tool that helps developers code in JavaScript with the latest syntax regardless of the execution environment. The content below is based on Babel 7.

## 1. The JavaScript Developer's Dilemma

The syntax of the JavaScript language is evolving quickly, but the environments that actually run JavaScript code often fail to support it. For example, in the case of browsers, there are so many types that it is difficult to individually identify which browser supports which specification, and in the case of Node.js, language syntax support also differs by version, so although not as much as browsers, similar problems occur.

In this situation, JavaScript developers fall into an interesting dilemma. If they use the latest syntax from ES6 or later when coding in JavaScript, the code they wrote may not work in some execution environments; but if they code conservatively so that it runs in every environment, they must write code in the old ES5 or earlier style, whether they want to or not.

## 2. Babel: JavaScript Transpiler(Compiler)

What appeared to solve this developer dilemma is Babel, a JavaScript transpiler. Many developers also call Babel a JavaScript compiler more casually, but strictly speaking, compile means the process of changing source code written by humans into machine code that computers can understand, while transpile means the process of changing only the form of source code while keeping the same language so that it can run in another execution environment. Therefore, because JavaScript is an interpreted language and not a compiled language such as C or Java, a compilation process is not needed. However, in the actual JavaScript community, these two terms are used interchangeably, so there is probably no need to care too much about what it is called.

Using Babel, you can change the syntactic form inside source code so that JavaScript code written with the latest ES6 or later syntax looks as if it were written with old ES5 or earlier syntax. Source code whose syntactic form has been changed through Babel in this way works without problems not only in execution environments that support the latest syntax, but also in execution environments where the latest syntax has not yet been applied.

For example, the code below was written using the arrow function syntax introduced in ES6. However, if the browser where this code runs does not yet support arrow function syntax,

```js
[1, 2, 3].map((n) => n + 1);
```

a syntax error like the following will occur, and the code will not run normally.

```txt
SyntaxError: Unexpected token =>
```

However, using Babel, the source code above is changed to use regular function syntax as shown below.

```js
[1, 2, 3].map(function (n) {
  return n + 1;
});
```

The code whose form has changed in this way now runs normally in every browser.

## 3. TypeScript and JSX Support

Babel is often used not only for the latest ES6 or later syntax, but also when converting code written in TypeScript or JSX. React generally uses a special syntax called JSX when coding, so the original code written by the developer does not run properly in the browser. Therefore, React projects are usually built using the Webpack bundler and Babel loader.

## 4. Practice Project Setup

For a simple exercise, create an npm project in the terminal as follows.

```txt
$ mkdir learn-babel
$ cd learn-babel
$ npm init -y
```

Then create one JavaScript file and write code using ES6 arrow function syntax.

```js
/* before.js */

[1, 2, 3].map((n) => n + 1);
```

From now on, let us transpile the code above using Babel.

## 5. Babel Installation

First, install the `@babel/core` and `@babel/cli` packages in the project as development dependencies(devDependencies). (The reason for installing them as development dependencies is that Babel is not needed when the application runs, but only when it builds.) `@babel/core` is a package that is always needed no matter how Babel is used, and `@babel/cli` is a package needed when using Babel by entering commands in the terminal.

```sh
$ npm i -D @babel/core @babel/cli
```

Now, if you enter `npx babel <file-name/directory-name>` in the terminal as follows, the conversion result is printed in the terminal.

```sh
$ npx babel before.js
[1, 2, 3].map(n => n + 1);
```

Huh? The form of the source code is exactly the same as it was first written. The reason is that we have not yet told Babel how to transform the code.

## 6. Plugin/Preset Configuration

You can tell Babel syntax transformation rules through plugins or presets. Usually, a plugin is used when applying rules one by one in detail, and a preset is used when applying multiple rules at once.

For the practice project, we will use the most commonly used preset called `env`. The env preset defines all rules that convert code written in ES6 or later(ES2015+) syntax into ES5 syntax.

As above, install the `@babel/preset-env` package in the project as a development dependency.

```sh
$ npm i -D @babel/preset-env
```

Then, this time, if you add the `--presets=@babel/env` option to the existing Babel command and run it,

```sh
$ npx babel before.js --presets=@babel/env
"use strict";

[1, 2, 3].map(function (n) {
  return n + 1;
});
```

This time, you can see that code using a regular function instead of an arrow function is output with ES5 syntax applied.

## 7. Babel Configuration File

It would be very cumbersome if you had to attach options and configure them every time you run a Babel command. Therefore, in most cases, Babel is configured using configuration files such as `babel.config.js` or `.babelrc`.

Create a `.babelrc` file in the top-level directory of the practice project and add the following configuration.

```js
/* .babelrc */

{
  "presets": ["@babel/env"]
}
```

Now you can see that the `env` preset is applied even when running without attaching options after the command.

```sh
$ npx babel before.js
"use strict";

[1, 2, 3].map(function (n) {
  return n + 1;
});
```

## 8. Other Configuration Options

Using the `-o` option, you can save the converted code to another file instead of printing it to the terminal.

```sh
$ npx babel before.js -o after.js
```

```js
/* after.js */

"use strict";
[1, 2, 3].map(function (n) {
  return n + 1;
});
```

Using the `-d` option, you can save multiple converted files inside a specific directory. The following command converts every JavaScript file in the `src` directory and saves it in the `dist` directory.

```sh
$ npx babel src -d dist
```

## 9. NPM Script Configuration

If you frequently use Babel commands, it is convenient to register and use them as NPM scripts.

```js
/* package.json */

{
  // ...
  "scripts": {
    "build": "babel src -d dist"
  },
  // ...
}
```

If you specify the Babel command as the `build` script as above, the Babel command runs when you enter `npm run build`.

```sh
$ npm run build

> learn-babel@1.0.0 build /Users/dale/learn-babel
> babel src -d dist

Successfully compiled 2 files with Babel.
```

## 10. Closing

So far, we have directly run Babel commands in the practice project and looked at how Babel transpiles source code. Babel is sometimes used independently like this, but in large projects it is usually used together with bundlers such as Webpack or Rollup, or included as part of a framework. Therefore, unless you participate in the initial setup of a project, there are not many opportunities to handle Babel directly, but because Babel is an important tool used in almost every recent JavaScript project, we briefly covered it.

## 11. Summary

- `@babel/core`: A package that includes the core features always needed no matter how Babel is used.
- `@babel/cli`: A package needed when using Babel by entering commands in the terminal.
- `@babel/preset-env`: The most commonly used preset. It defines all rules that convert code written in ES6 or later(ES2015+) syntax into ES5 syntax.
- `@babel/preset-react`: A preset for React. By default, it defines all rules needed to convert JSX syntax and expressions used when defining React components into JavaScript.
- `babel-loader`: Connects Babel and Webpack.
