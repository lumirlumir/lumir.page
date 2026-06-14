---
title: 'Dotenv: `dotenv`, `dotenv-webpack`'
description: 'Using the `dotenv` library, you can manage environment variables in a Node.js project through a `.env` file and access them easily, allowing different settings to be used safely depending on the development environment.'
created: '2024-04-04'
updated: '2024-10-30'
categories:
  - 'npm'
references:
  - 'https://www.daleseo.com/js-dotenv/#%EB%A7%88%EC%B9%98%EB%A9%B4%EC%84%9C'
  - 'https://db2dev.tistory.com/entry/React-Webpack%EC%9C%BC%EB%A1%9C-%EA%B5%AC%EC%B6%95%ED%95%9C-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98env-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0'
---

Let us look at how to manage environment variables as a `.env` file through `dotenv`.

Environment Variables are a collection of dynamic values that affect how a process runs on a computer. In other words, from the OS perspective, they are variables referenced to run a specific process.

During development, there are cases where different values must be applied for each development, test, and deployment environment, such as a service or API URL. Also, Keys issued to use an API must not be uploaded externally(to Github and so on). In such situations, environment variables are used to configure specific variables by environment or exclude them after the build step is complete.

Many Node.js projects use a library called `dotenv` to manage environment variables more effectively. This time, let us look at the `dotenv` library, which helps store environment variables in a file and access them.

## 1. Installing the `dotenv` Package

Using the npm package manager, install the `dotenv` library in the Node.js project as `dependencies`.

```sh
$ npm i dotenv
```

## 2. Writing a `.env` File

If no configuration is made, the `dotenv` library reads environment variables from the `.env` file located in the current directory. Let us create a `.env` file and list the required environment variables inside it in the `Key=Value` format.

> The `.env` file is not in JSON or YAML format; it is composed simply by listing key-value pairs.

```sh
# .env

DB_HOST=localhost
DB_USER=root
DB_PASS=1234
```

The environment variables stored in the `.env` file in this way can be set in `process.env` using the `dotenv` library.

Because the library usage differs slightly depending on whether your project is based on CommonJS or ES modules, I will explain them separately.

## 3. Loading Environment Variables in CommonJS (`require`)

First, let us look at how to use the `dotenv` library in CommonJS, the module system traditionally provided by Node.js.

At the top of the JavaScript file that is executed first when the program starts(ex. `index.js`, `main.js`), you only need to import the `dotenv` library and call the `config()` function as follows.

```js
/* index.js */

require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

For example, if you run the code above, you can see the environment variables read from `process.env` printed.

```sh
$ Node index.js
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

However, be careful not to read `process.env` before calling the `config()` function of the `dotenv` library in the same file.

```js
/* index.js */

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

require("dotenv").config();
```

```sh
$ Node index.js
DB_HOST: undefined
DB_USER: undefined
DB_PASS: undefined
```

## 4. Loading Environment Variables in ES Modules (`import`)

In a Node.js environment that uses ES modules, you can load the `dotenv` package using the `import` keyword instead of `require`.

```js
/* index.mjs */

import dotenv from "dotenv";

dotenv.config();

console.log("DB_HOST", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

## 5. Loading Environment Variables in a React Project

A React project built with CRA(create-react-app) already includes the `dotenv` package, so no separate installation is needed. However, a React project built directly through Webpack and similar tools does not include the `dotenv` package, so installation is required.

### 5-1. React Project Built with CRA

Because the `dotenv` package is already included, environment variables can be used simply by creating a `.env` file at the project Root and declaring variables, without adding a separate package or configuring Webpack.

```sh
# .env

REACT_APP_ENV=development
REACT_APP_API_URL=<https://api.random-api.com>
REACT_APP_API_KEY=1234asdf
```

- Variable names must start with `REACT_APP_`. CRA internally reads only environment variables that start with `REACT_APP_`.

- Access variables with `process.env.REACT_APP_[variable-name]`.

- If you add or modify variables in `.env`, the server must be restarted for the settings to be applied.

### 5-2. React Project Built with Webpack

#### 5-2-1. Possible Errors

If you use the methods in Common JS and ES modules explained above in React in the same way, you are likely to encounter an `Error` like the following.

```txt
Module not found: Error: Can't resolve 'fs' in '/node_modules/dotenv/lib'
Module not found: Error: Can't resolve 'path' in '/node_modules/dotenv/lib'
Module not found: Error: Can't resolve 'os' in '/node_modules/dotenv/lib'
...
If you want to include a polyfill, ...
If you don't want to include a polyfill, ...
```

This is an `Error` that occurs because the `fs`, `path`, and `os` modules cannot be found. At this time, it guides you to specify a `polyfill` in Webpack's `resolve` option, but even if you specify it, only another error occurs.

The core of the problem is that Node.js built-in modules such as `fs`, `path`, and `os` cannot be used in client-side(browser environment) JavaScript such as React. (This can be seen as the difference between running a specific JavaScript file on Node.js or in a browser environment.) These modules can only be used in a Node.js environment running on the server side, and are not supported on the client side. In other words, React does not provide `fs`, `path`, or `os`, so they cannot be used inside the project. Therefore, if you try to use these modules directly in an application that runs on the client side, such as React, you will encounter a `Module not found` error.

The `dotenv` package is a zero-dependency module that loads environment variables declared in a `.env` file into `process.env`. It finds the absolute path of `.env` with the `os` and `path` modules, reads the `.env` file with the `fs` module, and stores it in `process.env` in the `Key=Value` format. In this process, it uses the `fs`, `path`, and `os` modules. Ultimately, `dotenv` is a server-side package that runs only in a Node.js environment. Therefore, on the client side, another method must be found.

#### 5-2-2. Three Ways to Use `dotenv` as Environment Variables in React

> For more details about the `webpack.DefinePlugin()`, `webpack.EnvironmentPlugin()`, and `JSON.stringify()` methods themselves, see another Markdown document.

Through the code below, you can first check whether the environment variables in the `.env` file are included in `process.env`.

```js
/* webpack.config.js */

const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  ...
}

console.log(process.env)
```

```sh
$ node webpack.config.js
```

##### 5-2-2-1. `webpack.DefinePlugin()`

Use `webpack.DefinePlugin()` to define a global variable called `process.env` so it can be accessed from anywhere in the file.

At this time, it must be converted to a JSON string through `JSON.stringify()`. If this is omitted, a Syntax Error occurs.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  ...
}
```

##### 5-2-2-2. `webpack.EnvironmentPlugin()`

`webpack.EnvironmentPlugin()` is the same as defining the `process.env` variable in `webpack.DefinePlugin()`, but it supports shortened syntax. The `Key` values configured in the array can be accessed through `process.env` in the same way.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.EnvironmentPlugin([
      "KEY_1",
      "KEY_2",
      "KEY_3",
    ]),
  ],
  ...
}
```

The code above is exactly the same as defining it with `webpack.DefinePlugin()` as shown below.

```js
/* webpack.config.js */

module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin([
      "process.env.KEY_1": JSON.stringify(process.env.KEY_1),
      "process.env.KEY_2": JSON.stringify(process.env.KEY_2),
      "process.env.KEY_3": JSON.stringify(process.env.KEY_3),
    ]),
  ],
  ...
}
```

##### 5-2-2-3. `dotenv-webpack` Package

There is also a simple method of using the `dotenv-webpack` package instead of `dotenv`.

First, install the package.

```sh
$ npm install -D dotenv-webpack
```

Then configure `webpack.config.js` as follows.

```js
/* webpack.config.js */

const Dotenv = require("dotenv-webpack");

module.exports = {
  ...
  plugins: [
    new Dotenv(),
  ],
  ...
}
```

### 5-3. Summary

React project built with CRA.

- When declaring environment variables in a `.env` file, they must start with `REACT_APP_`.
- Without separate configuration, environment variables can be accessed through `process.env` in files under the `/src` directory.

React project built with Webpack.

- When declaring environment variables in a `.env` file, they do not have to start with `REACT_APP_`.
- `dotenv` package: Manually define global variables by adding `new webpack.DefinePlugin()` to Webpack's `plugins`.
- `dotenv-webpack` package: Add `new Dotenv()` to Webpack's `plugins`.

## 6. Storing Environment Variables in Another File

What if you need to store environment variables in a file located at a path other than `.env`?

```sh
# .env.local

DB_HOST=localhost
# DB_USER=root
DB_USER=test
# DB_PASS=1234
DB_PASS=5678
```

In that case, when calling the `config()` function, pass the file path to the `path` option.

```js
/* index.mjs */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: test
DB_PASS: 5678
```

## 7. Loading Environment Variables While Running a Program

If it is difficult to `import` `dotenv` and call the `dotenv.config()` function in code, there is also a method of passing `dotenv/config` with the `-r` or `--require` option of the `node` command when running the program. Using this method, environment variables stored in the `.env` file are set in `process.env` without directly `import`ing the `dotenv` library in code.

First, open the `index.js` or `index.mjs` file and delete the part that loads the `dotenv` package and calls the `dotenv.config()` function.

```js
/* index.mjs */

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
```

If you pass `dotenv/config` with the `-r` option and run it, you can see that the environment variables are printed normally.

```sh
$ Node -r dotenv/config index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
```

If you stored environment variables in a file located at a path other than `.env`, you can use the `DOTENV_CONFIG_PATH` environment variable.

```sh
$ DOTENV_CONFIG_PATH=.env.local Node -r dotenv/config index.mjs
DB_HOST: localhost
DB_USER: test
DB_PASS: 5678
```

This method is very useful when you cannot know in advance whether a project is based on CommonJS or ES modules. This is because it works regardless of which module system the corresponding Node.js runtime uses.

## 8. Common Mistakes in ES Modules

When using ES modules, you need to be a bit more careful than when using CommonJS. Let us reproduce a common problem.

Looking at the code below, because the `dotenv` library is `import`ed first, it seems like environment variables will be set when the `db.js` file accesses `process.env`.

```js
/* db.mjs */

export const db_host = process.env.DB_HOST;
export const db_user = process.env.DB_USER;
export const db_pass = process.env.DB_PASS;
```

```js
/* index2.mjs */

import dotenv from "dotenv";
import { db_host, db_user, db_pass } from "./db.js";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

console.log({ db_host, db_user, db_pass });
```

However, when actually running it, you can see that environment variables were not set at the point when the `db.js` file accessed `process.env`.

```sh
$ Node index2.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
{ db_host: undefined, db_user: undefined, db_pass: undefined }
```

The reason this phenomenon occurs is that the `dotenv.config()` function was called after the `db.js` file was `import`ed. This problem can be avoided by moving the code that `import`s the `dotenv` library into a separate file and calling the `dotenv.config()` function inside it.

```js
/* env.mjs */

import dotenv from "dotenv";

dotenv.config();
```

```js
/* index2.mjs */

import "./env.js";
import { db_host, db_user, db_pass } from "./db.js";

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

console.log({ db_host, db_user, db_pass });
```

Now, if you run the program again, you can see that environment variables are read normally in every file.

```sh
$ Node index2.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 1234
{ db_host: 'localhost', db_user: 'root', db_pass: '1234' }
```

As such, it is safe to call the `dotenv.config()` function as early as possible after the program starts.

## 9. Already Configured Environment Variables

Be careful because environment variables already configured at the operating system level are not overwritten by environment variable values read from a file through `dotenv`. For example, if you set the `DB_PASS` environment variable in advance before running the program on a Linux-based operating system as follows,

```sh
$ export DB_PASS=0000
$ Node index.mjs
```

you can see that the `1234` configured in the `.env` file is ignored and `0000` is applied.

```sh
$ Node index.mjs
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

For reference, you can easily find out which environment variables were already configured by setting the `debug` option to `true`.

```js
/* index.mjs */

import dotenv from 'dotenv';
const result = dotenv.config({ debug: true });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index.mjs
[dotenv@16.0.3][DEBUG] "DB_PASS" is already defined in `process.env` and was NOT overwritten
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

If you want the value of an environment variable configured in the `.env` file to overwrite the value of an already configured environment variable (this is not a good practice), set `override` to `true`.

```js
/* index.mjs */

import dotenv from 'dotenv';
const result = dotenv.config({ debug: true, override: true });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
```

```sh
$ Node index2.mjs
[dotenv@16.0.3][DEBUG] "DB_PASS" is already defined in `process.env` and was overwritten
DB_HOST: localhost
DB_USER: root
DB_PASS: 0000
```

## 10. Security Precautions

Because `.env` files usually contain sensitive credentials such as database passwords or API keys for third-party services, uploading them to a code repository such as Github can be quite dangerous. Especially in collaborative projects, it is desirable to configure the `.gitignore` file so that developers cannot accidentally upload them to the code repository.

```js
/* .gitignore */

.env
.env.local
```

In addition, it is not uncommon to store and use environment variables in different files for each deployment environment, such as `.env.production`, `.env.staging`, `.env.qa`, `.env.development`, `.env.local`, and `.env.test`. Doing this is vulnerable to security issues for the same reason as above, and in general, managing code and config in one place is considered a poor software development practice.

Therefore, it is good to use `.env` files only in a limited way when developers need to configure environment variables in a local environment, and in other environments, environment variables should be properly configured at the operating system level.
