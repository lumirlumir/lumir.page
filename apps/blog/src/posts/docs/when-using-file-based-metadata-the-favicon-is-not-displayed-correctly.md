---
title: 'Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상'
description: 'Favicon이 Next.js의 App Router에서 변경되지 않는 문제는 브라우저의 캐싱 때문일 수 있으며, 개발자 도구를 통해 캐시 비우기 및 강력 새로고침을 수행하면 해결될 가능성이 높다.'
created: '2024-09-18'
updated: '2024-09-18'
categories:
  - 'nextjs'
references:
  - 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons'
  - 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata#file-based-metadata'
---

Next.js의 App Router에서는 [File-based Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#file-based-metadata)를 이용하여, Favicon을 설정할 수 있다. 하지만, `app` 혹은 `src/app` 등 공식 문서에서 언급된 정상 경로에 Favicon 파일을 두었음에도, 해당 Favicon으로 변경되지 않는 문제가 발생한다.

Favicon은 브라우저가 강하게 캐싱하는 대표적인 파일이기에, 해당 문제는 기존 브라우저에 캐싱되어 있는 데이터로 인해 갱신된 데이터가 정상 반영되지 않았을 가능성이 높다.

## 해결 방안 {#solution}

1. 개발자 도구(<kbd>F12</Kbd> 또는 <kbd>Ctrl(Command)</kbd>+<kbd>Shift</kbd>+<kbd>i</kbd>)를 연다.
1. 브라우저 좌측 상단의 새로고침 버튼을 마우스 좌측 버튼으로 길게 누른다.
1. '캐시 비우기 및 강력 새로고침'을 클릭한다.
1. 갱신된 Favicon이 정상 표시된다.

## 참고 {#references}

- 개발자 도구를 켜지 않은 경우의 툴팁.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/1.webp)

- 개발자 도구를 켠 경우의 툴팁.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/2.webp)

- 개발자 도구를 켠 상태로, 마우스 좌측 버튼을 길게 누르고 있는 경우.

    ![alt text](/apps/blog/public/images/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly/3.webp)
