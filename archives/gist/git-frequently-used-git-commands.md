# 자주 사용하는 Git 명령어 모음

- `git branch -D $(git branch)` 이렇게 하면 모든 브랜치 삭제 가능.

## `commit`

## `push`

## `reset`

### Usages

#### `commit` 되돌리기

```bash
git reset HEAD^
```

## `branch`

### Options

#### `-m`

브랜치 이름을 변경한다.

`old-branch-name`에서 `new-branch-name`으로 이름을 변경하는 방법은 아래와 같다.

##### 1. 현재 작업중인 브랜치가 `old-branch-name`일 경우

```bash
git branch -m new-branch-name
```

##### 2. 현재 작업중인 브랜치가 `old-branch-name`이 아닐 경우

```bash
git branch -m old-branch-name new-branch-name
```

#### `-d`, `--delete`

브랜치를 삭제한다.

이때, 브랜치는 상위(upstream) 브랜치에 완전히 병합되어야 하며, `--track` 또는 `--setupstream-to` 옵션으로 설정된 상위(upstream) 브랜치가 없는 경우에는 `HEAD`에 병합되어야 한다.

#### `-D`

브랜치를 강제 삭제한다.

`--delete --force`의 축약형이다.

## `rm`

cache 삭제

```bash
git rm -r --cached .
```

## `config`

```bash
git config --global core.autocrlf false
git config --global user.email "rpfos@naver.com"
git config --global user.name "루밀LuMir"

git config --global --list
git config --global --unset
```
