# Google Fonts를 HTML에서 불러오면 왜 더 빠를까?

Moing 첫 화면의 ‘Mock’은 Pacifico라는 글꼴을 쓴다. 이 글꼴을 처음 표시하려면 브라우저는 Google에서 파일을 두 번에 걸쳐 받는다. 먼저 **글꼴 파일의 주소가 적힌 CSS**를 받고, 그 주소에서 **실제 글꼴 파일**을 받는다. [Moing의 제목 코드](../../apps/moing/src/components/title.tsx)

## 기존에는 무엇을 기다렸을까?

예전에는 Google Fonts CSS의 주소를 앱 CSS 안에 `@import`로 적어 두었다.

```css
@import 'https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Audiowide&family=Pacifico&display=swap';
```

따라서 요청 순서는 **HTML → 앱 CSS → Google Fonts CSS → 글꼴 파일**이었다. 앱 CSS를 받아 읽을 때까지는 Google Fonts CSS를 요청할 수 없었다.

## HTML로 옮기면 무엇이 달라질까?

지금은 처음 받는 HTML의 `<head>`에 링크 세 개를 둔다. [Moing의 index.html](../../apps/moing/index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Audiowide&family=Pacifico&display=swap"
/>
```

1. **`stylesheet`로 CSS를 일찍 요청한다.** Google Fonts CSS의 주소가 HTML에 바로 보인다. 그래서 브라우저는 앱 CSS와 Google Fonts CSS를 동시에 요청할 수 있다.
2. **`preconnect`로 서버에 미리 연결한다.** Pacifico 파일의 정확한 주소는 Google Fonts CSS를 읽어야 알 수 있지만, 파일을 보내 줄 서버가 `fonts.gstatic.com`이라는 사실은 이미 안다. 브라우저는 CSS를 기다리는 동안 그 서버의 주소를 찾고 보안 연결을 맺을 수 있다. `crossorigin`은 나중에 글꼴을 요청할 때 그 연결을 그대로 쓸 수 있게 한다.

첫 방문에서는 이렇게 **CSS를 기다리는 시간과 서버에 연결하는 시간이 겹쳐** 글꼴을 더 일찍 받을 수 있다. 재방문 때 글꼴이 브라우저에 이미 저장돼 있으면 차이는 작을 수 있다. [web.dev의 웹폰트 로딩 가이드](https://web.dev/articles/font-best-practices#preconnect_to_critical_third-party_origins)

## 네트워크 워터폴에서 어떤 대기가 줄어들까?

네트워크 워터폴은 각 요청이 언제 시작하고 끝나는지 시간순으로 보여 준다. Moing의 요청 순서를 단순화하면 다음과 같다.

```text
변경 전
HTML → 앱 CSS → Google Fonts CSS → 글꼴 파일

변경 후
HTML ┬─ 앱 CSS
     ├─ Google Fonts CSS → 글꼴 파일
     └─ 글꼴 서버에 미리 연결 (preconnect)
```

줄어든 것은 **Google Fonts CSS가 앱 CSS를 기다리는 한 단계**다. 실제 글꼴 파일의 주소는 여전히 Google Fonts CSS를 읽어야 알 수 있다. `preconnect` 덕분에 브라우저는 그동안 서버에 연결해 두고, 주소를 알아냈을 때 준비된 연결로 파일을 요청할 수 있다.

---

네. **네트워크 워터폴에서 폰트가 앞선 요청을 기다리는 단계가 하나 줄어서** 더 빨리 받을 수 있습니다.

- **변경 전 `@import`** — `HTML → 앱 CSS → Google Fonts CSS → 글꼴 파일`
- **변경 후 `<link rel="stylesheet">`** — `HTML → Google Fonts CSS → 글꼴 파일`. 앱 CSS는 이와 동시에 요청할 수 있습니다.

`Google Fonts CSS → 글꼴 파일` 순서는 여전히 남습니다. CSS를 읽어야 실제 글꼴 파일의 URL을 알기 때문입니다. 여기서 **`preconnect`는 그 대기 시간을 활용합니다.** CSS를 기다리는 동안 `fonts.gstatic.com`에 미리 연결해 두면, 파일 URL을 알아냈을 때 바로 요청을 보낼 수 있습니다. [web.dev의 웹폰트 로딩 가이드](https://web.dev/articles/font-best-practices#preconnect_to_critical_third-party_origins)

---

# HTML의 preconnect와 preload 차이

`preconnect`와 `preload`는 둘 다 브라우저의 리소스 로딩을 최적화하는 `<link>` 힌트지만, **미리 준비하는 대상이 다릅니다.**

- **`preconnect`**: 외부 서버와의 연결을 미리 준비합니다.
- **`preload`**: 특정 리소스를 미리 다운로드합니다.

## 1. preconnect vs preload

| 구분 | `preconnect` | `preload` |
|---|---|---|
| 목적 | 서버 연결 지연 감소 | 리소스 다운로드 시작 시점 단축 |
| 대상 | 서버(Origin) | 특정 파일(URL) |
| DNS 조회 | O | 필요하면 수행 |
| TCP 연결 및 TLS 협상 | O | 필요하면 수행 |
| 리소스 다운로드 | X | O |
| 주로 사용하는 경우 | 외부 폰트, CDN, API | 폰트 파일, 이미지, CSS 등 |

### 1.1. preconnect

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

브라우저가 해당 서버와의 연결을 미리 준비합니다.

**실행 흐름**

```text
DNS 조회
   ↓
TCP 연결
   ↓
TLS 협상
   ↓
연결 준비 완료
   ↓
나중에 리소스 요청 시 연결 재사용
```

이때 **파일 다운로드는 아직 시작하지 않습니다.**

나중에 해당 서버의 리소스가 필요해지면 이미 준비된 연결을 재사용할 수 있으므로 지연이 줄어듭니다.

### 1.2. preload

```html
<link
  rel="preload"
  href="/fonts/my-font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

브라우저가 `/fonts/my-font.woff2` 파일을 실제로 미리 요청합니다.

**실행 흐름**

```text
서버 연결 (필요한 경우)
   ↓
파일 다운로드 시작
   ↓
다운로드 완료
   ↓
실제 리소스 사용 시 재사용
```

즉, CSS에서 해당 폰트를 발견하기 전에 다운로드를 시작할 수 있습니다.

### 핵심 차이

- `preconnect`: 서버와 연결만 미리 준비
- `preload`: 실제 리소스를 미리 다운로드

---

## 2. 왜 Google Fonts는 preconnect를 사용할까?

Google Fonts는 일반적으로 다음처럼 사용합니다.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

핵심은 **Google Fonts가 CSS와 폰트 파일을 서로 다른 서버에서 제공한다는 점**입니다.

| 서버 | 역할 |
|---|---|
| `fonts.googleapis.com` | `@font-face`가 정의된 CSS 제공 |
| `fonts.gstatic.com` | 실제 `.woff2` 폰트 파일 제공 |

### 2.1. Google Fonts 로딩 과정

브라우저의 처리 과정은 다음과 같습니다.

```text
1. HTML 파싱
   │
   ├─ fonts.googleapis.com에 preconnect
   └─ fonts.gstatic.com에 preconnect
   ↓
2. Google Fonts CSS 다운로드
   │
   └─ fonts.googleapis.com
   ↓
3. CSS 파싱
   │
   └─ @font-face 규칙 확인
   ↓
4. 필요한 폰트 결정
   │
   └─ 굵기, 스타일, 문자 범위 등에 맞는 파일 선택
   ↓
5. 실제 폰트 파일 다운로드
   │
   └─ fonts.gstatic.com
       (미리 준비한 연결 재사용)
   ↓
6. 폰트 적용
```

브라우저는 Google Fonts CSS를 다운로드하고 해석하는 동안 `fonts.gstatic.com`과의 연결을 미리 준비할 수 있습니다.

따라서 실제 폰트 파일이 필요해졌을 때 연결 설정에 필요한 시간을 절약할 수 있습니다.

### 2.2. 그렇다면 preload가 더 빠르지 않을까?

필요한 폰트 파일을 정확하게 알고 있다면 `preload`가 더 유리할 수도 있습니다.

하지만 Google Fonts에는 몇 가지 특성이 있습니다.

#### 1. 폰트 파일 URL을 바로 알기 어렵다

Google Fonts를 사용할 때 일반적으로 CSS URL만 지정합니다.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

실제 폰트 파일의 URL은 Google Fonts CSS 내부에 정의되어 있습니다.

예를 들어 다음과 같은 형태입니다.

```css
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: url("https://fonts.gstatic.com/.../font.woff2") format("woff2");
}
```

따라서 실제 폰트 파일 URL을 확인하려면 Google Fonts CSS를 먼저 확인해야 합니다.

#### 2. 여러 폰트 파일이 존재할 수 있다

Google Fonts는 다음 조건에 따라 서로 다른 폰트 파일을 제공할 수 있습니다.

- 폰트 굵기 (`font-weight`)
- 폰트 스타일 (`font-style`)
- 언어별 문자 범위 (`unicode-range`)
- 브라우저 및 폰트 지원 환경

따라서 브라우저가 실제로 어떤 폰트 파일을 사용할지 미리 특정하기 어려울 수 있습니다.

#### 3. 불필요한 다운로드가 발생할 수 있다

`preload`는 지정한 리소스의 다운로드를 조기에 시작합니다.

```html
<link
  rel="preload"
  href="https://fonts.gstatic.com/.../font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

하지만 해당 폰트 파일이 실제로 사용되지 않는다면 불필요한 네트워크 요청이 발생합니다.

예를 들어 특정 언어의 폰트 파일을 미리 다운로드했지만 페이지에서 해당 문자를 사용하지 않는 경우입니다.

따라서 Google Fonts의 일반적인 사용 방식에서는 특정 폰트를 무조건 다운로드하는 것보다 **폰트 서버와의 연결을 미리 준비하는 `preconnect`가 더 범용적인 최적화 방법**입니다.

---

## 3. Google Fonts의 preconnect에 crossorigin이 붙는 이유

다음 코드를 보면 `fonts.gstatic.com`에는 `crossorigin` 속성이 있습니다.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

웹 폰트는 일반적으로 CORS 모드로 요청됩니다.

따라서 `preconnect`에서도 `crossorigin`을 지정해 실제 폰트 요청과 연결 설정이 호환되도록 합니다.

```html
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
/>
```

반면 Google Fonts CSS를 가져오는 일반적인 스타일시트 요청에는 동일한 설정이 필요하지 않으므로 `fonts.googleapis.com`에는 보통 `crossorigin`을 지정하지 않습니다.

---

## 4. 언제 preconnect와 preload를 사용해야 할까?

| 상황 | 추천 |
|---|---|
| Google Fonts CDN 사용 | `preconnect` |
| 직접 호스팅한 핵심 폰트 | `preload` |
| 첫 화면에 반드시 필요한 이미지 | `preload` 고려 |
| 외부 API 서버 연결 | `preconnect` 고려 |
| CSS가 늦게 발견하는 핵심 리소스 | `preload` 고려 |

### 직접 호스팅한 폰트라면?

직접 호스팅한 폰트는 파일 URL을 정확하게 알고 있으므로 `preload`를 사용하기 좋습니다.

```html
<link
  rel="preload"
  href="/fonts/Pretendard-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

이렇게 하면 CSS가 폰트 파일을 발견하기 전에 다운로드를 시작할 수 있습니다.

단, 실제 첫 화면에서 사용하는 중요한 폰트만 `preload`하는 것이 좋습니다.

---

## 5. 정리

**`preconnect`와 `preload`는 서로 대체 관계가 아닙니다.**

| 항목 | preconnect | preload |
|---|---|---|
| 핵심 개념 | 연결을 앞당긴다 | 다운로드를 앞당긴다 |
| 미리 준비하는 것 | 서버 연결 | 실제 리소스 |
| 파일 URL 필요 여부 | X | O |
| 리소스 다운로드 발생 | X | O |
| 대표적인 사용 사례 | Google Fonts | 자체 호스팅 폰트 |

### Google Fonts에서 preconnect를 사용하는 이유

1. Google Fonts는 CSS와 실제 폰트 파일을 서로 다른 서버에서 제공합니다.
2. 실제 폰트 파일의 URL은 CSS를 확인해야 알 수 있습니다.
3. 브라우저 환경과 문자 범위 등에 따라 필요한 폰트 파일이 달라질 수 있습니다.
4. 따라서 특정 파일을 미리 다운로드하는 것보다 폰트 서버와의 연결을 미리 준비하는 것이 범용적으로 유리합니다.

> **핵심:** `preconnect`는 서버와의 연결을 미리 준비하는 최적화이고, `preload`는 특정 파일을 미리 다운로드하는 최적화입니다. Google Fonts는 실제 폰트 파일이 동적으로 결정될 수 있기 때문에 일반적으로 `preconnect`를 사용합니다.

---

# **HTML의 prefetch와 preload 차이**

`prefetch`와 `preload`는 모두 브라우저가 리소스를 미리 다운로드하도록 하는 `<link>` 리소스 힌트입니다.

가장 큰 차이는 **리소스가 필요한 시점과 다운로드 우선순위**입니다.

- `preload`: 현재 페이지에서 곧 필요한 리소스를 미리 다운로드합니다.
- `prefetch`: 향후 페이지 이동 등에서 필요할 가능성이 있는 리소스를 미리 다운로드합니다.

## **1. prefetch vs preload**

| 구분         | `preload`           | `prefetch`            |
| ---------- | ------------------- | --------------------- |
| 목적         | 현재 페이지의 로딩 최적화      | 미래 탐색의 로딩 최적화         |
| 대상         | 현재 페이지에서 필요한 리소스    | 향후 필요할 가능성이 있는 리소스    |
| 다운로드 우선순위  | 리소스 종류(`as`)에 따라 결정 | 일반적으로 낮음              |
| 다운로드 시점    | 가능한 한 일찍            | 브라우저가 적절하다고 판단할 때     |
| 대표적인 사용 사례 | 핵심 폰트, LCP 이미지      | 다음 페이지의 HTML, JS, 이미지 |
| 다운로드 보장    | 요청을 조기에 시작하도록 지시    | 브라우저가 생략할 수 있음        |

## **2. preload**

```
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
```

`preload`는 현재 페이지에서 사용할 리소스를 브라우저가 일찍 발견하도록 합니다.

**실행 흐름**

```
HTML 파싱
   ↓
preload 발견
   ↓
폰트 다운로드 시작
   ↓
CSS에서 해당 폰트 사용
   ↓
미리 다운로드한 폰트 재사용
```

예를 들어 중요한 폰트가 CSS 내부에 선언되어 있다면, 브라우저가 CSS를 다운로드하고 해석해야 폰트 파일을 발견할 수 있습니다.

`preload`를 사용하면 이 발견 시점을 앞당겨 렌더링 지연을 줄일 수 있습니다.

단, `preload`는 리소스를 다운로드할 뿐, JavaScript를 실행하거나 CSS를 자동으로 적용하지는 않습니다.

## **3. prefetch**

```
<link rel="prefetch" href="/next-page.html" />
```

`prefetch`는 현재 페이지에 당장 필요하지 않지만, 향후 사용될 가능성이 높은 리소스를 미리 가져오도록 브라우저에 힌트를 제공합니다.

**실행 흐름**

```
현재 페이지 로딩
   ↓
prefetch 발견
   ↓
브라우저가 다운로드 여부 결정
   ↓
낮은 우선순위로 리소스 다운로드
   ↓
사용자가 다음 페이지로 이동
   ↓
캐시된 리소스 재사용 (가능한 경우)
```

예를 들어 사용자가 상품 목록 페이지에서 상품 상세 페이지로 이동할 가능성이 높다면, 다음 페이지의 리소스를 `prefetch`할 수 있습니다.

다만 `prefetch`는 브라우저에 제공하는 힌트이므로, 네트워크 상태나 캐시 정책 등에 따라 다운로드가 생략되거나 재사용되지 않을 수도 있습니다.

## **4. 실제 사용 예시**

### **현재 페이지의 핵심 이미지: preload**

```
<head>
  <link
    rel="preload"
    href="/images/hero.webp"
    as="image"
    fetchpriority="high"
  />
</head>
<body>
  <img src="/images/hero.webp" alt="메인 배너" />
</body>
```

첫 화면의 핵심 이미지가 늦게 발견될 상황이라면 `preload`를 통해 다운로드 시점을 앞당길 수 있습니다.

`fetchpriority="high"`는 이미지 요청의 우선순위를 높이기 위한 별도 속성입니다.

### **다음 페이지의 리소스: prefetch**

```
<head>
  <link rel="prefetch" href="/products/detail.js" />
</head>
<body>
  <a href="/products/123">상품 상세 보기</a>
</body>
```

사용자가 상품 상세 페이지로 이동할 가능성이 높다고 가정하고, 상세 페이지에서 사용할 JavaScript 파일을 미리 요청합니다.

실제로 다음 페이지에서 동일한 리소스를 요청하고 캐시 재사용 조건이 충족되면, 네트워크 다운로드 시간을 줄일 수 있습니다.

## **5. 주의할 점**

### **preload는 남용하면 오히려 느려질 수 있다**

`preload`를 너무 많이 지정하면 중요하지 않은 리소스가 네트워크 대역폭을 차지해 핵심 리소스의 로딩을 방해할 수 있습니다.

따라서 현재 페이지에 꼭 필요한 리소스 중, 브라우저가 늦게 발견하는 리소스를 우선 대상으로 삼는 것이 좋습니다.

### **prefetch는 다운로드 및 캐시 재사용을 보장하지 않는다**

`prefetch`에는 다음과 같은 제약이 있습니다.

- 브라우저가 요청을 실행하지 않을 수 있습니다.
- `Cache-Control` 정책에 따라 캐시 재사용이 제한될 수 있습니다.
- 다른 사이트로 이동하는 경우 캐시 파티셔닝 때문에 재사용되지 않을 수 있습니다.
- 사용자가 예상한 페이지로 이동하지 않으면 다운로드한 데이터가 낭비됩니다.

또한 `<link rel="prefetch">`는 브라우저별 지원 차이가 있습니다. 최신 브라우저에서 문서 자체를 미리 가져오려는 경우에는 **Speculation Rules API**도 고려할 수 있습니다.

## **6. preconnect, preload, prefetch 비교**

| 구분      | `preconnect` | `preload`    | `prefetch`        |
| ------- | ------------ | ------------ | ----------------- |
| 목적      | 연결 준비        | 현재 페이지 최적화   | 미래 탐색 최적화         |
| 서버 연결   | O            | O (필요 시)     | O (필요 시)          |
| 파일 다운로드 | X            | O            | O (브라우저 재량)       |
| 적용 대상   | Origin       | 현재 페이지 리소스   | 미래 페이지 리소스        |
| 핵심 효과   | 연결 지연 감소     | 리소스 발견 시점 단축 | 향후 요청의 다운로드 시간 절약 |

**핵심 정리**

- `preconnect`: **나중에 연결할 서버를 미리 준비한다.**
- `preload`: **지금 페이지에서 사용할 파일을 미리 다운로드한다.**
- `prefetch`: **다음 페이지에서 사용할지도 모르는 파일을 미리 다운로드한다.**

즉, `preload`와 `prefetch`의 핵심 차이는 단순히 다운로드 속도가 아니라, **현재 페이지를 위한 최적화인지 미래 페이지를 위한 최적화인지**에 있습니다.

### **참고 자료**

- [MDN - rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload?utm_source=chatgpt.com)
- [MDN - rel="prefetch"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prefetch?utm_source=chatgpt.com)
- [web.dev - Resource hints](https://web.dev/learn/performance/resource-hints?utm_source=chatgpt.com)
