---
title: "GitHub's classic branch protection rules"
description: 'Branch 보호 규칙은 GitHub에서 협업 시 혼란을 방지하기 위해 특정 Branch에 대한 접근과 변경 사항을 관리하는 필수 규칙으로, PR 요구, 승인, 상태 체크 등 다양한 설정을 통해 코드 품질과 협업 효율성을 높인다.'
created: '2024-06-30'
updated: '2024-06-30'
categories:
  - 'git'
references:
  - 'https://docs.github.com/ko/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches'
  - 'https://yejipro.tistory.com/entry/Github-Branch-Protection-Rule-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0'
  - 'https://velog.io/@honey8951/github-branch-protection-rule'
  - 'https://kotlinworld.com/292#google_vignette'
---

Branch 보호 규칙(Branch Protection Rules)을 설정하는 것은 중요한 일이다. 협업에 규칙이 없다면, 각자 자신의 방식대로 일을 진행하기에 프로젝트는 엉망이 될 것이다. 인원이 적다면 큰 문제는 아니겠지만, 실무에서 적게는 2명 많게는 수십 수백명이 하나의 저장소를 관리하기에 규칙은 필수적이다. 특히 Git의 Branch는 협업을 위한 기본 토대이기에, 규칙을 정해야만 협업 시의 혼란을 방지할 수 있다.

GitHub에서는 Branch들에 대한 규칙을 지정할 수 있으며, 이를 Branch Protection Rules라 한다. 이를 이용하면, 특정 Branch가 실수로 지워지는 것을 방지하거나, PR(Pull Request)이 아닌 다른 방식으로 Commit을 추가하는 것을 막아 코드 리뷰를 강제하는 등의 작업을 할 수 있다. 주의할 점은 GitHub에 올라간 Branch들만 이 Rule의 적용을 받는다는 것이다. 즉, Local에서의 작업에는 아무런 제약이 없다.

Github -> Repository -> Settings -> Code and automation -> Branches를 통해 classic branch protection rules에 접근하자.

> 2024년 초반까지는 해당 branch protection rules가 classic이 아니었는데, 어느 순간 이름 앞에 classic이 붙어버렸다.

## 1. Branch name pattern * {#1-branch-name-pattern}

Branch 이름 패턴을 작성한다. 특정 이름 패턴을 가진 Branch에 대해 아래서 다룰 Branch Protection Rule을 적용한다.

특정 Branch 이름을 입력하거나, 와일드카드(`*`)를 사용하여 여러 Branch에 적용돠는 규칙을 만들 수 있다. 이때, `fnmatch` 문법을 사용해야 한다.

1. 하나의 Branch에만 적용.

    ex. `main` Branch에만 적용.

    ```txt
    main
    ```

1. 모든 Branch에 적용.

    ```txt
    *
    ```

1. 특정 단어로 시작하는 모든 Branch에 적용.

    ex. `feature` 접두어를 가진 모든 Branch에 적용.

    ```txt
    feature*
    ```

    ex. `feature/` 접두어를 가진 모든 Branch에 적용.

    ```txt
    feature/*
    ```

1. 특정 단어로 끝나는 모든 Branch에 적용.

    ex. `feature` 접미어를 가진 모든 Branch에 적용.

    ```txt
    *feature
    ```

1. 특정 단어가 들어간 모든 Branch에 적용.

    ex. `feature`라는 단어가 들어간 모든 Branch에 적용.

    ```txt
    *feature*
    ```

보호 규칙 우선순위는 특정 Branch의 이름을 포함하고 있을 수록 우선순위가 높게 적용된다. 특정 이름을 포함하고 있는 보호 규칙이 여러가지라면, 먼저 생성된 규칙이 우선순위가 높게 적용된다. `*`, `?`, `]` 등의 특수 문자가 포함된 경우에도 오래된 규칙이 우선순위를 가진다.

기존에 존재하는 특정 보호 규칙에 예외 사항을 추가하고 싶다면, 우선순위가 높은 새로운 보호 규칙을 추가하면 된다.

## 2. Protect matching branches {#2-protect-matching-branches}

### 2-1. Require a pull request before merging {#2-1-require-pull-request-before-merging}

> When enabled, all commits must be made to a non-protected branch and submitted via a pull request before they can be merged into a branch that matches this rule.

병합 이전에 PR을 요구한다. 해당 Branch에 Commit하기 위해서는, Local로 부터의 직접 Push가 불가능하고, 별도의 Branch를 만들어 Pull Request를 진행해야한다. 즉, Branch에 직접 Push를 할 수 없고, PR을 통해서만 반영할 수 있다는 것이다. 협업 시 Branch를 Local에서의 직접 Push로부터 보호하고, 코드 리뷰를 강제하기 위해 사용한다. 각자의 Branch(보호되지 않은)에서 작업을 한 다음, PR을 통해 공동 Branch로 코드를 반영한다.

#### 2-1-1. Require approvals {#2-1-1-require-approvals}

PR 승인에 필요한 인원수를 결정한다. 일정 이상의 인원이 승인해야 병합이 진행된다. 예를 들어, 요구 멤버가 3이면 3명의 승인이 있어야 병합이 진행된다.

#### 2-1-2. Dismiss stale pull request approvals when new commits are pushed {#2-1-2-dismiss-stale-pull-request-approvals}

> New reviewable commits pushed to a matching branch will dismiss pull request review approvals.

PR 승인 이후 새로운 코드가 추가될 때, 기존의 PR 승인을 무효화 하는지 여부를 정한다. 이는 기존의 PR 승인이 유지되면, 이전 버전으로 병합되는 문제가 발생하기 때문이다.

#### 2-1-3. Require review from Code Owners {#2-1-3-require-code-owner-review}

> Require an approved review in pull requests including files with a designated code owner.

코드 작성자에게도 리뷰를 받는지 여부를 정한다.

#### 2-1-4. Require approval of the most recent reviewable push {#2-1-4-require-latest-reviewable-push-approval}

> Whether the most recent reviewable push must be approved by someone other than the person who pushed it.

가장 최근 Push가 본인이 아닌 다른 검토자의 승인을 받는지 여부를 정한다. 이 항목이 선택된 경우, 코드를 수정한 후 다른 검토자의 승인을 받지 않고서는 병합할 수 없다. (이는 변경사항을 몰래 바꾸거나, 자신의 코드를 스스로 승인하지 못하게 하기 위해 만들어졌다.)

### 2-2. Require status checks to pass before merging {#2-2-require-status-checks-before-merging}

> Choose which status checks must pass before branches can be merged into a branch that matches this rule. When enabled, commits must first be pushed to another branch, then merged or pushed directly to a branch that matches this rule after status checks have passed.

병합 이전에 상태 테스트 통과를 요구한다. 반영되는 코드가 특정 테스트를 통과하는지 자동 검증한다. GitHub Actions를 통해 테스트를 작성할 수 있다. 테스트 결과 이상이 없을 경우에만 병합 가능하다.

#### 2-2-1. Require branches to be up to date before merging {#2-2-1-require-up-to-date-branches}

> This ensures pull requests targeting a matching branch have been tested with the latest code. This setting will not take effect unless at least one status check is enabled (see below).

병합 이전에 항상 최신 Branch 상태에서, 상태 테스트가 진행되도록 한다.

### 2-3. Require conversation resolution before merging {#2-3-require-conversation-resolution}

> When enabled, all conversations on code must be resolved before a pull request can be merged into a branch that matches this rule.

병합 이전에, PR에서 코드 리뷰를 통해 생성되는 모든 Conversation이 해결(Solved)되어야만, 병합할 수 있도록 한다.

### 2-4. Require signed commits {#2-4-require-signed-commits}

> Commits pushed to matching branches must have verified signatures.

서명(Verified)된 Commit들만 Push가 가능하다. 보통 GitHub에 GPG Key를 등록하고, 해당 Key를 가진 사람이 Commit한 경우, 서명(Verified) 표시가 나타난다.

### 2-5. Require linear history {#2-5-require-linear-history}

> Prevent merge commits from being pushed to matching branches.

선형 History를 요구한다.

1. Squash 병합이나 Rebase 병합만을 허용한다.
1. 병합된 Commit이 History에 남지 않기를 원할 때 사용한다.
1. 특정 Branch의 History 추적을 쉽게 하고 싶은 경우, Branch를 하나로 유지해야 하는 경우, Branch 모양을 단순하게 관리하고 싶은 경우에 사용한다.

### 2-6. Require deployments to succeed before merging {#2-6-require-successful-deployments}

> Choose which environments must be successfully deployed to before branches can be merged into a branch that matches this rule.

병합되기 전 배포에 성공해야 한다. Repository에 설정된 환경 중, 배포 성공을 확인할 대상을 선택할 수 있다.

### 2-7. Lock branch {#2-7-lock-branch}

> Branch is read-only. Users cannot push to the branch.

Branch를 Push가 불가능한 읽기 전용으로 만든다.

### 2-8. Do not allow bypassing the above settings {#2-8-disallow-bypassing-settings}

> The above settings will apply to administrators and custom roles with the "bypass branch protections" permission.

관리자 권한을 가진 사용자들도, 위에서 설정한 모든 규칙들을 지키지 않으면 병합할 수 없도록 한다. 즉, 관리자도 적용된 모든 규칙을 예외없이 따르게 하는 설정이다.

## 3. Rules applied to everyone including administrators {#3-rules-for-administrators}

### 3-1. Allow force pushes {#3-1-allow-force-pushes}

> Permit force pushes for all users with push access.

강제 Push를 허용할 것인지 여부를 결정한다. 강제 Push란, Git상에 존재하는 Commit들을 현재 Branch의 Commit들로 모두 대체하는 것이다. 되도록 사용하지 않는 것을 권장한다.

### 3-2. Allow deletions {#3-2-allow-deletions}

> Allow users with push access to delete matching branches.

Push 권한을 가진 사용자들이 Branch를 삭제할 수 있도록 허용한다. Push는 쓰기 명령어로, 사용자의 삭제 명령을 가능하게 한다. 되도록 사용하지 않는 것을 권장한다.
