---
title: "GitHub's classic branch protection rules"
description: 'Branch protection rules are essential rules for managing access to and changes in specific branches to prevent confusion during collaboration on GitHub; with settings such as PR requirements, approvals, and status checks, they improve code quality and collaboration efficiency.'
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

Setting branch protection rules is important. If there are no rules for collaboration, each person will proceed in their own way, and the project will become a mess. If there are only a few people, it may not be a big problem, but in real work, as few as 2 people and as many as dozens or hundreds of people manage one repository, so rules are essential. In particular, Git branches are the basic foundation for collaboration, so rules must be set to prevent confusion during collaboration.

In GitHub, you can define rules for branches, and these are called Branch Protection Rules. By using them, you can prevent a specific Branch from being deleted by mistake, or block adding Commits in ways other than a PR(Pull Request), thereby forcing code review. One thing to note is that only Branches uploaded to GitHub are affected by this Rule. In other words, there are no restrictions on Local work.

Access classic branch protection rules through Github -> Repository -> Settings -> Code and automation -> Branches.

> Until early 2024, these branch protection rules were not called classic, but at some point classic was added in front of the name.

## 1. Branch name pattern *

Write the Branch name pattern. The Branch Protection Rule covered below is applied to Branches with a specific name pattern.

You can enter a specific Branch name or use a wildcard(`*`) to create rules that apply to multiple Branches. In this case, you must use the `fnmatch` syntax.

1. Apply only to one Branch.

    ex. Apply only to the `main` Branch.

    ```txt
    main
    ```

1. Apply to every Branch.

    ```txt
    *
    ```

1. Apply to every Branch that starts with a specific word.

    ex. Apply to every Branch with the `feature` prefix.

    ```txt
    feature*
    ```

    ex. Apply to every Branch with the `feature/` prefix.

    ```txt
    feature/*
    ```

1. Apply to every Branch that ends with a specific word.

    ex. Apply to every Branch with the `feature` suffix.

    ```txt
    *feature
    ```

1. Apply to every Branch that contains a specific word.

    ex. Apply to every Branch that contains the word `feature`.

    ```txt
    *feature*
    ```

The priority of protection rules is applied higher when they include the name of a specific Branch. If there are multiple protection rules that include a specific name, the rule created first has higher priority. Even when special characters such as `*`, `?`, and `]` are included, the older rule has priority.

If you want to add an exception to an existing specific protection rule, add a new protection rule with higher priority.

## 2. Protect matching branches

### 2-1. Require a pull request before merging

> When enabled, all commits must be made to a non-protected branch and submitted via a pull request before they can be merged into a branch that matches this rule.

Require a PR before merging. To Commit to the relevant Branch, a direct Push from Local is not possible, and you must create a separate Branch and proceed with a Pull Request. In other words, you cannot Push directly to the Branch, and changes can only be reflected through a PR. This is used during collaboration to protect a Branch from direct Pushes from Local and to force code review. Each person works on their own Branch(unprotected), then reflects the code into the shared Branch through a PR.

#### 2-1-1. Require approvals

Determine the number of people required for PR approval. Merging proceeds only when at least a certain number of people approve. For example, if the required member count is 3, three approvals are required before merging proceeds.

#### 2-1-2. Dismiss stale pull request approvals when new commits are pushed

> New reviewable commits pushed to a matching branch will dismiss pull request review approvals.

Determine whether existing PR approvals are invalidated when new code is added after PR approval. This is because, if the existing PR approval remains valid, a problem may occur where an earlier version is merged.

#### 2-1-3. Require review from Code Owners

> Require an approved review in pull requests including files with a designated code owner.

Determine whether review is also required from code owners.

#### 2-1-4. Require approval of the most recent reviewable push

> Whether the most recent reviewable push must be approved by someone other than the person who pushed it.

Determine whether the most recent Push must be approved by a reviewer other than the person who pushed it. When this item is selected, after modifying code, it cannot be merged without approval from another reviewer. (This was created to prevent secretly changing changes or approving one's own code.)

### 2-2. Require status checks to pass before merging

> Choose which status checks must pass before branches can be merged into a branch that matches this rule. When enabled, commits must first be pushed to another branch, then merged or pushed directly to a branch that matches this rule after status checks have passed.

Require status tests to pass before merging. It automatically verifies whether the code being reflected passes specific tests. Tests can be written through GitHub Actions. Merging is possible only when there are no issues with the test results.

#### 2-2-1. Require branches to be up to date before merging

> This ensures pull requests targeting a matching branch have been tested with the latest code. This setting will not take effect unless at least one status check is enabled (see below).

Before merging, always make sure status tests are run against the latest Branch state.

### 2-3. Require conversation resolution before merging

> When enabled, all conversations on code must be resolved before a pull request can be merged into a branch that matches this rule.

Before merging, every Conversation created through code review in the PR must be resolved(Solved) before merging is allowed.

### 2-4. Require signed commits

> Commits pushed to matching branches must have verified signatures.

Only signed(Verified) Commits can be Pushed. Usually, when a GPG Key is registered in GitHub and a person with that Key makes a Commit, a signed(Verified) mark appears.

### 2-5. Require linear history

> Prevent merge commits from being pushed to matching branches.

Require linear History.

1. Allow only Squash merges or Rebase merges.
1. Use this when you do not want merged Commits to remain in History.
1. Use this when you want to make it easy to track the History of a specific Branch, when you need to keep the Branch as one line, or when you want to manage the Branch shape simply.

### 2-6. Require deployments to succeed before merging

> Choose which environments must be successfully deployed to before branches can be merged into a branch that matches this rule.

Deployment must succeed before merging. Among the environments configured in the Repository, you can select the targets whose deployment success should be checked.

### 2-7. Lock branch

> Branch is read-only. Users cannot push to the branch.

Make the Branch read-only so Pushes are impossible.

### 2-8. Do not allow bypassing the above settings

> The above settings will apply to administrators and custom roles with the "bypass branch protections" permission.

Even users with administrator permissions cannot merge unless they follow all the rules configured above. In other words, this setting makes administrators follow all applied rules without exception.

## 3. Rules applied to everyone including administrators

### 3-1. Allow force pushes

> Permit force pushes for all users with push access.

Determine whether to allow force Pushes. A force Push replaces all Commits that exist in Git with the Commits of the current Branch. It is recommended not to use it if possible.

### 3-2. Allow deletions

> Allow users with push access to delete matching branches.

Allow users with Push permission to delete Branches. Push is a write command, so it enables the user's delete command. It is recommended not to use it if possible.
