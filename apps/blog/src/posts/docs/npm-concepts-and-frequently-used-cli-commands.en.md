---
title: '`npm` Concepts and Frequently Used CLI Commands'
description: '`npm` is the package management tool for Node.js; it supports package installation, initialization, updates, and deletion, and lets you efficiently manage dependencies and development dependencies through various flags.'
created: '2024-08-01'
updated: '2024-08-01'
categories:
  - 'npm'
references:
  - 'https://docs.npmjs.com/cli/v10/commands/npm-install'
  - 'https://carrotweb.tistory.com/107'
  - 'https://binit.tistory.com/36'
  - 'https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/'
  - 'https://hellominchan.tistory.com/10'
  - 'https://velog.io/@me2designer/NPM-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%A4%EC%A0%95'
  - 'https://c17an.netlify.app/blog/node.js/npm-install-%EC%A0%95%EB%A6%AC/article/'
---

A Package(Module) means a set of code that can perform a specific feature among the components of a program. Famous platforms each have their own Package Manager.

- Python: pip
- Java: Maven, Gradle
- PHP: Composer
- Ruby: RubyGems
- Linux(RedHat): rpm, yum
- Linux(Debian): dpkg, apt
- Mac: Homebrew

In this way, `npm`(Node Package Manager) is a program that helps install and manage Node.js-based modules. When developers around the world upload JavaScript-based open source modules to the `npm` repository, users download and use specific modules through the `npm` command.

There is no need to install `npm` separately; it is automatically installed together when Node.js is installed.

When following various courses or development documents, you can see several flags such as `--save-dev` and `-g` attached to various commands such as `npm install`; let us find out what they are and what roles they play.

## 1. `npm`

### 1-1. Flags

#### 1-1-1. `--version`

> aliases: `-v`

You can check the version of `npm`.

- Input

  ```sh
  npm --version
  ```

- Output

  ```sh
  10.8.1
  ```

## 2. `npm init`

> aliases: `create`, `innit`

It creates(initializes) an `npm` package and creates `package.json`.

- Input

  ```sh
  npm init
  ```

- Output

  ```sh
  package name: (name) # Package and directory name. (name) is the default value.
  version: (1.0.0) # Package version. (1.0.0) is the default value.
  description: # Description of the package.
  entry point: (index.js) # Start file name. (index.js) is the default value.
  git repository: # URL of the Git repository where the package is stored.
  keywords: # Keywords of the package.
  author: # Name of the original author. Enter a name or ID.
  license: (ISC) # License for package use. (ISC) is the default value.
  ```

### 2-1. Flags

#### 2-1-1. `--yes`

> aliases: `-y`

Through the `--yes` flag, you can get the same effect as entering <Kbd>y</kbd> for every answer without having to answer questions.

Mainly, because changing `package.json` is more intuitive than configuring it directly in the terminal, this is used to skip terminal configuration and create `package.json` through the `npm init --yes` command.

```sh
npm init --yes
```

## 3. `npm install`

> aliases: `add`, `i`, `in`, `ins`, `inst`, `insta`, `instal`, `isnt`, `isnta`, `isntal`, `isntall`

The behavior of `npm install` can be divided into the two cases below.

1. The behavior of specifying a package and installing that specific package.<sup>1</sup>
1. The behavior of installing all `dependencies` and `devDependencies` in the `package.json` file without specifying a package.<sup>2</sup>

For example,

1. running `npm install react` installs the `react` module<sup>1</sup>,
1. and running `npm install` installs all dependency packages included in `package.json` in bulk<sup>2</sup>.

### 3-1. Behavior of Specifying a Package and Installing a Specific Package<sup>1</sup>

Even when installing a specific package<sup>1</sup>, there are broadly two options.

1. An option that installs a package to be added to the `dependencies` list needed to run the project through `npm install [<@scope>/]<name>@<version>`<sup>1-1</sup>.
1. An option that installs a package to be added to the `devDependencies` list needed only during development through `npm install --save-dev [<@scope>/]<name>@<version>`<sup>1-2</sup>.

#### 3-1-1. Flags: <code>&nbsp;</code>(omitted)<sup>1-1</sup>

> aliases: `--save-prod`, `--save`, `-P`

If the flag is omitted, it is automatically recognized as `--save-prod`.

It is added to `dependencies` in `package.json`. `dependencies` refers to dependency files needed to run the app that are included in the actual code, like the `react` package.

```sh
npm install [<@scope>/]<name>@<version>
```

> [!TIP]
>
> 1. If you do not enter `@<version>`, the latest version of the package is installed.
>
> 1. You can install the latest version through `@latest`. (Used for updates.)
>
> 1. You can list multiple packages and install several packages at the same time.
>
>     ```sh
>     $ npm install react react-dom@latest
>     ```

#### 3-1-2. Flags: `--save-dev`<sup>1-2</sup>

> aliases: `-D`

It is added to `devDependencies` in `package.json`. `devDependencies` refers to dependency files that are not included in the actual code and are needed only during development, such as the `eslint` package.

```sh
npm install --save-dev [<@scope>/]<name>@<version>
```

#### 3-1-3. Flags: `--global`

> aliases: `-g`

It installs the package globally in the system's `node_modules` folder, not in the project(Local). Through this, the package can also be used in other Node.js projects.

|OS|Path|
|---|---|
|Window|`C:\Users\%USERPROFILE%\AppData\Roaming\npm\node_modules`|
|Mac|`/usr/local/lib/node_modules`|

When the `--global`(`-g`) flag is used, it is not recorded in `package.json`.

The system's `node_modules` path can be found through `npm root -g`.

### 3-2. Behavior of Installing ... All Without Specifying a Package<sup>2</sup>

If you run only `npm install` without a package name, all `dependencies` and `devDependencies` recorded in the project's `package.json` are downloaded.

#### 3-2-1. Flags: `--production`

Because `devDependencies` files are used only for development, it may be wasteful for general users to download those packages. The flag used here is `--production`; when this flag is attached, only `dependencies` files are downloaded, excluding `devDependencies`.

```json
{
  "devDependencies": {
    "eslint": "^9.8.0"
  },
  "dependencies": {
    "react": "^18.3.1"
  }
}
```

If `npm install --production` is run on `packages.json` recorded as above, only the `react` package is installed, excluding `eslint`.

## 4. `npm uninstall`

> aliases: `unlink`, `remove`, `rm`, `r`, `un`

If you enter the package name to delete after the command, all files related to the installed package are deleted from `node_modules` and also deleted from `package.json`.
(However, if you used a specific option when installing, use the same option when deleting.)

```sh
npm uninstall [<@scope>/]<pkg>...
```

## 5. `npm update`

> aliases: `up`, `upgrade`, `udpate`

Updates installed packages to the latest version. (Be careful because incorrectly updating packages with linked dependencies can cause errors in an existing project.)

```sh
npm update [<pkg>...]
```
