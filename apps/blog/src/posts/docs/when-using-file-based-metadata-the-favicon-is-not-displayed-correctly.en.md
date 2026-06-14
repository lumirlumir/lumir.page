---
title: 'When Using File-based Metadata in Next.js, the Favicon Is Not Reflected Correctly'
description: 'A problem where the Favicon does not change in the Next.js App Router may be caused by browser caching, and it is likely to be solved by emptying the cache and performing a hard reload through developer tools.'
created: '2024-09-18'
updated: '2024-09-18'
categories:
  - 'nextjs'
references:
  - 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons'
  - 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata#file-based-metadata'
---

In the Next.js App Router, you can set a Favicon using [File-based Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#file-based-metadata). However, even when the Favicon file is placed in a normal path mentioned in the official documentation, such as `app` or `src/app`, a problem occurs where it does not change to that Favicon.

Because the Favicon is a representative file that browsers cache strongly, this problem is highly likely to be caused by updated data not being reflected correctly due to data cached in the existing browser.

## Solution

1. Open developer tools(<kbd>F12</Kbd> or <kbd>Ctrl(Command)</kbd>+<kbd>Shift</kbd>+<kbd>i</kbd>).
1. Press and hold the refresh button at the top left of the browser with the left mouse button.
1. Click 'Empty Cache and Hard Reload'.
1. The updated Favicon is displayed correctly.

## References

- Tooltip when developer tools are not open.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/1.webp)

- Tooltip when developer tools are open.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/2.webp)

- When developer tools are open and the left mouse button is being held down.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/3.webp)
