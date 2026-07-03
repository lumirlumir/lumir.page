---
title: 'Differences between the `<b>` `<i>` ***Tag*** and the `<strong>` `<em>` ***Tag***'
description: '`<b>` and `<i>` are physical tags that only provide visual styling, while `<strong>` and `<em>` are logical, or semantic, tags that convey meaning and play an important role in web accessibility.'
created: '2024-05-22'
updated: '2024-05-26'
categories:
  - 'html'
references:
  - 'https://jootc.com/p/201807161377'
  - 'https://m.blog.naver.com/mathesis_time/222010525727'
  - 'https://www.codeit.kr/community/questions/UXVlc3Rpb246NWUzNDUyMjU4MGU1MTMzNzNkOTYyNzYy'
---

<!-- markdownlint-disable MD033 -->

The `<b>` and `<strong>` ***Tag*** emphasize a specific character or string with **bold text**, while the `<i>` and `<em>` ***Tag*** emphasize it with *italics*. If each pair of ***Tag*** did exactly the same thing, only one ***Tag*** from each pair would need to exist. However, ***HTML*** contains both kinds of ***Tag***. Then what is the difference between these two kinds of ***Tag***? Let us look at the differences between the `<b>`, `<i>` ***Tag*** and their corresponding `<strong>`, `<em>` ***Tag***.

## 1. Common Points

Both kinds of ***Tag*** emphasize a specific character or string with **bold text** or *italics*. In the table below, there is no visible difference between the `<b>` and `<strong>` ***Tag*** or between the `<i>` and `<em>` ***Tag***.

Tag | Usage Example | Result
:---: | :--- | :---:
No tag | `sample text` | sample text
`<b>` | `<b>sample text</b>` | <b>sample text</b>
`<strong>` | `<strong>sample text</strong>` | <strong>sample text</strong>
`<i>` | `<i>sample text</i>` | <i>sample text</i>
`<em>` | `<em>sample text</em>` | <em>sample text</em>

## 2. Differences

However, the intended uses of the `<b>` and `<strong>` ***Tag***, and the `<i>` and `<em>` ***Tag***, are different. To understand this, we first need to understand physical tags and logical tags.

### 2-1. Physical Tags and Logical Tags

#### 2-1-1. Physical Tags

A physical tag determines only how something appears in the web browser without adding any special meaning. You can think of it as simply specifying text style, like ***CSS***. These days, ***CSS*** tends to take over the role of physical tags, so they are used less often than in the past.

#### 2-1-2. Logical Tags (Semantic Tags)

A logical tag, or semantic tag, has meaning in the tag itself. It is a tag whose meaning matters more than its output appearance.

Its output appearance is not necessarily fixed to one form. In major browsers, the output of logical tags is almost similar, but because the browser decides how to display the tag on screen, it may be displayed differently depending on the browser.

#### 2-1-3. Summary

<br> | Physical Tag | Logical Tag
:---: | :---: | :---:
Bold text | `<b>` | `<strong>`
Italics | `<i>` | `<em>`

### 2-2. Examples

#### 2-2-1. `<b>` ***Tag***

First, the `<b>` ***Tag*** only makes text appear bold. Therefore, use the `<b>` ***Tag*** when you want to emphasize text as a style that contrasts with other text visually.

#### 2-2-2. `<strong>` ***Tag***

The `<strong>` ***Tag*** tells the browser that the text is an important part of the actual page, rather than merely a visible emphasis. In other words, when the browser interprets the `<strong>` ***Tag***, it understands it as an important part of the page, which makes a major contribution to <u>Web Accessibility</u> supported by browsers.

When a screen reader is used in the browser or operating system, the speech synthesizer tool can produce a stronger tone for the `<strong>` tag while interpreting and reading the page. This allows the text to be reconstructed as if it were actually spoken with emphasis.

## 3. Conclusion

Therefore, if you simply want text to appear bold or italic, use the `<b>` or `<i>` ***Tag***. If you want specific text to be emphasized semantically as well, use the `<strong>` or `<em>` ***Tag***.
