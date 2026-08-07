---
title: 'Everything about Markdown<sup>Markdown</sup>'
description: 'A complete summary of concepts, syntax, usage, and practical use for Markdown<sup>Markdown</sup> and GFM<sup>GitHub Flavored Markdown</sup>.'
created: '2024-05-25'
updated: '2026-04-04'
categories:
  - 'markdown'
references:
  - 'https://www.heropy.dev/p/B74sNE'
  - 'https://jaime-note.tistory.com/343'
  - 'https://gist.github.com/ihoneymon/652be052a0727ad59601'
  - 'https://inpa.tistory.com/entry/MarkDown-%F0%9F%93%9A-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EB%AC%B8%EB%B2%95-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC#table_%ED%85%8C%EC%9D%B4%EB%B8%94'
  - 'https://github.com/DavidAnson/markdownlint/tree/v0.33.0?tab=readme-ov-file#readme'
  - 'https://docs.github.com/ko/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions'
  - 'https://github.github.com/gfm'
  - 'https://github.github.com/gfm/#disallowed-raw-html-extension-'
  - 'https://docs.github.com/ko/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#urls'
  - 'https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'
---

<!-- markdownlint-disable MD003 MD004 MD024 MD029 MD033 MD035 MD046 MD049 MD050 MD055 MD060 -->

Markdown<sup>Markdown</sup> file extensions end with `.md`. When developing, you will probably encounter a file named `README.md` at least once, and this can be considered the most representative Markdown file.

There is also AsciiDoc syntax with the `.adoc` extension, which is similar to Markdown but has more complex syntax and can create more varied forms of documents. However, because the syntax is much more complex and there are fewer supported platforms, there are many restrictions on its use.

## 1. About Markdown<sup>Markdown</sup>

### 1-1. What Is Markdown?

[Markdown](https://www.markdownguide.org/getting-started) is a text-based markup language created by John Gruber in 2004. It is easy to read and write, and it is easy to convert to HTML. By using simple syntax made of special characters and symbols, content can be written faster on the web and recognized more intuitively.

The reason Markdown began to receive attention was thanks to [GitHub<sup>GitHub</sup>](https://github.com). `README.md`, which records information about a Repository<sup>Repository</sup>, is the first document most people encounter when using GitHub. As the advantage of simply recording installation methods, source code explanations, issues, and so on through Markdown and improving readability stood out, it gradually spread to many places.

HTML tags<sup>Tag</sup> can be inserted and used in Markdown. Although not every tag is supported, they are useful when you want richer expression in a document.

At this time, how a Markdown document is expressed differs depending on CSS settings. Therefore, the expression may differ depending on which platform(GitHub, VScode, Velog, Discord, and so on) is used.

### 1-2. Pros and Cons of Markdown

#### 1-2-1. Advantages

- The syntax is easy and concise.
- It can be used in many places. (websites, documents, notes, and so on)
- Many programs and platforms support it.
- It can be written in most environments without separate tools. (even Notepad is possible)
- It can be converted into many formats.
- Because it is stored as text, its size is small and it is easy to keep.
- Because it is text, change history can be managed using a version control system.

#### 1-2-2. Disadvantages

- Because there is no standard, conversion methods or generated output differ depending on the tool.
- It cannot replace every HTML syntax.

## 2. How to Use Markdown(Syntax) - Standard Markdown Syntax

Each Markdown syntax is converted into an HTML tag<sup>Tag</sup> and output in the browser. Not every HTML tag is supported, and only some important syntax is provided.

### 2-1. Headings

This expresses headings that are converted into `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` tags.

Just as a book has many levels in its table of contents but only one book title, one Markdown file should use only one `<h1>`(main heading).

#### 2-1-1. ATX style

Heading levels 1 through 6 are supported. (`<h1>`-`<h6>`)

It starts with `#`.

- Input

  ```md
  # This is ATX style H1
  ## This is ATX style H2
  ### This is ATX style H3
  #### This is ATX style H4
  ##### This is ATX style H5
  ###### This is ATX style H6
  ####### This is ATX style H7 (not supported)
  ```

- Output

  <!-- markdownlint-disable-next-line -->
  # This is ATX style H1
  <!-- markdownlint-disable-next-line -->
  ## This is ATX style H2
  <!-- markdownlint-disable-next-line -->
  ### This is ATX style H3
  <!-- markdownlint-disable-next-line -->
  #### This is ATX style H4
  <!-- markdownlint-disable-next-line -->
  ##### This is ATX style H5
  <!-- markdownlint-disable-next-line -->
  ###### This is ATX style H6
  <!-- markdownlint-disable-next-line -->
  ####### This is H7(not supported)

#### 2-1-2. Closed ATX style

Heading levels 1 through 6 are supported. (`<h1>`-`<h6>`)

It starts with `#` and ends with `#`.

- Input

  ```md
  # This is Closed ATX style H1 #
  ## This is Closed ATX style H2 ##
  ### This is Closed ATX style H3 ###
  #### This is Closed ATX style H4 ####
  ##### This is Closed ATX style H5 #####
  ###### This is Closed ATX style H6 ######
  ####### This is Closed ATX style H7(not supported) #######
  ```

- Output

  <!-- markdownlint-disable-next-line -->
  # This is Closed ATX style H1 #
  <!-- markdownlint-disable-next-line -->
  ## This is Closed ATX style H2 ##
  <!-- markdownlint-disable-next-line -->
  ### This is Closed ATX style H3 ###
  <!-- markdownlint-disable-next-line -->
  #### This is Closed ATX style H4 ####
  <!-- markdownlint-disable-next-line -->
  ##### This is Closed ATX style H5 #####
  <!-- markdownlint-disable-next-line -->
  ###### This is Closed ATX style H6 ######
  <!-- markdownlint-disable-next-line -->
  ####### This is Closed ATX style H7(not supported) #######

#### 2-1-3. Setext style

Only heading levels 1 through 2 are supported. (`<h1>`-`<h2>`)

It uses `=` and `-`.

##### 2-1-3-1. Large Heading: `<h1>`

The number of `=` characters does not matter.

- Input

  ```md
  This is Setext style H1
  =============

  This is Setext style H1
  =
  ```

- Output

  <!-- markdownlint-disable-next-line -->
  This is Setext style H1
  =============

  <!-- markdownlint-disable-next-line -->
  This is Setext style H1
  =

<!-- markdownlint-disable-next-line -->
##### 2-1-3-2. Small Heading: `<h2>`

The number of `-` characters does not matter.

- Input

  ```md
  This is Setext style H2
  -------------

  This is Setext style H2
  -
  ```

- Output

  <!-- markdownlint-disable-next-line -->
  This is Setext style H2
  -------------

  <!-- markdownlint-disable-next-line -->
  This is Setext style H2
  -

### 2-2. Line Breaks

For Line Breaks, enter at least two spaces(<code>  </code>) at the end of a sentence, or directly enter the HTML `<br>` tag at the end of a sentence.

#### 2-2-1. Markdown style

Add at least two spaces(<code>  </code>) at the end of the sentence.

- Input

  ```md
  - To make a line break, add at least two spaces at the end of the sentence.
    like this

  - To make a line break, add at least two spaces at the end of the sentence.__\\ space
    like this
  ```

- Output

  - To make a line break, add at least two spaces at the end of the sentence.
    like this

  - To make a line break, add at least two spaces at the end of the sentence.  \
    like this

#### 2-2-2. HTML style

Directly enter the HTML `<br>` tag.

- Input

  ```html
  - To make a line break, enter the `<br>` tag at the end of the sentence.
    like this

  - To make a line break, enter the `<br>` tag at the end of the sentence. <br>
    like this
  ```

- Output

  - To make a line break, enter the `<br>` tag at the end of the sentence.
    like this

  - To make a line break, enter the `<br>` tag at the end of the sentence. <br>
    like this

### 2-3. Horizontal Rules

Enter at least <u>three</u> of each symbol, `-`, `_`, or `*`, to express a Horizontal Rules<sup>Horizontal Rules</sup> element that is converted into an `<hr>` tag.

However, when using `-`, it may be recognized as a Heading<sup>Headings</sup>, so the previous line should be left blank.

When previewing a Markdown document, it is often used for *page breaks*.

<!-- eslint-disable md/consistent-thematic-break-style -- Used for example -->

#### 2-3-1. `-` style

- Input

  ```md
  ---

  - - -

  -----
  ```

- Output

  ---

  - - -

  -----

#### 2-3-2. `_` style

- Input

  ```md
  ___

  _ _ _

  _____
  ```

- Output

  ___

  _ _ _

  _____

#### 2-3-3. `*` style

- Input

  ```md
  ***

  * * *

  *****
  ```

- Output

  ***

  * * *

  *****

<!-- eslint-enable md/consistent-thematic-break-style -- Re-enable -->

### 2-4. Comments

Use the `[//]: #` and `<!-- -->` symbols to express a Comment<sup>Comment</sup>.

#### 2-4-1. Markdown style

Use the `[//]: #` symbol.

- Input

  ```md
  -- start --

  [//]: # (Hello.)
  [//]: # "Hello."
  [//]: # 'Hello.'

  -- end --
  ```

- Output

  -- start --

  [//]: # (Hello.)
  [//]: # "Hello."
  [//]: # 'Hello.'

  -- end --

#### 2-4-2. HTML style

Use the `<!-- -->` symbol used in HTML.

- Input

  ```html
  -- start --

  <!-- (Hello.) -->
  <!-- "Hello." -->
  <!-- 'Hello.' -->

  -- end --
  ```

- Output

  -- start --

  <!-- (Hello.) -->
  <!-- "Hello." -->
  <!-- 'Hello.' -->

  -- end --

### 2-5. Emphasis

This expresses 'Emphasis<sup>Emphasis</sup>' that is converted into `<em>`(italic), `<strong>`(bold), and `<del>`(strikethrough) tags respectively.

To add an underline, which Markdown does not support, you can directly use the HTML `<u></u>`(underline) tag.

#### 2-5-1. Italic

Wrap it with the `*` or `_` symbol.

<!-- eslint-disable md/consistent-emphasis-style -- Used for example -->

- Input

  ```md
  - *single asterisk*
  - _single underscore_
  ```

- Output

  - *single asterisk*
  - _single underscore_

<!-- eslint-enable md/consistent-emphasis-style -- Re-enable -->

#### 2-5-2. Bold

Wrap it with the `**` or `__` symbol.

<!-- eslint-disable md/consistent-strong-style -- Used for example -->

- Input

  ```md
  - **double asterisks**
  - __double underscores__
  ```

- Output

  - **double asterisks**
  - __double underscores__

<!-- eslint-enable md/consistent-strong-style -- Re-enable -->

#### 2-5-3. Strikethrough

Wrap it with the `~~` symbol.

<!-- eslint-disable md/consistent-delete-style -- Used for example -->

- Input

  ```md
  - ~~double tildes~~
  ```

- Output
  - ~~double tildes~~

<!-- eslint-enable md/consistent-delete-style -- Re-enable -->

#### 2-5-4. Mixed

All the content explained above can be mixed and used.

<!-- eslint-disable md/consistent-delete-style -- Used for example -->

- Input

  ```md
  - ~~***Mixed***~~
  ```

- Output
  - ~~***Mixed***~~

<!-- eslint-enable md/consistent-delete-style -- Re-enable -->

### 2-6. Blockquotes

This expresses a 'Blockquote<sup>Blockquotes</sup>' that is converted into a `<blockquote>` tag.

Use the `>` symbol, and nested Blockquotes<sup>Nested Blockquotes</sup> can be created.

Other Markdown elements can be included inside a blockquote. (headings, lists, code blocks, and so on)

- Input

  ```md
  > This is a first blockquote.
  > > This is a second blockquote.
  > > > This is a third blockquote.
  ```

- Output

  > This is a first blockquote.
  > > This is a second blockquote.
  > > > This is a third blockquote.

- Input

  ```md
  > ### This is H3
  >
  > - List
  >
  >   ```JavaScript
  >   code
  >   ```
  ```

- Output

  > ### This is H3
  >
  > - List
  >
  >   ```js
  >   code
  >   ```
  >

### 2-7. Lists

This expresses 'Lists<sup>Lists</sup>' that are converted into `<ol>`, `<ul>`, and `<li>` tags.

An item that starts with `1.` is converted into `<ol>`, and an item that starts with `-` is converted into `<ul>`. At this time, ordered lists and unordered lists can be mixed and used.

Sub-lists can be written through indentation.

#### 2-7-1. Ordered Lists

Use numbers(`0, 1, 2, 3, ...`) and a period(`.`). At this time, it can start from `0.` or `1.`.

The shape changes when indented. (Based on GitHub<sup>GitHub</sup>: numbers, Roman numerals, alphabetical order)

No matter what number is entered, the order is defined in ascending order.

- Input

  ```md
  1. first
      1. first of first
      2. second of first
  2. second
  3. third
  ```

- Output(written with indentation in the current Markdown document, so it starts with Roman numerals rather than numbers.)

  1. first
      1. first of first
      2. second of first
  2. second
  3. third

- Input

  ```md
  1. first
      1. first of first
      1. second of first
  3. third
  2. second
  ```

- Output

  1. first
      1. first of first
      1. second of first
  3. third
  2. second

#### 2-7-2. Unordered Lists

Use the `-`, `*`, and `+` symbols.

The shape changes when indented.

They can also be mixed and used.

- Input

  ```md
  - red
    - green
      - blue
  * red
    * green
      * blue
  + red
    + green
      + blue
  ```

<!-- eslint-disable md/consistent-unordered-list-style -- Used for example -->

- Output

  - red
    - green
      - blue
  * red
    * green
      * blue
  + red
    + green
      + blue

<!-- eslint-enable md/consistent-unordered-list-style -- Used for example -->

- Input

  ```md
  * step 1
    - step 2
      + step 3
        + step 4
  ```

<!-- eslint-disable md/consistent-unordered-list-style -- Used for example -->

- Output

  * step 1
    - step 2
      + step 3
        + step 4

<!-- eslint-enable md/consistent-unordered-list-style -- Used for example -->

### 2-8. Links, Anchor

This expresses 'Links, Anchor<sup>Links, Anchor</sup>' that are converted into `<a>`.

At this time, a 'link' opens in the current tab by default, but it can also be made to open in a new tab.

#### 2-8-1. External Links

The content of `"description Optional Title"` can be omitted, and it appears when the mouse is placed over the link<sup>Hovering</sup>.

```md
[Title Title](Link Link "Description Optional Title")
```

- Input

  ```md
  - [Google](https://www.google.com)
  - [Naver](https://www.naver.com)

  - [Google](https://www.google.com "Hello Google")
  - [Naver](https://www.naver.com "Hello Naver")
  ```

- Output

  - [Google](https://www.google.com)
  - [Naver](https://www.naver.com)

  - [Google](https://www.google.com "Hello Google")
  - [Naver](https://www.naver.com "Hello Naver")

#### 2-8-2. Reference Links

The content of `"description Optional Title"` can be omitted, and it appears when the mouse is placed over the link<sup>Hovering</sup>.

```md
[Title Title][Reference Reference]

[Reference Reference]: Link Link "Description Optional Title"
```

- Input

  ```md
  - [Google][GoogleRef1]
  - [Naver][NaverRef1]

  - [Google][GoogleRef2]
  - [Naver][NaverRef2]

  [GoogleRef1]: https://www.google.com
  [NaverRef1]: https://www.naver.com

  [GoogleRef2]: https://www.google.com "Hello Google"
  [NaverRef2]: https://www.naver.com "Hello Naver"
  ```

- Output

  - [Google][GoogleRef1]
  - [Naver][NaverRef1]

  - [Google][GoogleRef2]
  - [Naver][NaverRef2]

  [GoogleRef1]: https://www.google.com
  [NaverRef1]: https://www.naver.com

  [GoogleRef2]: https://www.google.com "Hello Google"
  [NaverRef2]: https://www.naver.com "Hello Naver"

- Input

  ```md
  - A [reference link] can also be used as-is inside a document.

  [reference link]: https://www.naver.com "Hello Naver"
  ```

- Output

  - A [reference link] can also be used as-is inside a document.

  [reference link]: https://www.naver.com "Hello Naver"

#### 2-8-3. Automatic Links

URLs or E-mail Address<sup>E-mail Address</sup> values in a document automatically form links even without angle brackets(`<>`).

You can also put a URL or email address inside angle brackets(`<>`, Angle Brackets).

- Input

  ```md
  - external link: https://www.google.com
  - external link: <https://www.google.com>
  - email link: address@example.com
  - email link: <address@example.com>
  ```

- Output
  <!-- markdownlint-disable-next-line -->
  - external link: https://www.google.com
  - external link: <https://www.google.com>
  <!-- markdownlint-disable-next-line -->
  - email link: address@example.com
  - email link: <address@example.com>

#### 2-8-4. Internal(Hash) Links

##### 2-8-4-1. Markdown style

```md
[Title Title](#heading-to-move-to)
```

When writing the link inside parentheses, spaces must be connected with `-`, and all English letters must be written in lowercase.

- Input

  ```md
  - [1. About Markdown](#1-about-markdownmarkdown)

  - [2. How to Use Markdown(Syntax) - Standard Markdown Syntax](#2-how-to-use-markdownsyntax---standard-markdown-syntax)

  - [3. How to Use Markdown(Syntax) - GFM(GitHub Flavored Markdown)](#3-how-to-use-markdownsyntax---gfmgithub-flavored-markdown)
  ```

- Output

  - [1. About Markdown](#1-about-markdownmarkdown)

  - [2. How to Use Markdown(Syntax) - Standard Markdown Syntax](#2-how-to-use-markdownsyntax---standard-markdown-syntax)

  - [3. How to Use Markdown(Syntax) - GFM(GitHub Flavored Markdown)](#3-how-to-use-markdownsyntax---gfmgithub-flavored-markdown)

##### 2-8-4-2. HTML style

- Input

  ```html
  <a id="bookmark">bookmark</a>

  [Link to bookmark](#bookmark)
  ```

- Output

  <a id="bookmark">bookmark</a>

  [Link to bookmark](#bookmark)

### 2-9. Images

This expresses 'Images<sup>Images</sup>' that are converted into `<img>`.

The syntax is similar to Link<sup>Link</sup>, but `!` must be added at the front.

#### 2-9-1. Markdown style

##### 2-9-1-1. External Images

```md
![Alt text Alt text](Link Link)
```

```md
![Alt text Alt text](Link Link "Description Optional Title")
```

- Input

  ```md
  ![Seokchon Lake Rubber Duck](1.png)
  ![Seokchon Lake Rubber Duck](1.png "RubberDuck")
  ```

- Output

  ![Seokchon Lake Rubber Duck](/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true)
  ![Seokchon Lake Rubber Duck](/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true "RubberDuck")

##### 2-9-1-2. Reference Images

```md
![Alt text Alt text][Reference Reference]

[Reference Reference]: Link Link
```

```md
![Alt text Alt text][Reference Reference]

[Reference Reference]: Link Link "Description Optional Title"
```

- Input

  ```md
  ![Seokchon Lake Rubber Duck][Ref1]
  ![Seokchon Lake Rubber Duck][Ref2]

  [Ref1]: 1.png
  [Ref2]: 1.png "RubberDuck"
  ```

- Output
  ![Seokchon Lake Rubber Duck][Ref1]
  ![Seokchon Lake Rubber Duck][Ref2]

  [Ref1]: /apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true
  [Ref2]: /apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true "RubberDuck"

##### 2-9-1-3. Add a Link to an Image

Wrap the Markdown style image syntax code with link syntax code.

- Input

  ```md
  [![Seokchon Lake Rubber Duck](1.png "RubberDuck Wiki")](https://en.wikipedia.org/wiki/Rubber_duck)
  ```

- Output
  [![Seokchon Lake Rubber Duck](/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true "RubberDuck Wiki")](https://en.wikipedia.org/wiki/Rubber_duck)

#### 2-9-2. HTML style

Because Markdown style has no size adjustment feature, use the HTML `<img src="" width="" height="" title="" alt=""></img>` tag.

- Input

  ```html
  <img src="1.png" width="450px" height="300px" title="px(pixel) size setting" alt="RubberDuck"></img><br>
  <img src="1.png" width="40%" height="30%" title="%(ratio) size setting" alt="RubberDuck"></img>
  ```

- Output

  <img src="/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true" width="450px" height="300px" title="px(pixel) size setting" alt="RubberDuck"></img><br>
  <img src="/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true" width="40%" height="30%" title="%(ratio) size setting" alt="RubberDuck"></img>

### 2-10. Code

This expresses 'Code<sup>Code</sup>' that is converted into `<pre>` and `<code>` tags.

It mainly uses the <code>\`</code>(backtick) symbol.

#### 2-10-1. Inline

Wrap the code to emphasize with the <code>\`</code>(backtick) symbol to express 'Inline<sup>Inline</sup>' code.

- Input

  ```md
  A background image can be inserted into an element with the `background` or `background-image` property.
  ```

- Output

  A background image can be inserted into an element with the `background` or `background-image` property.

#### 2-10-2. Block

##### 2-10-2-1. Markdown style

###### 2-10-2-1-1. Use the <code>\`</code>(backtick) or `~` symbol

Enter <code>\`</code> or `~` at least three times and specify the language(code) name to express a code 'Block<sup>Block</sup>'. The number of <code>\`</code>(`~`) characters at the start and end of the code block must be the same.

On GitHub<sup>GitHub</sup>, specifying the language(code) name enables [Syntax highlighting](https://docs.github.com/en/github/writing-on-github/creating-and-highlighting-code-blocks#syntax-highlighting).

- Input

  ````md
  ```java
  public class BootSpringBootApplication {
    public static void main(String[] args) {
      System.out.println("Hello World!");
    }
  }
  ```
  ````

- Output

  ```java
  public class BootSpringBootApplication {
    public static void main(String[] args) {
      System.out.println("Hello World!");
    }
  }
  ```

###### 2-10-2-1-2. Use indentation

When an indentation of '4 spaces' or 'one tab' is encountered, conversion begins and continues until a non-indented line is encountered.

- Input

  ```md
  This is a normal paragraph:

      This is a code block.

  end code block.
  ```

<!-- eslint-disable md/consistent-code-style -- Used for example -->

- Output

  This is a normal paragraph:

      This is a code block.

  end code block.

<!-- eslint-enable md/consistent-code-style -- Used for example -->  

If there is no blank line, a problem occurs where it is not recognized properly.

- Input

  ```md
  This is a normal paragraph:
      This is a code block.
  end code block.
  ```

- Output

  This is a normal paragraph:
      This is a code block.
  end code block.

##### 2-10-2-2. HTML style

Use the `<pre><code>{code}</code></pre>` tag.

- Input

  ```html
  <pre>
  <code>
  public class BootSpringBootApplication {
    public static void main(String[] args) {
      System.out.println("Hello World!");
    }
  }
  </code>
  </pre>
  ```

- Output

  <pre><code>public class BootSpringBootApplication {
    public static void main(String[] args) {
      System.out.println("Hello World!");
    }
  }</code></pre>

### 2-11. Backslash(`\`) Escapes

When expressing special characters, put `\` before the character to be displayed and write the special character.

For example, the backtick(<code>\`</code>) symbol has the syntax feature used to express code, so to output the backtick symbol itself, the symbol must be escaped<sup>Escape</sup>.

If you write it together with the `\` symbol as below, you can output the backtick symbol. Also, to emphasize inline code with <code>\`</code>, you can use the `<code>` tag.

- Input

  ```md
  - \`
  - <code>\`</code>
  ```

- Output

  - \`
  - <code>\`</code>

- Input

  ```md
  * special character not output
  - special character not output

  \* special character output

  \- special character output
  ```

<!-- eslint-disable md/consistent-unordered-list-style -- Used for example -->

- Output

  * special character not output
  - special character not output

  \* special character output

  \- special character output

<!-- eslint-enable md/consistent-unordered-list-style -- Used for example -->

- Input

  ```md
  \*literal asterisks\*

  \#hash mark\#

  \[square brackets\]

  \|vertical bar\|
  ```

- Output

  \*literal asterisks\*

  \#hash mark\#

  \[square brackets\]

  \|vertical bar\|

### 2-12. Table

This expresses a 'Table<sup>Table</sup>' that is converted into a `<table>` tag.

To distinguish headers and cells, use at least three `-`(Hyphen/Dash) symbols.

While distinguishing headers and cells, the `:`(Colons) symbol can align the content inside a cell(column/cell).

- `---`, `:---`: left aligned
- `:---:`: center aligned
- `---:`: right aligned

The `|`(Vertical Bar) symbols at the far left and far right can be omitted. (However, depending on the platform, omission may not be possible.)

- Input

  ```md
  Create table

  |Header1|Header2|Header3|Header4|
  |---|---|---|---|
  |Cell1|Cell2|Cell3|Cell4|
  |Cell5|Cell6|Cell7|Cell8|
  |Cell9|Cell10|Cell11|Cell12|

  Header1|Header2|Header3|Header4
  ---|---|---|---
  Cell1|Cell2|Cell3|Cell4
  Cell5|Cell6|Cell7|Cell8
  Cell9|Cell10|Cell11|Cell12
  ```

- Output

  Create table

  |Header1|Header2|Header3|Header4|
  |---|---|---|---|
  |Cell1|Cell2|Cell3|Cell4|
  |Cell5|Cell6|Cell7|Cell8|
  |Cell9|Cell10|Cell11|Cell12|

  Header1|Header2|Header3|Header4
  ---|---|---|---
  Cell1|Cell2|Cell3|Cell4
  Cell5|Cell6|Cell7|Cell8
  Cell9|Cell10|Cell11|Cell12

- Input

  ```md
  Table alignment

  Header1|Header2|Header3
  :---|:---:|---:
  Left|Center|Right
  Cell1|Cell2|Cell3
  Cell4|Cell5|Cell6
  Cell7|Cell8|Cell9
  ```

- Output

  Table alignment

  Header1|Header2|Header3
  :---|:---:|---:
  Left|Center|Right
  Cell1|Cell2|Cell3
  Cell4|Cell5|Cell6
  Cell7|Cell8|Cell9

### 2-13. Raw HTML

Instead of Markdown syntax, HTML can be used directly.
As with adding the underline `<u></u>` seen earlier, it is useful when using features not supported by Markdown syntax. However, note that not every HTML tag is supported.

## 3. How to Use Markdown(Syntax) - GFM(GitHub Flavored Markdown)

The syntax mentioned above is standard Markdown syntax that applies commonly to all Markdown. GitHub<sup>GitHub</sup> additionally supports advanced Markdown syntax such as checklists and alert boxes, and this is called GFM<sup>GitHub Flavored Markdown</sup>. However, be careful because this syntax does not guarantee the same behavior on platforms other than GitHub.

### 3-1. Check Lists

Write `- [x]` at the start of a line to mark a completed list item.

Write `- [ ]` at the start of a line to mark an incomplete list item.

Several features other than emphasis can be used inside a checklist.

Generally, this is a feature supported only by GitHub and a few other platforms. (It is not a feature supported by every platform.)

- Input

  ```md
  - [x] this is a completed item
  - [ ] this is an incompleted item
  ```

- Output

  - [x] this is a completed item
  - [ ] this is an incompleted item

- Input

  ```md
  - [x] @mentions, #refs, [links](link), **formatting**, and <del>tags</del> supported
  ```

- Output

  - [x] @mentions, #refs, [links](link), **formatting**, and <del>tags</del> supported

### 3-2. Math Expressions

This feature is supported only by a few platforms, including GitHub. (Since May 19, 2022, GitHub officially provides math expression rendering.)

GitHub's math expression rendering feature uses ***MathJax***, an open-source display engine based on JavaScript<sup>JavaScript</sup>. ***MathJax*** supports a wide range of ***LaTeX*** macros and useful accessibility extensions.

The rendered result supports ***CHTML*** or ***SVG*** formats. In other words, if a math expression is written in ***LaTex*** syntax, it is converted into HTML or ***SVG*** form.

Also, diagram rendering can be used in ***GitHub Issues***, ***GitHub Discussions***, ***Pull Request***, ***Wiki***, and Markdown files.

It can be written in `inline` or `block` form.

#### 3-2-1. Inline

Wrap the expression with dollar(`$`) symbols.

For reference, to display a dollar sign as a character on the same line as a math expression, you must escape `$` that is not a delimiter so the line renders correctly. (Add a `\` symbol before an explicit `$` inside a math expression.)

- Input

  ```md
  This sentence uses `$` delimiters to show math inline: $\sqrt{3x-1}+(1+x)^2$
  ```

- Output

  This sentence uses `$` delimiters to show math inline: $\sqrt{3x-1}+(1+x)^2$

#### 3-2-2. Block

It is used to add a math expression separately from surrounding text.

To add a math expression as a block, start a new line and delimit the expression with double dollar(`$$`) symbols.

- Input

  ```md
  **The Cauchy-Schwarz Inequality**

  $$
  \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
  $$
  ```

- Output

  **The Cauchy-Schwarz Inequality**

  $$
  \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
  $$

### 3-3. Alert Boxes

Alert boxes(warnings) are a Markdown extension based on blockquote syntax that can be used to emphasize important information. On GitHub, alert boxes are displayed with unique colors and icons to indicate the importance of content.

It is recommended to use alert boxes only when important, and to limit them to one or two per document to prevent reader overload. Also, alert boxes should not be placed consecutively and cannot be nested inside other elements.

To add an alert box, use a special blockquote line that specifies the type, followed by the alert box information in a standard blockquote. Five types of alert boxes can be used.

- Input

  ```md
  > [!NOTE]
  > Useful information that users should know, even when skimming content.

  > [!TIP]
  > Helpful advice for doing things better or more easily.

  > [!IMPORTANT]
  > Key information users need to know to achieve their goal.

  > [!WARNING]
  > Urgent info that needs immediate user attention to avoid problems.

  > [!CAUTION]
  > Advises about risks or negative outcomes of certain actions.
  ```

- Output

> [!NOTE]
> Useful information that users should know, even when skimming content.
<!-- -->
> [!TIP]
> Helpful advice for doing things better or more easily.
<!-- -->
> [!IMPORTANT]
> Key information users need to know to achieve their goal.
<!-- -->
> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.
<!-- -->
> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

### 3-4. Summary and Collapse

You can use summary and collapse features with the `<details>` and `<summary>` tags.

- Input

  ```html
  <details>
    <summary>Click to view details</summary>
    Write detailed content here.
  </details>
  ```

- Output

  <details>
    <summary>Click to view details</summary>
    Write detailed content here.
  </details>

### 3-5. Emoji

You can add emoji to text by entering `:EMOJICODE:`(colon, emoji name, colon) in order.

When you enter `:`, a suggested emoji list is displayed. The list is filtered as you type, so when you find the emoji you want, press the <kbd>Tab</kbd> or <kbd>Enter</kbd> key to complete the highlighted result.

To see the full list of available emoji and codes, refer to [Emoji-Cheat-Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md).

- Input

  ```md
  @octocat :+1: This PR looks great - it's ready to merge! :shipit:
  ```

- Output

  @octocat :+1: This PR looks great - it's ready to merge! :shipit:

### 3-6. Supported Color Models

In issues, pull requests, and discussions, you can use backticks(<code>\`</code>) to represent colors within a sentence. Supported color models inside backticks(<code>\`</code>) display a visualization of the color.

The currently supported color models are as follows.

Color|Syntax|Example|Output
:---:|:---:|:---:|:---:
HEX|`#RRGGBB`|`#0969DA`|![Screenshot of rendered GitHub Markdown showing how the HEX value #0969DA is displayed as a blue circle.](/apps/blog/public/images/posts/everything-about-markdown/4.webp?raw=true)
RGB|`rgb(R,G,B)`|`rgb(9, 105, 218)`|![Screenshot of rendered GitHub Markdown showing how the RGB value 9, 105, 218 is displayed as a blue circle.](/apps/blog/public/images/posts/everything-about-markdown/5.webp?raw=true)
HSL|`hsl(H,S,L)`|`hsl(212, 92%, 45%)`|![Screenshot of rendered GitHub Markdown showing how the HSL value 212, 92%, 45% is displayed as a blue circle.](/apps/blog/public/images/posts/everything-about-markdown/6.webp?raw=true)

- Input

  ```md
  The background color is `#ffffff` for light mode and `#000000` for dark mode.
  ```

- Output

  The background color is `#ffffff` for light mode and `#000000` for dark mode.

> [!NOTE]
>
> - In supported color models, there can be no leading or trailing spaces inside backticks(<code>\`</code>).
> - Color visualization is supported only in issues, pull requests, and discussions.

### 3-7. People and Team Mentions

You can mention people or teams on GitHub by entering a user name or team name with `@`. This triggers a notification and can draw that user's attention to the conversation. Also, when editing a note that mentions a user name or team name, that user receives a notification.

> [!NOTE]
>
> Notifications for mentions are received only if the user has read permission for the repository, and if the repository is owned by an organization, that user is a member of the organization.

When a parent team is mentioned, members of child teams also receive notifications, simplifying communication with multiple user groups.

When you enter the `@` symbol, a list of users or teams is displayed in the project. The list is filtered as you type, so when you find the name of the user or team you are looking for, you can use the <kbd>arrow</kbd> keys to select it and press the <kbd>Tab</kbd> or <kbd>Enter</kbd> key to complete the name. For a team, entering `@organization/team-name` subscribes every member of that team to the conversation.

Autocomplete results are limited to repository collaborators and other participants in the thread.

- Input

  ```md
  @github/support What do you think about these updates?
  ```

- Output

  ![Screenshot of rendered GitHub Markdown showing the team mention "@github/support" rendered as bold, clickable text.](/apps/blog/public/images/posts/everything-about-markdown/8.webp?raw=true)

### 3-8. Issue and Pull Request References

You can enter `#` to display a list of suggested issues and pull requests within the repository. Enter an issue or pull request number or title to filter the list, then press the <kbd>Tab</kbd> or <kbd>Enter</kbd> key to complete the highlighted result.

Reference Type | Raw Reference | Short Link
---|---|---
Issue or pull request URL | `https://github.com/jlord/sheetsee.js/issues/26` | `#26`
`#` and issue or pull request number | `#26` | `#26`
`GH-` and issue or pull request number | `GH-26` | `GH-26`
`Username/Repository#` and issue or pull request number | `jlord/sheetsee.js#26` | `jlord/sheetsee.js#26`
`Organization_name/Repository#` and issue or pull request number | `github-linguist/linguist#4039` | `github-linguist/linguist#4039`

### 3-9. Footnotes

You can add footnotes to content using square bracket(`[]`) syntax.

- Input

  ```md
  Here is a simple footnote[^1].

  A footnote can also have multiple lines[^2].

  [^1]: My reference.
  [^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
    This is a second line.
  ```

- Output

  Here is a simple footnote[^1].

  A footnote can also have multiple lines[^2].

  [^1]: My reference.
  [^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
    This is a second line.

> [!NOTE]
>
> - The position of a footnote in Markdown does not affect where the footnote is rendered. You can write a footnote immediately after a reference to the footnote, and the footnote is still rendered at the bottom of the Markdown.
>
> - Footnotes are not supported in wiki.

### 3-10. Section Links

Hover over a section heading to link directly to a section of the rendered file.

![section link](/apps/blog/public/images/posts/everything-about-markdown/10.webp?raw=true)

### 3-11. Relative Links

By defining relative links and image paths in a rendered file, readers can move to other files in the repository.

A relative link is a link based on the current file. For example, if there is an additional information file at the root of the repository and another file in `docs/CONTRIBUTING.md`, the relative link to `CONTRIBUTING.md` in the additional information is as follows.

```md
[Contribution guidelines for this project](docs/CONTRIBUTING.md)
```

GitHub automatically converts relative links or image paths depending on the current branch, so links or paths always work. The path of the link is based on the current file. Links that start with `/` are based on the repository root. All relative link operands such as `./` and `../` can be used.

Link text must be on one line. The example below does not work.

```md
[Contribution
guidelines for this project](docs/CONTRIBUTING.md)
```

Relative links are easier for users who clone the repository to use. Absolute links may not work in a clone of the repository. It is recommended to use relative links to reference other files in the repository.

## 4. Markdown Editors

### 4-1. Notepad

Markdown has easy syntax, so there is no problem working in Notepad without using an editor. However, to improve work speed, it is recommended to use an editor such as ***VScode***. Editors render Markdown in real time and show it on screen, and they can be used quickly with shortcuts and similar features.

### 4-2. VScode

#### 4-2-1. Original

Even if no extension is installed in ***VScode***, you can use the Markdown Preview<sup>Preview</sup> provided by default. However, some features supported by GitHub Markdown cannot be used, and the theme style is also slightly different.

#### 4-2-2. Extension: Dark GitHub Markdown Pack

This is an extension pack that lets you use Markdown Preview<sup>Preview</sup> in ***VScode*** with GitHub's Markdown theme style. Below is the description of that extension pack.

- Dark GitHub Markdown Preview - CSS that makes the Markdown preview match GitHub's dark themed style.
- Markdown Emoji - Adds :emoji: support to the Markdown preview.
- Markdown Checkboxes - Adds - [ ] tasklist support to the Markdown preview
- Markdown yaml Preamble - Adds support for rendering the yaml frontmatter as a table. Be sure to set "markdown.previewFrontMatter": "show"

### 4-3. Typora

This is a free editor with an attractive clean design. It can reduce work time by automatically completing syntax that would otherwise be typed manually. It is recommended for people using Markdown for the first time.

## 5. Markdown Usage

Markdown can be used anywhere it is supported. Examples include blog services such as ***GitHub*** and ***Velog***, ***WordPress***, ***Slack***, ***Notion***, ***Discord***, and so on.

It can also be applied to ***MS Word***. It is used by pasting the contents of the View<sup>View</sup> area as-is or loading a file generated by HTML export and similar methods. Because ***MS Word*** reads the applied Heading<sup>Heading</sup> and applies it to the table of contents, a table of contents can be created easily.

And because each Markdown syntax is converted into HTML and output together with CSS, the shape displayed on screen differs depending on the style configuration of the place where it is used. Therefore, it should be used according to the meaning of each syntax, not according to the visible style.
