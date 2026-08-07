# 스크립트에서 `npx`를 사용하지 마세요

Unix의 `time ...` 스크립트를 사용하도록 요청함.

---

측정했습니다. 로컬이 PowerShell 환경이라 Unix `time`은 사용할 수 없었고, 동일한 wall-clock 측정을 `Stopwatch`로 했습니다. 측정 대상은 CI에서 실제로 도는 `lint:*` 중 `npx`가 붙은 5개입니다. `fix:*`는 `--fix`/`--write`로 파일을 바꿀 수 있어서 제외했습니다.

모든 측정은 exit code `0`이었고, 작업트리 변경도 없었습니다.

**요약**

| script | before 평균: `npx ...` | after 평균: 직접 실행 | 평균 절감 | 절감률 |
|---|---:|---:|---:|---:|
| `lint:editorconfig` | 1.158s | 0.423s | 0.734s | 63.4% |
| `lint:stylelint` | 3.005s | 1.385s | 1.621s | 53.9% |
| `lint:prettier` | 3.670s | 2.616s | 1.054s | 28.7% |
| `lint:markdownlint` | 6.546s | 5.726s | 0.819s | 12.5% |
| `lint:eslint` | 23.784s | 21.542s | 2.242s | 9.4% |

5개를 직렬로 돈다고 보면 한 번당 합산 평균은 `38.163s -> 31.693s`라서 약 `6.47s` 절감입니다. 다만 현재 `npm run lint`는 `npm-run-all -p lint:*`로 병렬 실행이라, 실제 CI wall-clock 개선은 가장 오래 걸리는 `eslint` 쪽 영향이 커서 대략 1-3초 수준일 가능성이 큽니다.

**회차별 결과**

`lint:editorconfig`

| run | before `npx editorconfig-checker ...` | after `editorconfig-checker ...` | 차이 |
|---:|---:|---:|---:|
| 1 | 1.205s | 0.414s | 0.791s |
| 2 | 1.135s | 0.456s | 0.679s |
| 3 | 1.154s | 0.400s | 0.754s |
| 4 | 1.147s | 0.415s | 0.732s |
| 5 | 1.147s | 0.431s | 0.716s |

`lint:stylelint`

| run | before `npx stylelint **/*.css` | after `stylelint **/*.css` | 차이 |
|---:|---:|---:|---:|
| 1 | 6.300s | 1.239s | 5.061s |
| 2 | 2.022s | 1.960s | 0.062s |
| 3 | 2.775s | 1.233s | 1.542s |
| 4 | 1.971s | 1.235s | 0.736s |
| 5 | 1.959s | 1.256s | 0.703s |

`lint:prettier`

| run | before `npx prettier ...` | after `prettier ...` | 차이 |
|---:|---:|---:|---:|
| 1 | 3.578s | 2.776s | 0.802s |
| 2 | 4.189s | 2.410s | 1.779s |
| 3 | 3.138s | 2.767s | 0.371s |
| 4 | 4.300s | 2.415s | 1.885s |
| 5 | 3.145s | 2.714s | 0.431s |

`lint:markdownlint`

| run | before `npx markdownlint **/*.md` | after `markdownlint **/*.md` | 차이 |
|---:|---:|---:|---:|
| 1 | 8.085s | 6.251s | 1.834s |
| 2 | 6.618s | 4.718s | 1.900s |
| 3 | 6.811s | 5.959s | 0.852s |
| 4 | 5.333s | 5.737s | -0.404s |
| 5 | 5.882s | 5.967s | -0.085s |

`lint:eslint`

| run | before `npx eslint` | after `eslint` | 차이 |
|---:|---:|---:|---:|
| 1 | 22.450s | 21.651s | 0.799s |
| 2 | 22.392s | 21.368s | 1.024s |
| 3 | 29.307s | 22.713s | 6.594s |
| 4 | 22.447s | 21.530s | 0.917s |
| 5 | 22.326s | 20.449s | 1.877s |

결론은 `npx` 제거는 해볼 만합니다. CI 속도를 크게 줄이는 핵심 카드는 아니지만, 비용이 낮고 평균적으로 전부 개선됐습니다. 특히 `editorconfig`, `stylelint`, `prettier`는 차이가 꽤 명확합니다.

---

가능합니다. 핵심은 `npx`가 “로컬 bin을 바로 실행하는 명령”이 아니라, 현재 npm에서는 사실상 **`npm exec`의 호환 래퍼**라는 점입니다.

이 repo처럼 이미 `devDependencies`가 설치되어 있고 `npm run` 안에서 실행하는 경우에는 `npx`가 거의 중복 레이어가 됩니다.

**직접 실행 흐름**

예를 들어 script가 이렇게 바뀌면:

```json
"lint:eslint": "eslint"
```

`npm run lint:eslint` 실행 시 npm은 이미 `node_modules/.bin`을 `PATH` 앞쪽에 넣습니다. npm 11 코드에서도 `@npmcli/run-script/lib/set-path.js`가 상위 디렉터리를 따라가며 `node_modules/.bin`을 PATH에 추가합니다.

그 다음 `eslint`는 로컬 shim으로 바로 해석됩니다.

Windows 기준 로컬 shim은 대략 이런 구조입니다.

```powershell
& "node$exe" "$basedir/../eslint/bin/eslint.js" $args
```

즉 흐름은 거의 이겁니다.

```text
npm run lint:eslint
  -> npm run-script가 PATH에 ./node_modules/.bin 추가
  -> shell: eslint
  -> node_modules/.bin/eslint.ps1
  -> node node_modules/eslint/bin/eslint.js
```

**`npx` 실행 흐름**

반면 현재 script처럼:

```json
"lint:eslint": "npx eslint"
```

이면 `npm run`이 이미 PATH를 세팅한 뒤에도, 다시 `npx`를 실행합니다.

npm 11.11.0의 `bin/npx-cli.js`를 보면 초반에 바로 이렇게 바꿉니다.

```js
process.argv[1] = require.resolve('./npm-cli.js')
process.argv.splice(2, 0, 'exec')
```

즉:

```bash
npx eslint
```

는 내부적으로 거의:

```bash
npm exec -- eslint
```

로 바뀝니다.

그 다음 `npm exec`는 `lib/commands/exec.js`에서 `libnpmexec`를 호출합니다.

```js
return libexec({
  ...flatOptions,
  args: [...args],
  globalBin,
  globalPath,
  localBin,
  packages,
  path: this.npm.localPrefix,
  runPath,
  scriptShell,
  yes,
})
```

여기서부터 `libnpmexec`가 “이 명령을 어디서 실행해야 하는가?”를 판단합니다.

대략 이런 일을 합니다.

```text
npx eslint
  -> npx shim 실행
  -> node npm/bin/npx-cli.js
  -> argv를 npm exec -- eslint 로 변경
  -> npm CLI 전체 로드
  -> npm config 로드
  -> npm exec command 실행
  -> libnpmexec 실행
  -> 현재 package.json bin 확인
  -> local node_modules/.bin/eslint 존재 확인
  -> 필요하면 global bin 확인
  -> 없으면 registry manifest 확인
  -> 필요하면 npx cache에 설치
  -> fake npm script 환경 생성
  -> @npmcli/run-script로 최종 eslint 실행
```

npm 11.11.0의 `libnpmexec/lib/index.js` 기준으로 보면:

- `hasPkgBin(...)`으로 현재 package의 `bin`을 확인합니다.
- `localFileExists(...)`로 `node_modules/.bin/<command>`를 찾습니다.
- 로컬에 있으면 바로 `run()`으로 갑니다.
- 없으면 `Arborist.loadActual()`로 dependency tree를 읽고, registry manifest를 확인하고, 필요하면 npx cache에 설치합니다.
- 설치가 필요하면 `npxArb.reify(...)`까지 갑니다.

이번 repo의 `eslint`, `prettier`, `stylelint` 같은 도구는 이미 로컬 `.bin`에 있으므로 실제 설치까지는 가지 않습니다. 그래도 `npx`는 npm CLI/config/libnpmexec/run-script 레이어를 한 번 더 거칩니다.

**왜 느린가**

정리하면 느린 이유는 세 가지입니다.

1. **프로세스가 더 생깁니다**

   직접 실행은 보통:

   ```text
   shell -> eslint shim -> node eslint.js
   ```

   `npx`는:

   ```text
   shell -> npx shim -> node npx-cli.js -> npm exec -> run-script -> shell -> eslint shim -> node eslint.js
   ```

   처럼 한 단계 이상 더 깁니다.

1. **npm CLI를 다시 로드합니다**

   `npm run` 자체가 이미 npm CLI를 통해 실행되고 있는데, script 안에서 `npx`를 쓰면 npm CLI를 또 로드합니다. config, prefix, workspace/local prefix, npm definitions 같은 처리가 추가됩니다.

1. **`npx`는 “없으면 가져와 실행”하는 명령이라 탐색 비용이 있습니다**

   `npx cowsay` 같은 일회성 실행을 지원하려면 로컬에 있는지, global에 있는지, npx cache에 있는지, 없으면 설치해야 하는지 판단해야 합니다. 이 repo의 lint 도구들은 이미 설치되어 있어서 그 기능이 필요 없지만, 그 판단 로직은 여전히 탑니다.

그래서 `editorconfig-checker`처럼 원래 실행이 짧은 도구는 `npx` 오버헤드가 크게 보이고, `eslint`처럼 실제 검사 시간이 긴 도구는 상대적으로 작게 보입니다. 이전 측정에서 `editorconfig`는 약 63% 빨라졌지만, `eslint`는 약 9% 정도였던 이유가 이겁니다.

**repo에 대한 결론**

이 repo의 `package.json`에서는 `lint:*`, `fix:*`가 모두 이미 설치된 dev dependency를 실행합니다. `npm run` 안에서는 `node_modules/.bin`이 자동으로 PATH에 들어가므로 `npx`가 필요 없습니다.

즉 이런 변경은 타당합니다.

```json
"lint:eslint": "eslint",
"lint:stylelint": "stylelint **/*.css",
"lint:prettier": "prettier . --check --ignore-unknown",
"lint:editorconfig": "editorconfig-checker -config .editorconfig-checker.json",
"lint:markdownlint": "markdownlint **/*.md"
```

`npx`가 필요한 경우는 “프로젝트에 설치하지 않은 패키지를 일회성으로 실행하고 싶을 때”입니다. CI/lint scripts처럼 이미 lockfile로 설치된 도구를 실행하는 곳에서는 직접 bin 실행이 더 단순하고 빠릅니다.

---

<https://github.com/lumirlumir/lumir.page/pull/705>

husky, lint-staged, package json script에 적용 가능.

---

네. **최신 Husky(v9.1.7) 기준으로는** `.husky/pre-commit` 안에서 `npx lint-staged` 대신 그냥 `lint-staged`만 써도 보통 잘 됩니다. Husky가 훅을 실행할 때 `PATH` 앞에 `node_modules/.bin`을 추가해서, 로컬에 설치된 CLI를 바로 찾게 해주기 때문입니다. npm 문서도 실행 가능한 패키지는 `bin` 설정을 통해 로컬 설치 시 `node_modules/.bin`에 연결된다고 설명합니다. ([[GitHub](https://github.com/typicode/husky/releases?utm_source=chatgpt.com)][1])

```sh
# .husky/pre-commit
lint-staged
```

즉, 질문한 의도대로 **`npx lint-staged` 대신 `lint-staged`만 넣는 방식**이 맞습니다. 다만 이건 `lint-staged`처럼 **실행 파일(CLI)을 제공하는 패키지**일 때만 가능합니다. CLI가 없는 일반 라이브러리 패키지는 이름만 적어서는 실행되지 않습니다. ([[npm Docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)][2])

반대로 `npm run lint-staged`는 완전히 다른 의미입니다. 이건 패키지를 직접 실행하는 게 아니라, `package.json`의 `"scripts"`에 있는 `"lint-staged"`라는 이름의 스크립트를 실행하는 명령입니다. 그 스크립트를 따로 정의하지 않았다면 `npm run lint-staged`는 동작하지 않습니다. ([[npm Docs](https://docs.npmjs.com/cli/v11/using-npm/scripts/)][3])

한 가지 예외는 있습니다. monorepo처럼 `package.json`과 `node_modules`가 Git 루트가 아닌 하위 디렉터리에 있으면, 훅에서 먼저 그 디렉터리로 `cd`한 다음 실행해야 합니다. Husky 공식 문서도 그런 구조에서는 훅 안에서 해당 서브디렉터리로 이동해서 명령을 실행하라고 안내합니다. ([[Typicode](https://typicode.github.io/husky/how-to.html)][4])

정리하면, **보통은 `lint-staged`만 써도 된다**고 보면 됩니다.

[1]: https://github.com/typicode/husky/releases?utm_source=chatgpt.com "Releases · typicode/husky"
[2]: https://docs.npmjs.com/cli/v11/configuring-npm/package-json/ "package.json | npm Docs"
[3]: https://docs.npmjs.com/cli/v11/using-npm/scripts/ "Scripts | npm Docs"
[4]: https://typicode.github.io/husky/how-to.html "How To | Husky"

---

있어. **Husky v9.1.7 태그 기준**으로 보면, `npx` 없이 `lint-staged`만 써도 되는 이유는 **Husky가 훅 실행 전에 `node_modules/.bin`을 `PATH`에 넣어주기 때문**이야. 핵심 레퍼런스는 아래 3곳이야. ([[GitHub](https://github.com/typicode/husky/blob/v9.1.7/package.json)][1])

- `package.json`에서 CLI 엔트리가 `"husky": "bin.js"`로 연결돼 있고, `bin.js`는 `init` 시 `p.stdout.write(i())`로 `index.js`의 설치 로직을 호출한다. 즉, 실제 훅 세팅은 `index.js`가 담당한다. ([[GitHub](https://github.com/typicode/husky/blob/v9.1.7/package.json)][1])

- `index.js`에서 Husky는 `git config core.hooksPath .husky/_`를 설정하고, 저장소 루트의 `husky` 파일을 `.husky/_/h`로 복사한 뒤, 각 훅 래퍼 파일을 `#!/usr/bin/env sh` + `. "$(dirname "$0")/h"` 형태로 생성한다. 그래서 Git이 직접 실행하는 건 네가 작성한 `.husky/pre-commit`가 아니라, 먼저 `.husky/_/pre-commit`이고, 그 파일이 다시 `.husky/_/h`를 source 하게 된다. ([[GitHub](https://github.com/typicode/husky/blob/v9.1.7/index.js)][2])

- 그 다음 `.husky/_/h`의 원본인 저장소 루트 `husky` 파일에서 `export PATH="node_modules/.bin:$PATH"`를 수행하고, 이어서 `sh -e "$s" "$@"`로 실제 훅 스크립트(`.husky/pre-commit`)를 실행한다. 이 때문에 `.husky/pre-commit` 안에서는 로컬 설치된 CLI가 셸에서 바로 잡혀서, `npx lint-staged` 대신 그냥 `lint-staged`를 써도 된다. ([[GitHub](https://github.com/typicode/husky/blob/v9.1.7/husky)][3])

흐름으로 보면 이렇게 이해하면 딱 맞아.

```text
git hook
→ .husky/_/pre-commit
→ . "$(dirname "$0")/h"
→ export PATH="node_modules/.bin:$PATH"
→ sh -e .husky/pre-commit
→ lint-staged
```

즉, **Husky가 `npx`를 대신 실행해주는 게 아니라**, **로컬 바이너리 경로를 `PATH`에 주입해서 `lint-staged`를 그냥 실행 가능하게 만들어주는 것**이 정확한 이유야. 그래서 일반적인 구성에서는 아래처럼 쓰는 게 맞다. ([[GitHub](https://github.com/typicode/husky/blob/v9.1.7/husky)][3])

```sh
# .husky/pre-commit
lint-staged
```

원한다면 내가 이 레퍼런스를 바탕으로 **“왜 `npm run lint-staged`는 다르고, `lint-staged`는 되는지”**까지 이어서 정리해줄게.
