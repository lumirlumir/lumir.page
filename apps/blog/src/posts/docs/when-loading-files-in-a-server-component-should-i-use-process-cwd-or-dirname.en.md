---
title: 'When Loading Files in a Server Component, Should I Use `process.cwd()` or `__dirname`?'
description: 'In Next.js, using `process.cwd()`, which always points to the project root directory, is more stable for file path management than `__dirname`, whose path may change after bundling.'
created: '2024-09-14'
updated: '2024-09-14'
categories:
  - 'nextjs'
references:
  - 'https://vercel.com/guides/loading-static-file-nextjs-api-route'
  - 'https://nodejs.org/api/process.html#processcwd'
  - 'https://nodejs.org/docs/latest/api/globals.html#__dirname'
---

While reading the official **Vercel**(**Next.js**) guide [How to Load Data from a File in Next.js](https://vercel.com/guides/loading-static-file-nextjs-api-route), a question suddenly came to mind.

```js
import { promises as fs } from 'fs';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  //...
}
```

Let us look at the code above mentioned in the official guide link. It uses `process.cwd()` when specifying the path of the file to load. In this case, can we not use Node.js's global variable `__dirname` instead?

## 1. `process.cwd()` and `__dirname`

`process.cwd()` and `__dirname` both indicate the current directory in Node.js, but the situations and meanings in which they are used are different.

### 1-1. [`process.cwd()`](https://nodejs.org/api/process.html#processcwd)

It returns the directory where the current process was started, and this can change depending on where the process was executed. In other words, it works regardless of where the code is located and returns the working directory where the current process is running.

- How it works: Returns based on the directory where the Node.js process started.
- Characteristic: The working directory can be changed through `process.chdir()`.

### 1-2. [`__dirname`](https://nodejs.org/docs/latest/api/globals.html#__dirname)

It returns the path of the folder where the running JavaScript file is located, and provides a fixed path. In other words, regardless of where the process was executed, it is based on the file location and only indicates the path according to the directory where the current JavaScript file is stored.

- How it works: Returns based on the storage location of the running JavaScript file.
- Characteristic: `__dirname` is fixed and always returns only the directory path where the file is stored.

### 1-3 Example

Assume the current working directory is `/`(root). Create the following JavaScript file in the `/my-folder` path. (At this time, the working directory must still be `/`.)

```js
/* code.js */

console.log(process.cwd());
console.log(__dirname);
```

Run the `/my-folder/code.js` file with the command below.

```sh
node my-folder/code.js
```

The output result is as follows.

```sh
/ # process.cwd()
/my-folder # __dirname
```

## 2. Usage in **Next.js** Server Components

In Next.js, using `__dirname` can behave differently from a normal Node.js environment. The reason is that Next.js bundles code at build time and distinguishes between server and client environments. In Next.js, when `__dirname` is executed on the server, it points to the path of the bundled file, so it may return a path different from what you expect, and caution is needed.

### 2-1. Differences

1. `process.cwd()`: Returns the directory where the current process is executed, that is, the **project root directory**. In the case of Next.js, this mainly points to the root directory of the project and is suitable for use when finding files.

1. `__dirname`: Returns the directory where the current file is located, but in Next.js this value can become the path of the bundled file. In other words, after Next.js builds and deploys, the path may behave differently, making relative paths difficult to configure.

### 2-2. Example

```js
/* /src/app/page.js */

export default function Page() {
  return (
    <>
      <p>process.cwd(): {process.cwd()}</p>
      <p>__dirname: {__dirname}</p>
    </>
  );
}
```

Assume the current working directory is `/`(root). In the code above, the directory where `page.js` is located is `/src/app`. If you load a specific file using `__dirname`, you will often combine it with functions such as `path.resolve()` and use a relative path like `/src/app/../data/data.json`.

However, after a Next.js build, `__dirname` changes to the path of the bundled file, so the possibility of not finding the desired file becomes very high. In other words, the `__dirname` path we expected was `/src/app`, but in reality, the path of the bundled file such as `/.next/server/app` is returned. If you look at the previous code in the browser's HTML, it is output as follows.

```txt
process.cwd(): /
__dirname: /.next/server/app
```

### 2-3. Conclusion

When finding file paths in a Next.js project, using `process.cwd()` is much more stable. Because `process.cwd()` always points to the root directory of the project, it can be used more consistently when specifying file paths. **Therefore, in a Next.js environment, using `process.cwd()` is recommended over `__dirname`.**
