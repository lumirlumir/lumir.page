---
title: 'JavaScript CommonJS and ES Module Export/Import (`require` and `import`)'
description: 'In Node.js, modules can be loaded with `require`(CommonJS) and `import`(ES6), and each has its own usage and pros and cons. CommonJS maintains backward compatibility and exports and imports objects through `exports` and `module.exports`. In contrast, ES6 modules are more readable and performant, and they manage modules more clearly using `export` and `default export`. When using ES modules, the `.js` extension must be added.'
created: '2024-04-02'
updated: '2024-07-22'
categories:
  - 'nodejs'
references:
  - 'https://www.daleseo.com/js-module-require/#%EC%A3%BC%EC%9D%98-%EC%82%AC%ED%95%AD'
  - 'https://www.daleseo.com/js-module-import/#%EB%8B%A8%EC%9D%BC-%EA%B0%9D%EC%B2%B4-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0'
---

When developing JavaScript, you often see code that loads external libraries through the `require` or `import` keyword. `require` is a CommonJS keyword that has long been used in Node.js, and `import` is a keyword newly introduced in ES6(ES2015) that is becoming the standard in the current JavaScript ecosystem. Both keywords share the same purpose of loading code from another file into one file, but their similar yet slightly different syntax can confuse developers.

> Starting with Node.js version 13.2, official support for ES Modules as well as CommonJS began, so ES modules can now be used in Node.js without necessarily transpiling.

```js
const express = require("express");

const app = express();
```

```js
import express from "express";

const app = express();
```

For example, the two pieces of code above perform the same task of loading the ExpressJS library and creating a server object. The first code, which follows the CommonJS method, uses the `require` keyword like the Ruby language to load a module as if assigning any other variable, while the second code, which follows the ES Module method, uses the `import` keyword like Java or Python to load the module more explicitly.

> A module means encapsulating related code into one code unit.

## 1. JavaScript CommonJS Module Export/Import (`require`)

Let us look at the first method, exporting and importing modules based on CommonJS.

### 1-1. Why the CommonJS Module System Is Needed

Although the ES6 module system is increasingly used in many projects, unfortunately it is still not always possible to code using the `import` keyword. In browser environments that use the `<script>` tag and also in Node.js, ES Module support has begun, but CommonJS is still adopted as the default module system for backward compatibility. In situations where tools such as Babel that transform(transpile) ES6 code cannot be used, you must use the `require` keyword whether you like it or not. Therefore, it helps to know how to use CommonJS to some extent.

### 1-2. Cautions

When exporting modules in the CommonJS method, you do not declare them explicitly as in ES6; instead, you must set the object to export as a specific variable or a property of that variable. In particular, the most confusing part is that the similar-looking `exports` variable and `module.exports` variable must be used properly depending on the situation. Basically, remember only the following two rules.

1. When exporting multiple objects, assign them as properties of the `exports` variable.
1. When exporting exactly one object, assign it to the `module.exports` variable itself.

### 1-3. Multiple Objects

First, let us look at how to export and import multiple objects from one JavaScript module file.

#### 1-3-1. Export Multiple Objects

Below is JavaScript example code that converts U.S. and Canadian dollars to each other. This file has three functions, but only the two functions below were exported so they can be accessed from another file. Set the functions to export as properties of the `exports` variable.

```js
/* currency-functions.js */

const exchangeRate = 0.91;

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

const canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};

function usToCanadian(us) {
  return roundTwoDecimals(us / exchangeRate);
}

exports.canadianToUs = canadianToUs; // export 1
exports.usToCanadian = usToCanadian; // export 2
```

#### 1-3-2. Import Multiple Objects

The multiple objects exported above can be loaded all at once through the `require` keyword and assigned to a variable, and the exported objects can be accessed through that variable.

> At this time, the `require` keyword returns an object.

```js
/* test-currency-functions.js */

const currency = require("./currency-functions");

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- Execution result

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

### 1-4. Single Object

Next, let us look at how to export and import only one object from one JavaScript module file.

#### 1-4-1. Export a Single Object

This time, the example code was slightly modified, and the two functions below were grouped into an object and exported. You can assign the object to export to the `module.exports` variable.

```js
/* currency-object.js */

const exchangeRate = 0.91;

// not exported
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// export
const obj = {};
obj.canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};
obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
module.exports = obj;
```

#### 1-4-2. Import a Single Object

The one object exported above can be assigned to a variable through the `require` keyword, and through that variable you can access functions set on properties as if accessing a normal object.

> At this time, the `require` keyword returns an object.

```js
/* test-currency-object.js */

const currency = require("./currency-object");

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- Execution result

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

## 2. JavaScript ES Module Export/Import (`import`)

Let us look at the second method, exporting and importing modules based on ES6.

### 2-1. Benefits of the ES6 Module System

Because the ES6 module system is a more recent specification, it has several advantages over the CommonJS method. First, readability is good because it uses keywords dedicated to module management, such as `import`, `from`, `export`, and `default`. Also, because it works asynchronously and only loads the parts actually used from the module, there are advantages in performance and memory. In addition, there are features that CommonJS does not support, such as Named Parameters, which will be covered later.

### 2-2. Multiple Objects

First, let us look at how to export and import multiple objects from one JavaScript module file.

#### 2-2-1. Export Multiple Objects

In CommonJS, multiple objects to export were assigned as properties of the `exports` variable, but in ES6, they are declared explicitly using the `export` keyword, the partner of the `import` keyword. At this time, the name of the variable or function being exported becomes the name used as-is when importing it, so this is called Named Exports.

Below is JavaScript example code that converts U.S. and Canadian dollars to each other. This file has three functions, but only the two functions below were exported so they can be accessed from another file. As in the first method, they can be exported at the same time as declaration, or exported separately after declaration as in the second method.

> Through `export`, everything such as functions(`function`), variables(`let`, `const`), and classes(`class`) can be exported.

```js
/* currency-functions.js */

const exchangeRate = 0.91;

// not exported
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// export 1
export function canadianToUs(canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
}

// export 2
const usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
export { usToCanadian };
```

#### 2-2-2. Import Multiple Objects

When importing multiple objects(Named Exports), you can use ES6 Destructuring syntax to selectively use only the necessary objects globally, or attach an alias to all objects and access them through that alias.

> In the case of Named Exports, they can only be `import`ed by the name that was `export`ed.
>
> Also, when `import`ing, they must be brought in with curly braces.

```js
/* test-currency-functions.js */

// Destructuring
import { canadianToUs } from "./currency-functions";

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(canadianToUs(50));

// Alias
import * as currency from "./currency-functions";

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- Execution result

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

### 2-3. Single Object

Next, let us look at how to export and import only one object from one JavaScript module file.

#### 2-3-1. Export a Single Object

In CommonJS, a single object to export was assigned to the `module.exports` variable, but in ES6, the `export default` keyword is used instead to declare it explicitly. Because only one object is exported from one module, this is called Default Export.

This time, the example code was slightly modified, and the two functions below were grouped into an object and exported. (Inside the object, the first function uses ES6 syntax.) Because no name is needed, the object can be exported directly without separately assigning it to a variable. Since no name is specified when exporting, any name can also be used when importing.

```js
/* currency-object.js */

const exchangeRate = 0.91;

// not exported
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// export
export default {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  },

  usToCanadian: function (us) {
    return roundTwoDecimals(us / exchangeRate);
  },
};
```

If you really want to assign it to a variable and export it, you can also write it as follows. However, the importing side is not forced to use this variable name `obj`.

```js
/* currency-object.js */

const obj = {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  },
};

obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};

export default obj;
```

#### 2-3-2. Import a Single Object

When importing one object(Default Export), simply use the `import` keyword, give it any name you want, and access properties through that object.

> In the case of Default Export, it can be `import`ed with any desired name regardless of the name that was `export`ed.
>
> Also, curly braces are not needed when `import`ing.

```js
/* test-currency-object.js */

import currency from "./currency-object";

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUs(50));

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

- Execution result

```txt
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

## 3. Closing

One thing to note is that if you are using ES modules purely with the latest version of Node.js without Babel, you must add the `.js` extension when using `import`.
