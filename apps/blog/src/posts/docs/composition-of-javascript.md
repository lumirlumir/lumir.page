---
title: '자바스크립트(***JavaScript***)의 구성'
description: '웹 브라우저에서의 JavaScript는 `window` 객체를 중심으로, ECMAScript(코어), DOM, BOM 세 가지 하위 요소로 구성되며, 각각 웹 페이지의 내용과 브라우저 기능을 제어한다.'
created: '2024-05-08'
updated: '2024-06-12'
categories:
  - 'javascript'
references:
  - 'https://developer.mozilla.org/ko/'
  - 'https://boycoding.tistory.com/2'
  - 'https://velog.io/@imok-_/JavaScript-DOM-BOM-%EC%9D%B4%EB%9E%80'
  - 'https://idlecomputer.tistory.com/40'
  - 'https://postlude.github.io/2020/02/16/javascript-object/'
  - 'https://bigtop.tistory.com/48'
  - 'https://cbw1030.tistory.com/46'
---

웹 브라우저(클라이언트) 환경에서의 ***JavaScript***는, `window`***<sup>1</sup>*** 란 최상위 객체와, ***코어(JavaScript, ECMAScript)<sup>2</sup>***, ***문서 객체 모델(Document Object Model, DOM)<sup>3</sup>***, ***브라우저 객체 모델(Browser Object Model)<sup>4</sup>*** 이란 3가지 하위 객체 요소들로 구성된다.

> <u>***호스트 환경 (Host Environment)***</u>
>
> ***JavaScript***가 돌아가는 플랫폼을 호스트(Host)라 한다. 호스트는 웹 브라우저, 웹 서버, 심지어는 커피 머신이 될 수 있다. 각 플랫폼은 해당 플랫폼에 특정되는 기능을 제공하는데, ***JavaScript*** 명세서에선 이를 호스트 환경(Host Environment) 이라 부른다.
>
> 호스트 환경은 코어(***ECMAScript***)에 더하여 플랫폼에 특정되는 객체와 함수를 제공한다. 웹 브라우저는 웹페이지를 제어하기 위한 수단을 제공하고, ***Node.js***는 서버 사이드 기능을 제공한다.
>
> 따라서, 코어는 항상 공통적으로 존재하지만, 호스트에 따라 ***DOM***과 ***BOM***은 존재하지 않을 수도 있다.

아래 그림은 호스트 환경이 웹 브라우저(클라이언트)일 때 사용할 수 있는 기능을 개괄적으로 보여준다.

![window, JavaScript, DOM, BOM](/apps/blog/public/images/posts/composition-of-javascript/1.webp?raw=true)

## 1. `window` 객체 {#1-window-object}

***JavaScript***의 <u>최상위(루트) 객체</u>이자, 모든 객체가 소속된 <u>전역(***Global***)</u> 객체이다. 어디서든 접근이 가능하다고 하여 전역 객체라 불리며, 객체화된 수많은 구성 요소들로 이루어져 있다.

![window object](/apps/blog/public/images/posts/composition-of-javascript/2.webp?raw=true)

### 1-1. 역할 {#1-1-window-object-role}

`window` 객체는 2가지 역할을 한다.

1. ***JavaScript***의 전역 객체이다.
1. 브라우저 창을 의미하고, 이를 제어할 수 있는 ***Property***와 ***Method***를 제공한다.

    ```js
    console.log(window.innerWidth); // 창의 너비
    console.log(window.innerHeight); // 창의 높이
    window.close(); // 창을 염
    window.open(); // 창을 닫음
    ```

### 1-2. 특징 {#1-2-window-object-characteristics}

`window` 객체의 ***Property***나 ***Method***는 `window`를 생략하고 바로 사용할 수 있다.

ex. `alert('My Message')`

객체를 만든다는 것은 결국 `window` 객체의 ***Property***를 만드는 것과 같다. 전역 변수와 함수가 사실은 `window` 객체의 ***Property***와 ***Method***인 것이다. 따라서, `a`에 접근하는 방법은 아래와 같다.

```js
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
```

```js
var a = {id: 1};
console.log(a.id); // 1
console.log(window.a.id); // 1
```

## 2. 코어(***JavaScript***, ***ECMAScript***) {#2-javascript-ecmascript-core}

> ***JavaScript***의 핵심 기능

문법, 타입, 선언문, 키워드, 예약어, 연산자, 객체 등 언어의 저수준에 해당하는 부분이다.

***ECMAScript***는 웹 브라우저에 종속되지 않으며, 웹 브라우저는 ***ECMAScript***를 구현하는 '호스트 환경'일 뿐이다.

이러한 '호스트 환경(브라우저, ***Node.js***, ***Adobe Flash*** 등)'은 ***ECMAScript***를 기본적으로 구현하고, ***DOM***, ***BOM***등과 같은 확장을 제공한다.

## 3. 문서 객체 모델(Document Object Model, ***DOM***) {#3-document-object-model-dom}

> 웹 페이지 콘텐츠를 조작하는 ***Method***와 ***Interface***

브라우저가 웹 문서를 이해할 수 있도록 구성된 것으로, ***XML***을 ***HTML***에서 사용할 수 있도록 확장된 Application Programming Interface(***API***)이다.

***HTML***과 ***JavaScript***를 연결해주는 역할로 ***JavaScript***를 이용해 각 요소에 접근하며, ***HTML*** 태그를 동적으로 제어한다.

`document` 객체는 페이지의 기본 '진입점' 역할을 한다.

브라우저가 ***HTML*** 페이지를 로드하는 과정에서, ***Tag***등의 웹 페이지 내 모든 콘텐츠들을 객체로 나타낸다.

***DOM***은 전체페이지를 노드 계층(Node Tree) 구조의 객체들로 변환하며, ***HTML*** 페이지의 각 부분을 각기 다른 데이터를 포함하는 다양한 타입의 노드로 표현한다.

![Document Object](/apps/blog/public/images/posts/composition-of-javascript/3.webp?raw=true)

### 3-1. ***DOM***의 구조 (The ***HTML*** ***DOM*** tree of objects) {#3-1-dom-structure}

![The HTML DOM tree of objects](/apps/blog/public/images/posts/composition-of-javascript/4.webp?raw=true)

노드 종류 | 역할
:--- | :---
Document Node | 트리의 최상위에 존재하는 <u>***HTML*** 문서 전체</u>
Element Node | `<p>`, `<div>` 등의 <u>***Tag***(태그)</u>
Attribute Node | `<input>` 등 태그 안의 `name`, `value` 등의 <u>***Attribute***(속성)</u>
Text Node | ***HTML*** 문서의 <u>***Text***(텍스트)</u>
Comment Node | ***HTML*** 문서의 <u>***Comment***(주석)</u>

## 4. 브라우저 객체 모델(Browser Object Model, ***BOM***) {#4-browser-object-model-bom}

> 브라우저와 상호작용하는 ***Method***와 ***Interface***

`document` 이외의 모든 것을 제어하기 위해, 브라우저(호스트 환경)가 제공하는 추가 객체를 나타낸다. 웹 페이지 내용을 제외한, 웹 브라우저 창에 포함된 모든 객체 요소를 의미한다.

***BOM***을 이용하면 브라우저 창에 접근하고 조작할 수 있다.

### 4-1. `navigator` {#4-1-navigator}

`navigator` 객체는 브라우저와 운영체제에 대한 정보를 제공한다. 객체에는 다양한 ***Property***가 있는데, 가장 잘 알려진 ***Property***는 현재 사용 중인 브라우저 정보를 알려주는 `navigator.userAgent`와 브라우저가 실행 중인 운영체제(***Windows***, ***Linux***, ***Mac*** 등) 정보를 알려주는 `navigator.platform`이다. 이는 주로 호환성 문제를 해결하기 위해 사용된다.

![navigator object](/apps/blog/public/images/posts/composition-of-javascript/5.webp?raw=true)

### 4-2. `screen` {#4-2-screen}

`screen` 객체는 화면에 대한 정보를 알려준다. 너비(`width`), 높이(`height`), 픽셀(`pixelDepth`), 컬러(`colorDepth`), 화면 방향(`orientation`), 작업표시줄을 제외한 너비와 높이(`availWidth`, `availHeight`) 등이 있다. 화면 크기에 따라 다른 동작을 하고 싶을 때 사용한다.

![screen object](/apps/blog/public/images/posts/composition-of-javascript/6.webp?raw=true)

### 4-3. `location` {#4-3-location}

`location` 객체는 ***URL*** 주소에 대한 정보를 제공하여, 현재 ***URL***을 읽을 수 있게 해주고 새로운 ***URL***로 변경(redirect)할 수 있게 해준다.

![location object](/apps/blog/public/images/posts/composition-of-javascript/7.webp?raw=true)

### 4-4. `frames` {#4-4-frames}

`frames` 객체는 아래 설명과 같다.

Returns the `window` itself, which is an ***array-like object***, listing the direct sub-frames of the current `window`.

### 4-5. `history` {#4-5-history}

`history` 객체는 브라우저의 세션 기록, 즉 현재 페이지를 불러온 탭 또는 프레임의 방문 기록을 조작할 수 있는 방법을 제공한다.

![history object](/apps/blog/public/images/posts/composition-of-javascript/8.webp?raw=true)

### 4-6. `XMLHttpRequest` {#4-6-xmlhttprequest}

`XMLHttpRequest`(***XHR***) 객체는 서버와 상호작용할 때 사용한다. ***XHR***을 사용하면 페이지의 새로고침 없이도 ***URL***에서 데이터를 가져올 수 있다. 이를 활용하면 사용자의 작업을 방해하지 않고 페이지의 일부를 업데이트할 수 있다.
