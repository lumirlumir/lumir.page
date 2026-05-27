---
title: '***Github Issues***란 무엇인가?'
description: 'GitHub의 **Issues**는 버그 수정, 일정, 아이디어 등을 관리할 수 있는 도구로, **Projects**와 통합되어 시각화 및 자동화 기능을 제공하며, **Commit**과 연동하여 이슈를 추적할 수 있도록 돕는다.'
created: '2024-03-21'
updated: '2024-07-21'
categories:
  - 'git'
references:
  - 'https://docs.github.com/ko/issues'
---

***Issues***란, ***Issues Tracking***을 할 수 있도록 ***Github***에서 제공하는 도구이다. 자체 기능인 ***Issues***, ***Projects***, ***Insights*** 등의 다양한 시각화 도구들을 함께 제공한다.

***Asana***, ***Jira*** 등과 같은 협업 관리 툴이라고 생각하면 된다.

하지만, 가장 큰 차이점은 ***Github***의 ***Issues***는 ***Github*** ***Repository***와 직접 통합되어 개발자들이 코드 작업과 함께 ***Issues***를 추적하고 해결하기에 훨씬 유용하다는 점이다.

***Issues***에는 지속적으로 새로운 기능들이 추가되며, 더러 베타 버전인 기능들이 추가되었다가 삭제 되는 경우도 존재한다. 문서의 내용이 계속해서 수정될 가능성이 존재하기에, ***Github*** 공식 문서의 링크와 해당 파트의 내용을 간략히 정리해 두었다.

정확한 내용은 공식 문서를 참조하는 것이 가장 확실하다. 공식 문서의 내용을 살펴보면, ***Issues***는 ***Github***상의 다양한 기능들과 강력한 연동이 가능하며, ***Issues*** 내에서도 다양한 기능들이 제공되는 것을 알 수 있다.

## 1. ***Issues***(문제) {#1-issues}

***Issues***에서는 버그 등의 수정사항에 대한 내용 뿐만 아니라, 일정, 아이디어, 피드백, 작업 내용, 문서 수정, 버그 관리 등등의 모든 것들을 관리할 수 있다.

***Pull Request***와 연동해서 사용할 수 있으며, ***Projects***와 연동해서 사용할 수도 있고, 심지어는 ***Workflows***를 통한 ***Issues***의 자동화도 가능하다.

### 1-1. ***Commit***과의 연동 {#1-1-linking-with-commits}

***Issues***에는 `#1`, `#2`, `#3` 등의 번호가 붙어 있다. 이를 ***Commit Message***에 `"Commit Message... #1"` 등으로 입력하면 ***Issues***에 자동으로 관련된 ***Commit***을 보여주게 된다.

## 2. ***Projects*** {#2-projects}

***Issues***가 많아지다 보면, 필연적으로 관리가 어려워진다. 수 많은 ***Issues*** 속에서 '지금 내가 해야할 일' 혹은 '팀원이 진행해야 하는 일'들을 구분하고 분류하기는 쉽지 않을 것이다.

따라서, 이러한 다양한 ***Issues***를 특정 조건에 따라 자동으로 분류하고 시각화하기 위해 ***Projects***를 사용한다. (즉, ***Projects***는 ***Issues***를 기반으로 동작한다.)

사용 방법은 테스트 용도의 ***Projects***와 ***Issues***를 생성한 뒤, 직접 이런저런 기능들을 모두 눌러보고 확인하는 것을 추천한다. ***Spreadsheet*** 기반이라 사용 설명서 없이도 대략적인 기능들을 쉽게 파악할 수 있을 것이다.

### 2-1. ***Projects***에 대해 알아보기 {#2-1-learn-about-projects}

***Projects***에 대한 개요.

### 2-2. ***Projects*** 만들기 {#2-2-create-projects}

조직 또는 사용자 ***Projects***를 만들고 복사하는 방법에 대해 설명한다. 구 버전인 ***Projects Classic***의 ***Migration*** 방법에 대해서도 설명한다.

### 2-3. ***Projects***에서 항목 관리 {#2-3-manage-items-in-projects}

***Issues***의 항목들을 ***Projects***로 끌어오는 방법에 대해 설명한다.

### 2-4. ***Field***(필드) 이해 {#2-4-understand-fields}

***Field***에 대해 설명한다.

### 2-5. Views(보기) 사용자 지정 {#2-5-customize-views}

***Table***, ***Board***, ***Roadmap*** 등의 ***Layout***에 대해 설명한다.

'프로젝트 필터링' 파트에서는 `assignee:USERNAME`, `is:STATE`, `is:TYPE`등의 ***Field***를 필터링 하는 방법에 대해 설명한다.

### 2-6. ***Projects*** 자동화 {#2-6-projects-automation}

***Projects*** 자동화에는 3가지 방법이 있다.

1. 기본 제공 자동화인 ***Projects Workflows***를 이용하는 방법.
1. ***Github API***를 이용하는 방법.
1. ***Github Workflows***를 이용하는 방법.

### 2-7. ***Insights*** 보기 {#2-7-view-insights}

***Projects***와 관련된 차트를 만들 수 있는 기능인 ***Insights***에 대해 설명한다.

### 2-8. ***Projects*** 관리 {#2-8-manage-projects}

***Projects***를 ***Public*** 혹은 ***Private***으로 변경하는 방법, ***Access*** 관리, ***Template*** 관리 등에 대해 설명한다.

## 3. ***Tracklists***(작업 목록) {#3-tracklists-task-lists}

글 작성 시기 기준으로, '작업 목록은 프라이빗 베타 버전이며 변경될 수 있습니다. 현재 베타 온보딩을 일시 중지했습니다.' 라고 되어 있다. 현재, <code>```[tasklist]</code> 문법을 이용한 세부 태스크 관리는 불가능하다.

대신, ***Github Markdown***의 `- []` 체크리스트 기능만을 이용하여 세부 태스크를 관리하는 것은 가능하다. 제목 바로 아래쪽에서 몇개의 태스크를 진행했는지 상세 진행내역을 확인할 수 있다.

![6 tasks done](/apps/blog/public/images/posts/what-is-github-issues/1.webp?raw=true)

![tasklist](/apps/blog/public/images/posts/what-is-github-issues/2.webp?raw=true)

## 4. ***Projects Classic*** {#4-projects-classic}

'***4. Projects Classic***'은 이전의 ***Github*** 프로젝트 관리 시스템으로, 옛날(구) 버전을 나타낸다.

'***2. Projects***'에서 설명한 ***Projects***는 ***Github Projects***의 최신 버전으로, 훨씬 더 다양하고 유연한 기능을 제공한다.

***Github***에서는, 구 버전의 ***Projects Classic***을 최신 버전의 ***Projects***로 ***Migration***하는 방법들을 제공한다.

현재는, 이미 하나 이상의 ***Projects Classic***이
있는 사용자에 대해서만 신규 ***Projects Classic***을 만들 수 있게 제한되어 있다. 즉, ***Projects Classic***을 쓰던 사람은 계속해서 사용하거나 새로 만들 수 있지만, 신규 사용자는 ***Projects Classic***을 새로 만드는 것이 제한되고 최신 버전인 ***Projects***만 만들 수 있다는 것이다.

따라서, ***Projects***를 처음 사용하려는 사람들은 최신 버전인 ***Projects***를 사용해야만 한다.

## 5. ***Labels*** and ***Milestones*** {#5-labels-and-milestones}

***Repository***의 ***Issues*** 탭에 있는 ***Labels***와 ***Milestones***에 대해 설명한다. 크게 어려운 내용은 없으니 공식 문서를 잘 읽어보기 바란다.
