---
title: '`raw.githubusercontent.com`과 `cdn.jsdelivr.net`의 차이점'
description: '`raw.githubusercontent.com`은 GitHub의 파일을 원본 그대로 제공하는 반면, `cdn.jsdelivr.net`은 최적화된 콘텐츠를 빠르고 안정적으로 제공하는 CDN 서비스로, 각각의 목적과 기능이 다르다.'
created: '2024-08-02'
updated: '2024-08-02'
categories:
  - 'git'
references:
  - 'https://www.jsdelivr.com/'
  - 'https://dreamcoding.tistory.com/43'
  - 'https://computer-science-student.tistory.com/297'
  - 'https://kyulee.tistory.com/entry/CDN-Github-jsdelivr'
  - 'https://tesseractjh.tistory.com/209'
  - 'https://korband.tistory.com/6'
---

GitHub에서 제공하는 `raw.githubusercontent.com`과 대표적인 GitHub CDN(Content Delivery Network) 서비스인 `cdn.jsdelivr.net`의 차이점은 그들의 목적, 동작, 그리고 제공하는 서비스의 방식에서 비롯된다.

## 1. `raw.githubusercontent.com` {#1-raw-githubusercontent}

### 1-1. 목적 및 사용 사례 {#1-1-raw-githubusercontent-purpose-and-use-cases}

- `raw.githubusercontent.com`은 GitHub의 파일을 원본 그대로 제공하는 URL이다. 주로 GitHub 리포지토리에 저장된 파일의 원본 내용에 접근할 때 사용한다.
- AWS의 S3와 같이, GitHub를 데이터 저장소 용도로 활용할 수 있게 해준다.
- 예를 들어, 특정 리포지토리의 `README.md` 파일 혹은 이미지 파일의 내용을 직접 읽고 싶을 때 사용한다.

### 1-2. 동작 방식 {#1-2-raw-githubusercontent-how-it-works}

- 해당 URL을 통해 접근하면, GitHub의 저장소에 있는 파일의 원본 데이터를 그대로 제공한다.
- 주로 개발자들이 스크립트나 설정 파일, 데이터 파일 등에 접근할 때 유용하다.

### 1-3. 제공 서비스 {#1-3-raw-githubusercontent-services}

- 단순히 파일의 원본 데이터를 제공하는 역할을 한다.
- 캐싱, 로드 밸런싱, 콘텐츠 최적화 등의 고급 기능은 제공하지 않는다.

### 1-4. URI 구조 {#1-4-raw-githubusercontent-uri-structure}

```txt
https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{file_path}
```

> [!IMPORTANT]
>
> `raw.githubusercontent.com`을 이용한 방법은 Repository가 Public일 경우에만 가능하다.

## 2. `cdn.jsdelivr.net`(CDN) {#2-cdn-jsdelivr-net-cdn}

### 2-1. 목적 및 사용 사례 {#2-1-cdn-jsdelivr-purpose-and-use-cases}

- CDN은 전 세계에 분산된 서버 네트워크를 통해, 지리적 제약 없이 전 세계 사용자들에게 콘텐츠를 빠르고 안정적으로 제공하기 위한 시스템이다.
- 주로 웹사이트, 비디오 스트리밍, 소프트웨어 배포, 대용량 파일 제공 등에 사용한다.
- 먼 지역의 사용자들에게 안정된 서비스 환경을 제공해야 하는 경우에도 사용한다. 예를 들어, NC, 카카오게임즈 같은 온라인 게임 기업들은 CDN을 활용하여 북미나 유럽까지 서비스를 제공한다.

### 2-2. 동작 방식 {#2-2-cdn-jsdelivr-how-it-works}

- 사용자가 요청한 콘텐츠를 지리적으로 가까운 서버에서 제공하여 지연 시간을 줄이고 로드 속도를 향상시킨다.
- 서버와 사용자 사이의 물리적인 거리를 줄여, 콘텐츠 로딩에 소요되는 시간을 최소화 한다.
- 콘텐츠를 캐싱하여 동일한 요청이 반복될 때 원본 서버에 부하를 줄이고 빠르게 응답할 수 있다.
- 예를 들어, 웹 페이지의 이미지, CSS 파일, JavaScript 파일 등을 효율적으로 제공하여 웹사이트의 성능을 개선한다.

### 2-3. 제공 서비스 {#2-3-cdn-jsdelivr-services}

- 콘텐츠 캐싱: 자주 요청되는 데이터를 캐싱하여 빠르게 제공.
- 로드 밸런싱: 트래픽을 여러 서버에 분산시켜 서버 과부하를 방지.
- 보안 기능: DDoS 방어, SSL 인증서 관리 등.
- 성능 최적화: 압축, 이미지 최적화, 네트워크 최적화 등을 통해 로드 속도 향상.

### 2-4. URI 구조 {#2-4-cdn-jsdelivr-uri-structure}

```txt
https://cdn.jsdelivr.net/gh/{owner}/{repo}@{branch}/{file_path}
```

> [!IMPORTANT]
>
> `cdn.jsdelivr.net`은 12시간마다 캐시 데이터를 갱신하므로, 파일에 변동사항이 있어도 실시간 반영이 되지 않는다.

## 3. 주요 차이점 요약 {#3-key-differences-summary}

1. 원본 데이터 제공 vs 최적화된 콘텐츠 제공

    - `raw.githubusercontent.com`는 GitHub 리포지토리의 파일을 원본 그대로 제공.
    - `cdn.jsdelivr.net`(CDN)은 콘텐츠를 최적화하고 캐싱하여 빠르고 안정적으로 제공.

1. 단순 접근 vs 고급 기능 제공

    - `raw.githubusercontent.com`는 단순한 파일 접근 방법.
    - `cdn.jsdelivr.net`(CDN)은 캐싱, 로드 밸런싱, 보안, 성능 최적화 등의 고급 기능 제공.

1. 주 사용 목적

    - `raw.githubusercontent.com`는 주로 개발자가 특정 파일의 원본 내용에 접근할 때 사용.
    - `cdn.jsdelivr.net`(CDN)은 웹 콘텐츠, 미디어 파일, 소프트웨어 배포 등의 고속 전송이 필요한 다양한 경우에 사용.
