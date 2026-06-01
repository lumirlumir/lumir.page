---
title: '***VScode***와 ***Visual Studio***의 차이점'
description: '***VScode***는 경량 코드 편집기로 확장성을 제공하며, ***Visual Studio***는 모든 기능을 갖춘 통합 개발 환경(IDE)으로 무겁고 속도가 느리지만 ***.NET*** 및 ***C*** 계열 언어 개발에 최적화되어 있어 사용 목적에 따라 선택이 필요하다.'
created: '2024-05-26'
updated: '2024-05-26'
categories:
  - 'vscode'
references: []
---

***VScode***(Visual Studio Code)와 ***Visual Studio***의 차이점을 알아보자.

## 1. ***VScode*** {#1-vscode}

***VScode***는 <u>무료</u> 코드 편집기(Code Editor)이다. ***Visual Studio***에 비해 훨씬 빠르고 가볍다. 기본적으로 아무런 확장(***Extension***)을 설치하지 않을 경우, 메모장과 같은 단순한 기능만을 제공한다. 대신, 필요한 기능은 확장을 추가 설치해서 사용할 수 있으며, 이를 통해 ***IDE*** 수준에 근접 가능하다.

***VScode***는 ***Electron Shell***, ***Node.js***, ***TypeScript*** 등을 이용해 구축된다. 데스크톱 컴퓨터에서 실행되며, ***Windows***, ***Mac OS***, ***Linux***에서 이용 가능하다. ***Node.js***, ***JavaScript***, ***TypeScript*** 등의 지원 기능이 내장되어 있으며, ***.NET***, ***Unity*** 등의 런타임과 ***C++***, ***C#***, ***Java***, ***Python***, ***PHP***, ***Go*** 등 다양한 언어 확장 프로그램으로 구성된 풍부한 생태계가 존재한다.

***VScode***는 프로그래밍 언어와 확장 프로그램에 따라 다르게 설정되는 다양한 기능들이 존재한다. 구문 강조, 괄호 일치, 변수 및 메소드 등의 Intellisense(코드 문법 자동 완성), 디버깅, 린팅, 멀티 커서 편집, 매개변수 힌트, 코드 탐색, 리팩토링, ***Git*** 지원 등이 있다. 이 중 많은 부분은 ***Visual Studio***에서 가져와 수정한 것이다.

### 1-1. 장점 {#1-1-vscode-advantages}

- 속도가 빠르고 가볍다.
- 확장성이 좋다.

### 1-2. 단점 {#1-2-vscode-disadvantages}

- 확장성이 좋은 대신 개별 설정이 어렵다.
- 추가적인 개발 환경을 설정해 주어야 한다.

## 2. ***Visual Studio*** {#2-visual-studio}

모든 기능을 갖추고 있는 통합 개발 환경(***IDE***, Integrated Development Environment)이다. ***Windows*** 및 ***Mac OS***에서 이용 가능하다. 소프트웨어 개발, 분석, 디버깅, 테스트, 협업, 배치 등을 지원한다. ***Web***, ***Mobile***, ***Desktop***용을 ***.NET***으로 개발할 수 있으며, ***Unity***, ***Azure***, ***Docker*** 지원이 기본으로 포함되어 있다.

***.NET*** 및 ***C***계열 언어 개발에 최적화 되어있고 편리한 부분들도 많지만, ***IDE***이기 때문에 프로그램 자체가 무겁다. 큰 프로젝트일수록 ***VScode***에 비해 로딩 시간이 월등히 오래 걸린다.

### 2-1. 장점 {#2-1-visual-studio-advantages}

- 완성품이다. (추가적인 개발 환경을 설정할 필요가 없다.)
- ***.NET*** 및 ***C***계열 언어 개발에 최적화 되어있다.

### 2-2. 단점 {#2-2-visual-studio-disadvantages}

- 속도가 느리고 무겁다.

## 3. ***VScode*** vs ***Visual Studio*** {#3-vscode-vs-visual-studio}

그렇다면, ***VScode***와 ***Visual Studio*** 중 어떤 것을 사용해야 할까?

특정 소프트웨어 개발 작업에 ***VScode***와 ***Visual studio*** 중에서 어떤 것을 사용할지 결정하는 것은, ***Editor***와 ***IDE*** 중 하나를 선택하는 것처럼 간단하리라 생각하겠지만 실상은 그렇지 않다. ***VScode***는 여러 프로그래밍 언어에 쓸 수 있는 ***IDE***에 매우 가깝게 구성할 수 있기 때문이다.

따라서, 필자는 본인의 개발 환경에서 가장 많이 사용되는 ***IDE/Editor***를 사용하는 것을 추천한다. 이는 국가(한국, 미국 등), 직무(Web, Mobile, AI, Game 등), 언어(C++, Java, JavaScript 등) 별로 선호되는 ***IDE/Editor***가 서로 다르기 때문이다. 또, 매년 순위가 변동되기도 하고 더 좋은 ***IDE/Editor***가 등장할 때도 있으니, 구글에서 현재 혹은 이전 연도의 가장 인기 많은 ***IDE/Editor***를 검색해 보고 활용하자. (단, 2024년 기준으로 거의 모든 국가, 직무, 언어에서 ***VScode***가 점유율 1위를 차지하고 있다.)
