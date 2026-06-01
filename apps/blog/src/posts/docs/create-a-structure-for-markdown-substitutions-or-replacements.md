---
title: '마크다운<sup>Markdown</sup> 치환자 구조를 만들어보자'
description: '깃허브 마크다운 API와 치환자 구조를 활용해 MDX처럼 확장성 있는 정적 블로그 환경을 만들며, 치환자 구조와 정규표현식을 통한 마크다운 전처리로 커스텀 컴포넌트를 적용한다.'
created: '2024-10-26'
updated: '2026-04-03'
categories:
  - 'markdown'
  - 'javascript'
references: []
---

현재 블로그는 깃허브에서 사용하는 '깃허브 마크다운 문법<sup>GFM, GitHub Flavored Markdown</sup>'을 블로그 포스팅을 위한 마크다운 문서에 그대로 사용할 수 있도록 설계하였다.

이를 위해 [`markdown-it`](https://www.npmjs.com/package/markdown-it), [`remark`](https://www.npmjs.com/package/remark) 등의 마크다운 파서<sup>Parser</sup>를 이용하지 않고, 깃허브<sup>GitHub</sup>의 [마크다운 API](https://docs.github.com/ko/rest/markdown/markdown?apiVersion=2022-11-28)를 이용한다.

위와 같은 패키지들은 마크다운을 HTML로 변환하는 목적에는 충실하지만, 깃허브 마크다운 문법과 정확히 호환되는 HTML 구조를 반환해주지는 않는다. (이는 [`remark-gfm`](https://www.npmjs.com/package/remark-gfm) 등의 GFM 플러그인<sup>Plugin</sup>을 사용해도 마찬가지다. 깃허브 마크다운 API에 비해 다소 호환성이 떨어진다.)

깃허브 마크다운에서 공식적으로 사용하는 정확한 HTML 구조를 받아와야 하는 이유는 [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css) 패키지를 이용하기 위함이다. 해당 패키지는 깃허브 마크다운과 동일한 UI를 구성해주는 CSS 패키지이다. 마크다운을 HTML로 변환하였을 때 HTML 상의 `class` 등에 차이가 발생한다면, [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css)가 HTML과 CSS를 정확히 렌더링하지 못하기 때문이다. 이는 결국 깃허브 상의 마크다운 UI와 블로그 상의 마크다운 UI의 차이를 가져온다. 원하지 않는 결과물이라도 나름대로 포장해서 잘 쓸 수는 있겠지만, 그건 의도된 바가 아니다.

물론, [MDX](https://mdxjs.com/)를 사용할 수도 있다. 대부분의 SSG<sup>Static Site Generation</sup> 기반의 블로그들은 MDX를 많이 활용할 것이다. 현재 메인테이너로 활동하고 있는 [ko.react.dev](https://github.com/reactjs/ko.react.dev) 레포지토리에서도 그렇고, [Next.js](https://github.com/vercel/next.js/tree/canary/docs) 공식 문서에서도 그렇고, MDX는 정말 많이 활용된다.

이로 인해, 처음에는 MDX를 사용할까 고민이 많았다. 리액트<sup>React</sup> 생태계에 익숙한지라, 리액트 컴포넌트를 보다 잘 활용할 수 있고 확장성도 좋은 MDX가 상당히 매력적으로 다가왔기 때문이다.

고민 끝에 내린 결정은 깃허브 마크다운 API를 이용해서 직접 마크다운을 HTML로 변환한 다음 사용하자는 것이었다. 자주 사용하던 문법이라 손에 익었다는 이유가 가장 컸고, 요즘은 하루종일 깃허브에서 사는지라 깃허브 마크다운 문법에 너무나 익숙하다는 것이 그 이유였다.

하지만, 깃허브 마크다운 API를 사용할 때의 가장 큰 단점은 확장성이 떨어진다는 것이다. MDX는 리액트<sup>React</sup> 컴포넌트를 이용하는 만큼 확장성이 정말 뛰어나다. 그럼 깃허브 마크다운 API를 이용하면서도 MDX 처럼 확장성을 뛰어나게 하는 방법이 없을까? 여기서 떠오른 개념이 바로 '마크다운 치환자' 구조이다. (물론 공식적인 개념은 아니고 여러 곳에서 자주 사용하는 개념을 내 블로그 개발에도 적용한 것이다.)

이를 위해서는 현재 블로그가 어떻게 마크다운 문서를 HTML로 변환하고, 이를 JSX 컴포넌트로 변환하는지에 대한 일련의 흐름을 이해하는 것이 중요하다. (이 블로그를 만들 때, 코드 구조에 상당히 신경을 많이 썼기에 실제 로직은 훨씬 방대하다. 그렇기에 여기서는 꼭 필요한 내용만을 다루겠다.)

## 1. 마크다운을 JSX로 변환하기까지 {#1-convert-markdown-to-jsx}

마크다운 문서를 JSX로 변환하는 일련의 과정을 나열해보면 아래와 같다.

1. 마크다운 파일을 `utf-8` 형식으로 읽는다.<sup>「과정1」</sup>
1. 깃허브 마크다운 API에 POST 요청을 보내 해당 마크다운 파일을 HTML 문자열로 변환한다.<sup>「과정2」</sup>
1. [`html-react-parser`](https://github.com/remarkablemark/html-react-parser) 패키지를 이용하여 깃허브 마크다운 API를 통해 반환된 HTML 문자열을 JSX로 변환한다.<sup>「과정3」</sup>

위와 같은 일련의 과정을 거친다. 다만, 여기서의 문제점은 나에게 필요한 커스텀 컴포넌트들을 어떻게 적용할 것인가 하는 것이다.

잠깐 고민해 보면, 커스텀 컴포넌트들을 적용하기 위해 3가지 정도의 방법을 고민해 볼 수 있다.

1. 마크다운 문서에 치환자 구조를 만들어두고, 「과정1」과 「과정2」 사이에서 문자열 형식의 마크다운 문서 내부에 존재하는 치환자를 내가 원하는 형식으로 변경한다.
1. 「과정2」와 「과정3」 사이에 [`cheerio`](https://www.npmjs.com/package/cheerio) 등의 패키지를 이용하여, 문자열 형식의 HTML을 내가 원하는 구조로 조작한 뒤 [`html-react-parser`](https://github.com/remarkablemark/html-react-parser)에 인자로 전달한다.
1. 「과정3」의 `html-react-parser`에서 제공하는 기능인 `replace`를 이용하여 특정 HTML 태그<sup>Tag</sup>를 내가 원하는 리액트<sup>React</sup> 컴포넌트로 변환한다.

현재 블로그 개발에서 위 방법을 모두 사용하는 것은 아니지만, 지난날에 다른 패키지들을 개발하면서 모두 한번쯤은 다뤄본 방식들이다. 위 방식들 중 하나만 고집해서 사용할 필요도 없고, 각각의 장ㆍ단점이 존재하기에, 상황에 맞게 사용하면 좋을 것이다.

이번 글에서는 이 중 '치환자' 구조를 다뤄 볼 것이다.

## 2. 치환자를 활용해보자 {#2-use-replacements}

### 2-1. 치환자란? {#2-1-what-is-replacement}

그럼 치환자란 무엇일까? 단순하다. [MathJax](https://www.mathjax.org/) 및 [KaTex](https://katex.org/)등의 LaTex 문법을 지원하는 패키지에서 `$ ... $` 형식을 통해 수식을 작성한 경험이 있다면 이미 치환자를 활용해본 적이 있는 것이다. 여기서의 치환자는 `$` 기호 사이의 내용을 특정 함수<sup>Function</sup>나 모듈<sup>Module</sup> 등에 전달하여 수학 수식으로 변환한 뒤, 활용하는 것이다.

자바스크립트<sup>JavaScript</sup> 템플릿 리터럴<sup>Template Literal</sup>에서의 `${}` 및 [SCSS](https://sass-lang.com/)에서의 `#{}` 등의 문자열 보간<sup>String Interpolation</sup>이 이와 유사한 개념이라 생각하면 된다. (물론 정확히 일치하는 개념이라 말하기는 어렵다.)

그럼 "치환자를 활용하는 구조가 자주 사용되는가?" 라고 물어보면, "자주 사용된다." 라고 할 수 있다. 현재 블로그의 치환자 구조를 사용하기 위해 살펴본 여러 치환자 구조들은 아래와 같다.

#### 2-1-1. MathJax 및 Katex {#2-1-1-mathjax-and-katex}

```md
**The Cauchy-Schwarz Inequality**
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

아래 2가지 종류의 치환자를 통해 각각 인라인<sup>Inline</sup>과 블록<sup>Block</sup> 형식의 디스플레이<sup>Display</sup>를 결정한다.

```txt
$ ... $
```

```txt
$$ ... $$
```

#### 2-1-2. [react.dev](https://github.com/reactjs/react.dev) 공식 문서 {#2-1-2-react-dev-official-docs}

```md
## Using React for a part of your existing page {/*using-react-for-a-part-of-your-existing-page*/}

Let's say you have an existing page built with another technology (either a server one like Rails, or a client one like Backbone), and you want to render interactive React components somewhere on that page. That's a common way to integrate React--in fact, it's how most React usage looked at Meta for many years!

You can do this in two steps:

1. **Set up a JavaScript environment** that lets you use the [JSX syntax](/learn/writing-markup-with-jsx), split your code into modules with the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax, and use packages (for example, React) from the [npm](https://www.npmjs.com/) package registry.
2. **Render your React components** where you want to see them on the page.

The exact approach depends on your existing page setup, so let's walk through some details.
```

아래 치환자를 통해 URI Fragment를 설정한다. (URI Fragment란, `https://www.example.com#fragment`에서 `#fragment` 부분을 뜻한다.)

```txt
{/* ... */}
```

#### 2-1-3. 티스토리 블로그 {#2-1-3-tistory-blog}

```html
<li><a href="[##_tag_link_##]" class="[##_tag_class_##]">[##_tag_name_##]</a></li>
```

아래 치환자를 통해 HTML 어트리뷰트<sup>Attribute</sup>를 설정한다.

```txt
[## ... ##]
```

#### 2-1-4. 깃허브 액션<sup>GitHub Actions</sup> {#2-1-4-github-actions}

```yml
- name: Set up cache
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

아래 치환자를 통해 변수의 값<sup>Value</sup>을 전달한다.

```txt
${{ ... }}
```

### 2-2. 그럼 어떤 치환자를 사용해야 할까? {#2-2-which-replacement-to-use}

사실, 어떤 치환자를 사용할지 결정하는 것은 개인 혹은 조직의 결정에 달렸다. 다만, 일반적인 마크다운 문법, 예를 들어 강조를 위해 사용하는 `**` 기호 혹은 제목<sup>Heading</sup>에 사용하는 `##` 기호 등을 사용하면, 치환자와 마크다운 문법 간 충돌이 발생할 수 있으므로 이런 부분들은 피해서 사용하는 것이 좋겠다.

위 예시로 제시한 치환자 형태들은 일반적인 마크다운 문법과 충돌 염려가 없기에, 그대로 가져다가 활용해도 좋을 것이다.

또, 치환자를 굳이 하나의 형태만 가져다 쓸 필요는 없다. 일관적인 치환자의 형태만 관리할 수 있으면, 여러개의 치환자 기호를 혼합하여 쓰던, 특정 접두사<sup>Prefix</sup> 혹은 접미사<sup>Suffix</sup>를 활용하는 방식으로 확장성 있는 치환자를 만들던 크게 상관 없다.

### 2-3. 치환자는 어떻게 변환할까? {#2-3-how-to-transform-replacements}

이제 치환자 구조를 결정했으면, 치환자를 실제로 내가 원하는 값으로 변경할 차례이다. 어떻게 하면 좋을까? 가장 간단한 방법은 자바스크립트<sup>JavaScript</sup>의 `replace` 함수와 정규표현식의 캡처 그룹<sup>Capture Group</sup>을 이용하는 것이다.

예를 들어, 리액트<sup>React</sup> 공식 문서에서 사용하는 `{/* ... */}` 형태의 치환자를 이용한다 가정하자. `{/* ... */}` 치환자 내부의 문자열만 추출하여 가공하려면 어떻게 해야할까?

```js
const example = '{/* Make This Sentence Lower Case */}';
const exampleProcessed = example.replace(/\{\/\*\s*(.+?)\s*\*\/\}/, (_, p1) =>
  p1.toLowerCase(),
);

console.log(exampleProcessed); // 'make this sentence lower case'
```

위와 같은 방법을 통해 치환자 내부의 문자열을 추출하여 가공할 수 있을 것이다. 위에서는 간단한 예시를 위해 문자열을 일괄적으로 소문자로만 변경하였지만, 실제 개발 환경에서는 더욱 복잡한 로직을 집어 넣을 수도 있을 것이다.

다만, 마크다운 문서를 통째로 위 로직에 집어 넣을 경우 변환 시간이 생각 보다 오래걸릴 수도 있으니, 필요한 부분에만 변환 로직을 적용하여 최적화를 진행하는 것이 중요하다.

### 3. 마치며 {#3-closing}

간단한 예시와 함께 마크다운 치환자를 어떻게 만들고 활용할지에 대해 살펴보았다. 위 내용들은 일종의 마크다운 전처리<sup>Preprocessing</sup> 과정이라 할 수도 있을 것이다. 이는 라이브러리 혹은 프레임워크의 사용 방법 혹은 특정 세팅이 아닌, 개발자가 직접 설계하고 흐름을 만들어나가야 하는 부분에 대한 설명으로, "이런 방법도 있구나!" 하는 참고용으로 활용해주면 좋겠다.
