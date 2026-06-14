---
title: '`path` Module'
description: 'The Node.js `path` module provides various methods(`normalize`, `join`, `resolve`, `dirname`, `basename`, `extname`, `parse`) for working with file and folder paths.'
created: '2024-04-02'
updated: '2024-10-08'
categories:
  - 'nodejs'
references:
  - 'https://nodejs.org/api/path.html'
  - 'https://defineall.tistory.com/655'
---

`path` is a basic built-in module of Node.js.

It provides features for working with file and folder paths.

## 1. Loading

You can load the `path` module through code like the following.

```js
const path = require("path");
```

## 2. Methods

### 2-1. `path.normalize()`

It optimizes and stores a path in the shortest form.

- Input

```js
const path = require("path");

const myPath = path.normalize("/this/is//a/my/.././path/normalize");

console.log(myPath);
```

- Output

```txt
/this/is/a/path/normalize
```

### 2-2. `path.join()`

It specifies a path according to the current operating system from String-type arguments.

- Input

```js
const path = require("path");

const myPath = path.join("/this", "is", "a", "////path//", "join");

console.log(myPath);
```

- Output

```txt
/this/is/a/path/join
```

### 2-3. `path.resolve()`

It combines String-type arguments, specifies a path according to the operating system, and optimizes it at the same time.

- Input

```js
const path = require("path");

const myPath = path.resolve("/this", "is/a", "../.", "path", "resolve");

console.log(myPath);
```

- Output

```txt
/this/is/path/resolve
```

- Input

```js
const path = require("path");

const myPath = path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");

console.log(myPath);
```

- Output

```txt
current-location/wwwroot/static_files/gif/image.gif
```

### 2-4. `path.dirname()`

Print the current working folder path.

- Input

```js
const path = require("path");

const myPath = path.dirname("/foo/bar/baz/asdf/image.png");

console.log(myPath);
```

- Output

```txt
/foo/bar/baz/asdf
```

### 2-5. `path.basename()`

Print the current working file name.

- Input

```js
const path = require("path");

const myPath = path.basename("/foo/bar/baz/asdf/image.png");

console.log(myPath);
```

- Output

```txt
image.png
```

### 2-6. `path.extname()`

Get the file type. It returns the extension.

- Input

```js
const path = require("path");

const myPath = path.extname("/home/user/dir/file.txt");

console.log(myPath);
```

- Output

```txt
.txt
```

### 2-7. `path.parse()`

It analyzes the path, then divides and classifies it according to format.

- Input

```js
const path = require("path");

const myPath = path.parse("/home/user/dir/file.txt");

console.log(myPath);
```

- Output

```txt
{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```
