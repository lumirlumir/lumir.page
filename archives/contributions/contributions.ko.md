<!--
Add: https://github.com/inikulin/parse5/issues/1747
-->

# Open Source

## Index

- [Contact](#contact)
- [Summary](#summary)
- [Major Projects](#major-projects)
    - [ESLintㆍESLint Community](#eslint--eslint-community)
    - [ko.react.dev](#koreactdev)
    - [`clang-format-node`](#clang-format-node)
    - [`bananass`](#bananass)
    - [`eslint-markdown`](#eslint-markdown)
    - [`textlint-rule-allowed-uris`](#textlint-rule-allowed-uris)
    <!-- - [`moing.lumir.page` / `lumir.page`](#moinglumirpage--lumirpage) -- TODO -->
    <!-- - [`lumirlumir-configs`](#lumirlumir-configs) -- TODO -->
- [Open Source Contributions](#open-source-contributions)
    - [`eslint/eslint`](#eslinteslint)
    - [`eslint/rewrite`](#eslintrewrite)
    - [`eslint/js`](#eslintjs)
    - [`eslint/markdown`](#eslintmarkdown)
    - [`eslint/json`](#eslintjson)
    - [`eslint/css`](#eslintcss)
    - [`eslint/code-explorer`](#eslintcode-explorer)
    - [`eslint/eslint.org`](#eslinteslintorg) 
    - [`eslint/workflows`](#eslintworkflows) 
    - [`eslint/create-config`](#eslintcreate-config) 
    - [`eslint/generator-eslint`](#eslintgenerator-eslint) 
    - [`eslint/eslint-github-bot`](#eslinteslint-github-bot) 
    - [`eslint/eslint-release`](#eslinteslint-release) 
    - [`eslint/tsc-meetings`](#eslinttsc-meetings) 
    - [`eslint/eslint-transforms`](#eslinteslint-transforms)
    - [`eslint/csstree`](#eslintcsstree)
    - [`eslint/eslintrc`](#eslinteslintrc)
    - [`eslint/config-inspector`](#eslintconfig-inspector)
    - [`eslint/.github`](#eslintgithub)
    - [`eslint-community/eslint-plugin-es-x`](#eslint-communityeslint-plugin-es-x)
    - [`eslint-community/eslint-plugin-eslint-plugin`](#eslint-communityeslint-plugin-eslint-plugin)
    - [`vercel/next.js`](#vercelnextjs)
    - [`llvm/llvm-project`](#llvmllvm-project)
    - [`oxc-project/oxc`](#oxc-projectoxc)
    - [`editorconfig-checker/editorconfig-checker.javascript`](#editorconfig-checkereditorconfig-checkerjavascript)
    - [`renovatebot/renovate`](#renovatebotrenovate)
    - [`textlint/textlint`](#textlinttextlint)
    - [`humanwhocodes/momoa`](#humanwhocodesmomoa)
    - [`sindresorhus/yocto-spinner`](#sindresorhusyocto-spinner)
    - [`material-extensions/vscode-material-icon-theme`](#material-extensionsvscode-material-icon-theme)    
    - [`yuyinws/vitepress-plugin-group-icons`](#yuyinwsvitepress-plugin-group-icons)
    - [`reactjs/ko.react.dev`](#reactjskoreactdev)
    - [`reactjs/react.dev`](#reactjsreactdev)
    - [`typescript-eslint/typescript-eslint`](#typescript-eslinttypescript-eslint)
    - [`vitejs/vite`](#vitejsvite)
    - [`lerna/lerna`](#lernalerna)
    <!-- - [`nodejs/node`](#nodejsnode) -- TODO -->
    <!-- - [`nodejs/nodejs.org`](#nodejsnodejsorg) -- TODO -->
    <!-- - [`algolia/docsearch`](#algoliadocsearch) -- TODO -->
    <!-- - [`toss/es-hangul`](#tosseshangul) -- TODO -->
    <!-- - [`pronist/hello`](#pronisthello) -- TODO -->
    <!-- - [`pronist/tidory`](#pronisttidory) -- TODO -->
    <!-- - [`xvzc/boj-cli`](#xvzcboj-cli) -- TODO -->
    <!-- - [`mdn/translated-content`](#mdntranslated-content) -- TODO -->
    <!-- - [`actions/runner-images`](#actionsrunner-images) -- TODO -->
- [이외의 활동](#이외의-활동)

## Contact

- Email: yonghyeon0324@gmail.com (rpfos@naver.com)
- GitHub: https://github.com/lumirlumir
- LinkedIn: https://linkedin.com/in/lumirlumir

[<kbd>Back to index ⬆️</kbd>](#index)

## Summary

- ESLintㆍESLint Community Core Team Member로 활동하며, ESLint 프로젝트의 릴리즈를 제외한 운영 전반을 주도하고 있습니다.
- 한국 React 문서 ([ko.react.dev](https://ko.react.dev)) 공식 메인테이너로 활동하며, 문서 번역, 린팅 시스템 구축, 프로젝트 관리 등 다양한 측면에서 기여하고 있습니다.
- 개인 오픈 소스 프로젝트 운영자로서, `clang-format-node`, `eslint-markdown` 등의 프로젝트를 직접 기획, 설계, 개발, 배포, 운영하고 있습니다.
- 외부 오픈 소스 프로젝트 기여자로서, `vercel/next.js`, `llvm/llvm-project`, `oxc-project/oxc`, `renovatebot/renovate` 등 다양한 프로젝트에 기여하고 있습니다.
- [GitHub Sponsors](https://github.com/sponsors/lumirlumir)를 통한 다수의 개인 후원자를 보유하고 있으며, 오픈 소스 생태계에 대한 지속적인 기여를 인정받고 있습니다.
- 2025년 12월, [GDG (Google Developers Group) Incheon](https://ticketa.co/event/devfest-incheon-2025-bmbtaysp) 행사에서 ["모던 자바스크립트 패키지 개발하기: ESM, TypeScript, 의존성 그리고 DX"](https://docs.google.com/presentation/d/1JjQPxm2NZ4Jylirp-_GqIYGFuIkDzYra1uTNJy7pxoc/edit?usp=sharing) 라는 주제로 연사를 맡았습니다.
- 2024년 6월 23일부터 640일 이상 연속으로 GitHub 활동을 이어오며 총 7,300개 이상의 커밋을 기록했고, 이 중 오픈소스 분야에서 50개 이상의 프로젝트에 [**3,000건 이상**](https://github.com/lumirlumir) 기여했으며, [**670건 이상의 PR Merge**](https://github.com/search?q=-org%3Alumirlumir+author%3Alumirlumir+is%3Amerged&type=pullrequests&p=1)를 기록하며 오픈소스 생태계 내에서의 실질적인 영향력을 꾸준히 만들어가고 있습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

## Major Projects

### ESLintㆍESLint Community

> [!NOTE]
>
> 실제 업무에 대한 자세한 내용은 하단의 [Open Source Contributions](#open-source-contributions) 섹션을 참고해주세요.

#### 개요

React 한국어 공식 문서의 메인테이너로서 제가 가장 먼저 주도했던 과제는 번역의 질을 결정짓는 '용어 일관성' 확보를 위한 Markdown 린팅 환경 구축이었습니다.

도입 초기에는 ESLint의 Markdown 직접 지원 부재로 인해 [Textlint](https://textlint.org/)를 대안으로 활용했으나, 확장성 측면에서 커스텀 규칙 작성에 한계를 느꼈습니다. 그러던 중 [2024년 10월, ESLint의 공식 Markdown 지원](https://eslint.org/blog/2024/10/eslint-json-markdown-support/) 소식에 발맞춰 린팅 시스템을 ESLint로 전환하는 작업을 시작했습니다.

이 과정에서 아직 미완성 단계였던 [`eslint/markdown`](https://github.com/eslint/markdown) 프로젝트의 기능을 보완하기 위해 수많은 기여를 진행했습니다. 당시 ESLint 코어 팀의 리소스가 부족했던 상황에서 제가 제출한 다수의 PR이 핵심 로직에 신속히 반영되었고, 이를 계기로 코어 팀과 긴밀한 협업 관계를 맺게 되었습니다.

특히 `eslint/markdown` 기여 과정에서 [`eslint/rewrite`](https://github.com/eslint/rewrite)와 [`eslint/eslint`](https://github.com/eslint/eslint) 같은 핵심 내부 로직을 깊게 다루게 되었고, 이러한 전문성을 인정받아 ESLint 팀에 정식 합류하게 되었습니다. 현재는 소규모 팀의 특성을 살려 릴리즈를 제외한 프로젝트 운영 전반을 주도하며 오픈소스 생태계 발전에 기여하고 있습니다. 

#### 주요 업무

진행했던 주요 업무는 아래와 같습니다.

- Markdown, JSON, CSS Language Support 개발 및 유지보수.
- ESLint Core 기능 추가, 버그 수정, 성능 개선.
- ESLint 내부의 GitHub Actions Workflow 중앙화 및 자동화.
- React 기반의 [ESLint Playground](https://eslint.org/play/) 및 [ESLint Code Explorer](https://explorer.eslint.org/) 기능 개선 및 유지보수.
- 프로젝트 의존성 관리를 통한 DX 개선.
- ESLint Community 프로젝트 관리 및 유지보수.
- 이외 다수. (자세한 내용은 [Open Source Contributions](#open-source-contributions) 섹션을 참고해주세요.)

#### 성취

- 강도 높은 코드 리뷰: 실제 현업에서 주간 다운로드 [8,000만회 이상](https://www.npmjs.com/package/eslint)을 기록하는 대규모 오픈 소스 프로젝트를 운영하며, 프로젝트의 안정성을 최우선으로 고려하는 코드 리뷰 문화를 경험할 수 있었습니다. [TC39](https://tc39.es/) 멤버, Microsoft MVP, [Webpack](https://webpack.js.org/) Maintainer 등 다양한 배경을 가진 오픈 소스 생태계의 리더급 동료들과 협업하는 경험을 통해, 강도 높은 코드 리뷰를 주고받는 능력을 기를 수 있었습니다. 이를 통해, 코드 품질 향상과 유지보수성 증진에 기여할 수 있었으며, 다양한 관점에서의 피드백을 수용하는 능력을 키울 수 있었습니다.
- 비동기 협업: Discord, GitHub Issue/PR/Project를 통해 전 세계에 흩어져 있는 ESLint 코어 팀원들과 비동기적으로 협업하는 경험을 통해, 시차와 물리적 거리를 극복하고 효과적으로 소통하는 방법을 학습할 수 있었습니다. 이를 통해, 원격 협업 환경에서의 생산성과 효율성을 높이는 능력을 기를 수 있었으며, 다양한 문화적 배경을 가진 팀원들과의 원활한 소통을 통해 글로벌 오픈 소스 프로젝트 운영에 기여할 수 있었습니다.
- 글로벌 커뮤니케이션: 오픈 소스 프로젝트의 공식 커뮤니케이션 언어로서 영어를 사용하며, 기술 문서 작성, 코드 리뷰, 이슈 토론 등 다양한 상황에서 영어로 효과적으로 의사소통하는 능력을 기를 수 있었습니다. 이를 통해, 글로벌 오픈 소스 커뮤니티에서 활발히 활동할 수 있는 자신감을 얻었으며, 기술적 아이디어와 피드백을 명확하게 전달하는 능력을 향상시킬 수 있었습니다.
- 정규표현식: ESLint Markdown 프로젝트의 다양한 린팅 규칙을 구현하는 과정에서, 복잡한 패턴 매칭을 위해 정규표현식을 광범위하게 활용하였습니다. 이를 통해, 정규표현식의 다양한 패턴, 플래그, 캡처 그룹 등을 심도 있게 이해할 수 있었으며, 복잡한 문자열 처리 문제를 해결하는 능력을 기를 수 있었습니다. 또한, 정규표현식을 효율적으로 작성하고 디버깅하는 방법을 학습하여, 코드의 가독성과 유지보수성을 향상시키는 데 기여할 수 있었습니다.
- 알고리즘: ESLint 코어를 분석하며 다양한 알고리즘 패턴들을 접할 수 있었습니다. 특히, 그래프 탐색, 트리 순회, 정렬 및 검색 알고리즘 등, 컴퓨터 과학의 기본적인 알고리즘 개념들을 실제 코드에서 어떻게 구현하고 최적화하는지에 대한 깊이 있는 이해를 얻을 수 있었습니다. 이를 통해, 복잡한 문제를 해결하는 능력을 기를 수 있었으며, 효율적인 코드 작성에 기여할 수 있었습니다.
- Low 레벨에 대한 이해: ESLint 프로젝트의 내부 구조와 동작 원리를 깊이 이해할 수 있었습니다. 특히, AST(Abstract Syntax Tree) 기반의 코드 분석 및 변환 과정, 룰 엔진의 동작 방식, 플러그인 및 설정 파일 처리 로직 등, ESLint의 핵심 기능들이 어떻게 구현되어 있는지에 대한 깊이 있는 이해를 얻을 수 있었습니다. 이를 통해, ESLint의 기능 확장 및 최적화 작업에 기여할 수 있었으며, JavaScript/Markdown/JSON 등 언어 자체에 대한 이해도 함께 향상시킬 수 있었습니다. 또한, JavaScript 및 TypeScript AST는 Babel, Rollup, Webpack 등 모던 프론트엔드 기술에서 광범위하게 활용되고 있기에, 이러한 Low 레벨에 대한 이해는 프론트엔드 개발자로서의 전문성을 더욱 강화하는 데 큰 도움이 되었습니다.
- 모던 프론트엔드 툴링에 대한 깊이 있는 이해: ESLint 프로젝트는 자바스크립트 오픈 소스 생태계를 이끌어가는 위치에 있기에, 여러 기여자들의 의견을 수렴하여 현대적이고 최신의 아키텍처 구성 및 툴링을 채택하고 있습니다. 이러한 환경에서 React, Vite, Webpack, TypeScript, Prettier 등 다양한 모던 프론트엔드 툴링을 활용하여 프로젝트를 운영하는 경험을 통해, 최신 프론트엔드 기술 스택에 대한 깊이 있는 이해를 얻을 수 있었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [ko.react.dev](https://ko.react.dev/)

> [!NOTE]
>
> 실제 업무에 대한 자세한 내용은 하단의 [Open Source Contributions](#open-source-contributions) 섹션을 참고해주세요.

#### 개요

React 한국어 공식 문서 메인테이너로 합류하게 된 과정은 개인적인 성장을 위한 작은 실천에서 시작되었습니다.

2024년 React v18.3 출시 당시, 기술적 기본기를 탄탄히 다지기 위해 공식 문서 전체를 정독하는 것을 목표로 삼았습니다. 이 과정에서 다수의 미번역 문서와 오타를 발견했고, 정보의 정확성을 높이고자 자발적으로 기여를 시작했습니다.

단순한 번역 수정을 넘어 기여 프로세스를 개선하고 리포지토리 관리 전반으로 기여 범위를 넓혀갔습니다. 이러한 주도적인 활동과 프로젝트 운영에 대한 기여도를 인정받아 공식 멤버 합류 제안을 받았으며, 현재는 한국어 문서의 품질과 생태계를 책임지는 메인테이너로 활동하고 있습니다.

#### 주요 업무

진행했던 주요 업무는 아래와 같습니다.

- 한국어 기반의 UI/UX 비일관성 개선.
- 용어 번역 일관성을 위한 Textlint 및 ESLint Markdown 린팅 환경 구축 및 유지보수.
- 이슈 / PR 관리 및 커뮤니케이션 프로세스 개선 등 리포지토리 관리 및 운영 전반.
- 영문 react.dev 문서와의 동기화, 문서 번역 및 오탈자 수정.
- 이외 다수. (자세한 내용은 [Open Source Contributions](#open-source-contributions) 섹션을 참고해주세요.)

#### 성취

- 오픈 소스 프로젝트 및 커뮤니티 운영: React의 한국어 저장소를 관리하며, 다양한 기여자들의 PR과 이슈를 조율하는 커뮤니티 관리 역량을 쌓았습니다. 명확한 기여 가이드라인을 제시하고 효율적인 리뷰 프로세스를 구축하는 경험을 통해, 건강한 오픈 소스 생태계를 유지하기 위한 소프트 스킬과 책임감을 배웠습니다. 또한, GitHub에서 제공하는 다양한 기능들을 다루며 프로젝트 관리 능력을 향상시킬 수 있었습니다.
- 문서화를 통한 기술적 깊이 체득: 매주 업데이트되는 React의 최신 문서들을 가장 먼저 접하며, 자연스럽게 새로운 기능에 대해 학습하고 이해하는 능력을 키울 수 있었습니다. 단순히 문서를 번역하는 것을 넘어, 기술적 내용을 깊이 있게 파악하고 이를 명확하게 전달하는 과정에서, React의 핵심 개념에 대한 깊은 이해를 얻을 수 있었습니다. 이를 통해, 최신 프론트엔드 기술 동향을 빠르게 습득하고, React 생태계에서의 전문성을 강화할 수 있었습니다.
- 기술 문서 구조 이해: React 공식 문서의 방대한 구조를 분석하고 이해하는 과정을 통해, 효과적인 기술 문서 작성 및 구성 방법을 배울 수 있었습니다. 각 문서가 어떻게 상호 연결되어 있는지 파악하고, 독자가 필요한 정보를 쉽게 찾을 수 있도록 문서 구조를 최적화하는 경험을 통해, 기술 커뮤니케이션 능력을 향상시킬 수 있었습니다. 또한, 다양한 독자층을 고려한 문서 작성 방식을 익히며, 보다 포괄적이고 접근성 높은 기술 문서를 작성하는 데 기여할 수 있었습니다.
- 엔지니어링 기반의 품질 관리(Linting & Automation): '용어 일관성'이라는 추상적인 문제를 해결하기 위해 Textlint와 ESLint 커스텀 규칙을 도입하며, 자동화된 품질 관리 시스템의 중요성을 학습했습니다. 사람이 수동으로 검수하던 영역을 시스템적으로 해결하는 경험을 통해, 대규모 프로젝트에서 일관성을 유지하기 위한 DX(Developer Experience) 설계 능력을 키울 수 있었습니다.
- 글로벌 프로젝트와의 동기화 및 버전 관리: 영문 원본 저장소(react.dev)의 변경 사항을 실시간으로 추적하고 한국어 문서에 반영하는 과정을 통해, 대규모 프로젝트의 변경 관리와 버전 동기화 전략을 익혔습니다. Upstream 저장소의 업데이트 흐름을 파악하고 관리하는 능력을 통해, 지속 가능한 문서 운영 시스템에 대한 통찰을 얻었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`clang-format-node`](https://github.com/lumirlumir/npm-clang-format-node)

- Homepage: https://clang-format-node.lumir.page/
- 릴리즈: https://github.com/lumirlumir/npm-clang-format-node/releases

> [!IMPORTANT]
>
> 개인 오픈 소스 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

#### 개요

프론트엔드 개발에 입문한 계기는 개인 블로그를 직접 만들고 싶다는 목표 때문이었습니다. 평소 [Tistory 블로그](https://lumir.tistory.com/)에 C/C++ 알고리즘 문제 풀이를 기록해 왔지만, 에디터의 사용성과 커스터마이징 한계로 직접 개발을 결심했습니다. 개발 과정에서 [VS Code](https://code.visualstudio.com/)는 [Visual Studio](https://visualstudio.microsoft.com/ko/)와 달리 내장 C/C++ 포매터가 없었고, JavaScript 생태계의 대표적 포매터인 [Prettier](https://prettier.io/)도 이를 지원하지 않아 대체 도구를 탐색했습니다.

그 과정에서 Node.js 환경에서 C/C++ 포매터인 [`clang-format`](https://clang.llvm.org/docs/ClangFormat.html)을 사용할 수 있게 한 [`angular/clang-format`](https://github.com/angular/clang-format) 패키지를 발견했습니다. 그러나 이 패키지는 비신뢰 소스 기반 바이너리, 제한적인 플랫폼 지원, 장기간 유지보수 부재라는 문제를 안고 있었습니다. 이를 해결하기 위해 패키지를 포크해 개선 작업을 진행했고, 그 결과 보안과 멀티 플랫폼 지원을 강화한 `clang-format-node` 프로젝트로 이어졌습니다.

현재 npm에서의 월간 다운로드 수는 평균 30,000회 이상이며, GitHub Star는 33개입니다. 주로 네이티브 코드를 함께 사용하는 [React Native](https://reactnative.dev/) 기반 프로젝트에서 활용되고 있으며, GitHub Star 10,000+를 기록한 [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated/blob/45cf72265a09ce39b88b29a9b754d2a6758d030f/package.json#L41) 라이브러리에서도 현재 사용되고 있습니다.

#### 기능

`clang-format`은 C, C++, Java, JavaScript, JSON, Objective-C, Protobuf, C# 등 다양한 언어를 지원하는 포매터로, Prettier와 유사한 역할을 합니다. `clang-format-node`, `clang-format-git`, `clang-format-git-python`은 [LLVM](https://github.com/llvm/llvm-project)에서 제공하는 `clang-format` 및 `git-clang-format` 바이너리를 Node.js 환경에서 더 편리하게 사용할 수 있도록 래핑한 패키지입니다.

현재 `darwin-arm64`, `darwin-x64`, `linux-arm`, `linux-arm64`, `linux-ppc64`, `linux-s390x`, `linux-x64`, `win32-x64` 환경을 지원하며, GitHub Actions 워크플로와 QEMU 기반 크로스 플랫폼 빌드 자동화를 통해 최신 `clang-format` 바이너리를 매주 자동으로 빌드·패키징·배포합니다.

또한 [Node.js 코어](https://github.com/nodejs/node)에서 [해당 라이브러리 도입이 검토될 정도](https://github.com/nodejs/node/pull/55201)로 활용 가능성을 인정받았으며, 이에 맞춰 [패키지 보안](https://github.com/lumirlumir/npm-clang-format-node?tab=readme-ov-file#fully-secure-binaries)과 신뢰성을 높이는 데 중점을 두고 개발했습니다. 주요 기능은 다음과 같습니다.

- 완전한 보안 바이너리 제공: 공식 LLVM 프로젝트 소스 코드로부터 직접 빌드하며, GitHub Actions Attestation Provenances와 npm Build Provenances를 통해 빌드 결과를 검증합니다.
- Zero dependencies: Python, C++, 기타 npm 하위 의존성 없이 Node.js만으로 바로 사용할 수 있습니다.
- `angular/clang-format`의 손쉬운 대체재: 기존 `angular/clang-format` 사용 환경에서 큰 변경 없이 `clang-format-node`로 전환할 수 있습니다.
- 폭넓은 실행 환경 지원: 다양한 운영체제 아키텍처, Node.js 버전, GitHub Actions 러너 이미지, Docker 빌드 이미지 환경을 지원합니다.
- 간편한 CI 연동: 복잡한 별도 설정 없이 일반적인 Node.js 패키지처럼 `clang-format`을 CI 환경에 바로 적용할 수 있습니다.
- 자동화된 빌드 및 릴리스: `clang-format` 업데이트가 발생할 때마다 GitHub Actions가 이를 감지해 자동으로 빌드하고, npm 배포와 PR 생성까지 수행합니다.

#### 성취

GitHub 프로젝트 관리, CI/CD 파이프라인 구축, 크로스 플랫폼 빌드 자동화, 네이티브 바이너리 패키징, SemVer에 따른 릴리즈, Lerna와 npm workspaces를 활용한 모노레포 관리, 테스트, 문서화 등, 오픈 소스 프로젝트를 운영하면서 겪게 되는 다양한 문제들을 직접 경험하고 해결할 수 있었습니다.

- GitHub 프로젝트 관리: GitHub Issues, PRs, Labels, Branch Protection Rules 등 GitHub에서 제공하는 다양한 기능들을 활용하여, 체계적인 프로젝트 관리를 경험할 수 있었습니다. 특히, Issue 및 PR 템플릿을 작성하여, 외부 기여자들이 보다 쉽게 참여할 수 있도록 유도하였으며, Labels를 활용하여 이슈 및 PR의 상태를 명확히 구분할 수 있도록 하였습니다. 또한, Branch Protection Rules를 설정하여, 메인 브랜치에 대한 직접적인 푸시를 방지하고, 모든 변경 사항이 PR을 통해 이루어지도록 강제함으로써, 코드 품질을 유지하는 데 기여하였습니다.
- CI/CD 파이프라인 구축: Lint, Test, Build, Versioning, Release, PR Creation, PR title verification 등, [다양한 작업들을 자동화하는 9개 이상의 CI/CD 파이프라인](https://github.com/lumirlumir/npm-clang-format-node/tree/main/.github/workflows)을 GitHub Actions를 활용하여 구축하였습니다. 각 작업들을 독립적인 Job으로 구성하고, 매트릭스 빌드를 활용하여 다양한 플랫폼에서의 빌드 및 테스트를 자동으로 수행하도록 설정하였습니다. 또한, 릴리즈 과정에서는, 새로운 버전이 감지되었을 때, 자동으로 PR을 생성하고, PR 제목이 올바른지 검증하는 작업까지 포함하여, 릴리즈 프로세스 전반을 자동화하였습니다. 이를 통해, 오픈 소스 프로젝트 운영에 필요한 반복적인 작업들을 최소화하고, 핵심 기능 개발에 집중할 수 있도록 하였습니다.
- 크로스 플랫폼 빌드 자동화: 패키지 개발 중 가장 난이도가 높았고 오랜 시간이 걸린 부분은 크로스 플랫폼 빌드 자동화였습니다. `clang-format-node` 프로젝트는 다양한 운영체제 및 아키텍처를 지원해야 했기에, 각 플랫폼별로 빌드된 바이너리를 자동으로 생성하는 것이 중요했습니다. GitHub Actions의 매트릭스 빌드 기능과 QEMU, 그리고 Docker의 [Ubuntu](https://hub.docker.com/_/ubuntu), [buildpack-deps](https://hub.docker.com/_/buildpack-deps/), [Python](https://hub.docker.com/_/python) 이미지들을 적절히 활용하여, 각 플랫폼별로 빌드된 바이너리를 자동으로 생성하는 파이프라인을 구축하였습니다. 특히, Docker와 QEMU를 활용한 크로스 컴파일 과정에서 발생하는 다양한 문제들을 해결하는 과정에서 많은 시간을 투자하였으며, 이를 통해 크로스 플랫폼 빌드 자동화에 대한 깊은 이해를 얻을 수 있었습니다.
- 네이티브 바이너리 패키징: `clang-format-node` 프로젝트는 네이티브 바이너리를 포함하는 패키지이기에, 각 플랫폼별로 빌드된 바이너리를 올바르게 패키징하는 것이 중요했습니다. GitHub Actions의 매트릭스 빌드 기능과 QEMU를 활용하여, `darwin-arm64`, `darwin-x64`, `linux-arm`, `linux-arm64`, `linux-ppc64`, `linux-s390x`, `linux-x64`, `win32-x64` 환경에서 각각 빌드된 바이너리를 자동으로 패키징하도록 설정하였습니다. 또한, 각 플랫폼별로 올바른 바이너리가 포함되었는지 확인하기 위해, 빌드 후 검증 스크립트를 작성하여, 릴리즈 전에 잠재적인 문제를 사전에 발견할 수 있었습니다. 이를 통해, 다양한 플랫폼에서 안정적으로 동작하는 네이티브 바이너리 패키지를 제공할 수 있었습니다.
- SemVer에 따른 릴리즈: `clang-format-node` 프로젝트는 LLVM 프로젝트에서 제공하는 `clang-format` 바이너리를 래핑하는 패키지이기에, `clang-format` 바이너리의 버전이 올라감에 따라, `clang-format-node` 패키지의 버전도 함께 올라가야 했습니다. 이를 위해, GitHub Actions를 활용하여, 매주 정기적으로 LLVM 프로젝트의 최신 릴리즈 버전을 확인하고, 새로운 버전이 존재하는 경우, 자동으로 PR을 생성하여, 새로운 버전에 맞춰 패키지 버전을 업데이트하도록 설정하였습니다. 또한, 릴리즈 시점에는 `clang-format` 바이너리의 메이저/마이너/패치 버전에 따라, `clang-format-node` 패키지의 버전도 적절히 증가시키도록 하여, SemVer 규칙을 준수하도록 하였습니다. 이를 통해, 사용자가 항상 최신 버전의 `clang-format`을 사용할 수 있도록 보장하였으며, SemVer에 따른 버전 관리를 직접 경험할 수 있었습니다.
- 모노레포: [Node.js 멤버인 @avivkeller의 요청](https://github.com/lumirlumir/npm-clang-format-node/issues/60)으로 `clang-format-git` 및 `clang-format-git-python`이라는 2개의 패키지를 추가로 관리하게 되면서, 모노레포로 전환하였습니다. Lerna와 npm workspaces를 활용한 모노레포를 구성하였으며, 공통된 빌드 및 릴리즈 파이프라인을 공유하면서도, 각 패키지별로 독립적인 개발이 가능하도록 하였습니다. 개발 중간에 npm supply chain attack으로 인한 [OIDC](https://docs.github.com/en/actions/concepts/security/openid-connect) 호환성, Lerna v8 -> v9 마이그레이션 과정에서의 의존성 관리 및 복잡성 문제 등을 겪으며, "npm workspaces + 커스텀 스크립트"로 전환하는 경험을 하였습니다.
- 테스트: `clang-format-node` 프로젝트는 네이티브 바이너리를 포함하는 패키지이기에, 각 플랫폼별로 빌드된 바이너리가 올바르게 동작하는지 확인하는 것이 중요했습니다. GitHub Actions의 매트릭스 빌드 기능을 활용하여, `darwin-arm64`, `darwin-x64`, `linux-arm`, `linux-arm64`, `linux-ppc64`, `linux-s390x`, `linux-x64`, `win32-x64` 환경에서 각각 빌드된 바이너리에 대해 자동으로 테스트를 수행하도록 설정하였습니다. 이를 통해, 각 플랫폼별 호환성을 보장하고, 릴리즈 전에 잠재적인 문제를 사전에 발견할 수 있었습니다. 또한, 유닛 테스트 및 통합 테스트를 작성하여, 주요 기능들이 의도한 대로 동작하는지 검증하였습니다. 개발 중간에 [Mocha](https://mochajs.org/)에서 [Node.js 내장 테스트 러너](https://nodejs.org/api/test.html)로 전환하는 경험을 하며, 테스트 도구 선택에 따른 장단점을 직접 경험할 수 있었습니다.
- 문서화: `clang-format-node` 프로젝트의 경우 3개의 패키지를 포함하는 모노레포로 구성되어 있으며, CLI와 자바스크립트 API를 모두 지원하는 복잡한 구조였기에 단일 `README.md`가 아닌 잘 구조화된 문서가 필요했습니다. 이에 따라, GitHub Wiki -> [GitBook](https://www.gitbook.com/) -> [Nextra](https://nextra.site/) -> [Docusaurus](https://docusaurus.io/) -> [VitePress](https://vitepress.dev/) 이라는 5개의 문서화 도구를 거쳐, 최종적으로 VitePress를 사용하여 문서화하였습니다. 각 도구의 장단점을 직접 경험하고, 프로젝트에 가장 적합한 도구가 무엇인지 판단하는 능력을 기를 수 있었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`bananass`](https://github.com/lumirlumir/npm-bananass)

- Homepage: https://bananass.lumir.page/
- 릴리즈: https://github.com/lumirlumir/npm-bananass/releases

> [!IMPORTANT]
>
> 개인 오픈 소스 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

#### 개요

바나나는 자바스크립트 및 타입스크립트 기반의 알고리즘 문제 풀이를 위한 프레임워크로, 백준ㆍ코드포스 등 다양한 문제 풀이 플랫폼들의 Node.js 환경에서 반복적으로 마주치는 문제점들을 해결하며, 간결하고 편리한 사용자 경험을 제공합니다.

기존 알고리즘 문제 풀이 플랫폼들의 Node.js 환경에서는 '타입스크립트 지원 부족', 'ESM 모듈 시스템 사용 불가', 'ES2025 등 최신 자바스크립트 문법 미지원', '외부 라이브러리 사용 불가', '테스트 케이스 작성 및 검증에 대한 불편', '매번 `readline` / `fs` 템플릿 코드 복사, 붙여넣기' 등의 불편함이 존재했습니다.

이러한 부분들을 개선하기 위해, Next.js, Vite, ESLint 등 다양한 오픈 소스 프레임워크들의 설계 방식을 참고하여, 개발자 경험(DX)을 최우선으로 고려한 설계 방식을 적용하였습니다. 이를 통해, 자바스크립트 및 타입스크립트 기반의 알고리즘 문제 풀이를 위한 간결하고 편리한 프레임워크를 개발할 수 있었습니다.

현재, Experiment 단계인 `0.x` active development phase에 놓여 있습니다.

#### 기능

바나나는 자바스크립트 및 타입스크립트 기반의 알고리즘 문제 풀이를 위한 프레임워크로, 백준ㆍ코드포스 등 다양한 문제 풀이 플랫폼들의 Node.js 환경에서 반복적으로 마주치는 문제점들을 해결하며, 간결하고 편리한 사용자 경험을 제공하는 것을 목표로 합니다. 다음과 같은 주요 기능들을 제공합니다.

- 자바스크립트 및 타입스크립트 지원.
- ESM 및 CommonJS 모듈 시스템 지원.
- 백준, 코드포스 Node.js 환경에 구애받지 않는 ES2025 등 최신 문법 지원.
- 사용자 정의 모듈 및 `lodash` 등 외부 라이브러리 불러오기 지원.
- 프로그래머스처럼 `solution` 함수 하나로 시작하기 지원.
- 테스트 케이스 작성 및 실행 지원.
- `create-bananass`로 시작하기 지원.
- `fs` 모듈을 사용한 더욱 빠른 입출력 지원.
- 편의를 위한 다양한 CLI 명령어 지원.
- ESLint 및 Prettier 설정 지원.

#### 성취

- 프레임워크 설계: 자바스크립트 및 타입스크립트 기반의 알고리즘 문제 풀이를 위한 프레임워크의 설계 및 구현을 통해, Next.js, Vite, ESLint 등 다양한 오픈 소스 프레임워크들의 설계 방식을 깊이 이해할 수 있었습니다. 특히, 다양한 문제 풀이 플랫폼들의 Node.js 환경에서 반복적으로 마주치는 문제점들을 해결하는 과정에서, 개발자 경험(DX)을 최우선으로 고려한 설계 방식을 학습하였으며, 이를 통해 간결하고 편리한 프레임워크를 개발할 수 있었습니다. 또한, 프레임워크의 확장성과 유지보수성을 고려한 설계 원칙을 적용하여, 장기적으로 안정적인 프레임워크 운영에 기여할 수 있었습니다.
- CJS/ESM 모듈 시스템: Node.js 환경에서 CJS와 ESM 모듈 시스템의 차이점과 호환성 문제를 깊이 이해할 수 있었습니다. 특히, 두 모듈 시스템 간의 상호 운용성 문제를 해결하는 과정에서 다양한 트릭과 패턴을 학습하였으며, 이를 통해 Node.js 생태계에서의 모듈 관리에 대한 전문성을 키울 수 있었습니다. 이에 대한 이해는 추후 ESLint 프로젝트에서 CJS -> ESM 전환 작업에 큰 도움이 되었습니다.
- TypeScript 활용 및 타입 지원: JSDoc + JavaScript 및 TypeScript를 활용한 패키지 타입 지원 방식을 깊이 이해할 수 있었습니다. 특히, TypeScript의 타입 시스템과 JSDoc 주석을 활용하여, JavaScript 코드에 타입 정보를 제공하는 방법을 학습하였으며, 이를 통해 패키지 사용자들에게 더 나은 개발자 경험(DX)을 제공할 수 있었습니다. 또한, `tsc`, Babel, Node.js Type Stripping의 차이점을 이해하여 각각의 빌드 도구가 타입 정보를 어떻게 처리하는지에 대한 깊은 이해를 얻을 수 있었습니다.
- 번들러(Bundler): Webpack, Rollup 등 다양한 번들러의 내부 동작 원리를 깊이 이해할 수 있었습니다. 특히, 각 번들러가 모듈을 어떻게 처리하고, 최적화하는지에 대한 차이점을 학습하였으며, 이를 통해 프로젝트에 가장 적합한 번들러를 선택하고 구성하는 능력을 기를 수 있었습니다. 또한, 번들링 과정에서 발생할 수 있는 다양한 문제들을 해결하는 경험을 통해, 프론트엔드 빌드 도구에 대한 전문성을 키울 수 있었습니다.
- 트랜스파일링(Transpiling): Babel을 활용한 트랜스 파일링 방식을 깊이 이해할 수 있었습니다. [직접 Babel 플러그인을 작성](https://github.com/lumirlumir/npm-bananass/tree/main/packages/bananass/src/babel-plugins)하여, 자바스크립트 코드를 변환하는 과정을 경험하였으며, 이를 통해 Babel의 내부 동작 원리와 플러그인 시스템에 대한 깊은 이해를 얻을 수 있었습니다. 또한, `@babel/preset-env`와 같은 프리셋, 그리고 `core-js`와 같은 폴리필 라이브러리를 활용하여, 다양한 자바스크립트 환경에서 호환되는 코드를 생성하는 방법을 학습하였습니다.
- 리졸버(Resolver): CLI에서 사용자 입력을 기반으로 파일 및 모듈을 올바르게 찾는 리졸버(Resolver) 구현 방식을 깊이 이해할 수 있었습니다. 특히, Node.js의 모듈 해석 알고리즘과 파일 시스템 구조를 학습하였으며, 이를 통해 다양한 환경에서 안정적으로 동작하는 리졸버를 활용할 수 있었습니다.
- Test with Fixtures: 테스트 픽스처(Test Fixtures)를 활용한 테스트 작성 방식을 이해할 수 있었습니다. 특히, 다양한 입력 데이터와 환경 설정을 미리 정의하여, 테스트 케이스를 보다 체계적이고 재현 가능하게 만드는 방법을 학습하였으며, 이를 통해 테스트의 신뢰성과 유지보수성을 향상시킬 수 있었습니다. 또한, 테스트 픽스처를 활용하여 복잡한 시나리오를 효과적으로 검증하는 경험을 통해, 소프트웨어 테스트에 대한 전문성을 키울 수 있었습니다.
- CLI Design: 사용자 친화적인 커맨드 라인 인터페이스(CLI)를 설계하고 구현하는 방식을 깊이 이해할 수 있었습니다. 특히, 사용자의 요구사항을 반영하여 직관적이고 효율적인 명령어 구조를 설계하는 방법을 학습하였으며, 이를 통해 사용자 경험(UX)을 향상시킬 수 있었습니다. 또한, 다양한 CLI 라이브러리와 도구들을 활용하여, 기능적인 CLI를 구현하는 경험을 통해, 커맨드 라인 도구 개발에 대한 전문성을 키울 수 있었습니다.
- 의존성 관리: Node.js 통한 내장 API의 활용, 라이브러리 인라인(Inline)화, 같은 기능을 하는 더 작은 패키지로의 대체 등, 프로젝트의 `dependencies`를 관리하여, 패키지 사이즈를 줄이고, 성능을 향상시키며, 의존성 관리 부담 및 Supply Chain Attack Surface를 줄이는 방법을 학습하였습니다. 이를 통해, 패키지의 안정성과 보안성을 향상시키는 경험을 얻을 수 있었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown)

- Homepage: https://eslint-markdown.lumir.page/
- 릴리즈: https://github.com/lumirlumir/npm-eslint-markdown/releases

> [!IMPORTANT]
>
> 개인 오픈 소스 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

### 개요

저는 그동안 개인 프로젝트와 오픈 소스 활동을 이어오며 JavaScript/TypeScript를 위한 [ESLint](https://eslint.org/), CSS/SCSS 언어에 대한 [Stylelint](https://stylelint.io/), 그리고 Markdown 문서를 위한 [Markdownlint](https://github.com/DavidAnson/markdownlint)와 [Textlint](https://textlint.org/)에 이르기까지, 언어별 특성에 맞는 다양한 린터를 적극적으로 도입해 왔습니다. 하지만 여러 종류의 린터를 병용하는 과정에서 중복되는 코어 로직으로 인해 `node_modules`의 용량이 불필요하게 비대해질 뿐만 아니라, 의존성 관리도 어려워졌으며, 각 도구마다 상이한 설정 방식, 커스텀 규칙 작성 규격, 그리고 CLI 사용법을 매번 개별적으로 학습하고 셋업해야 하는 관리상의 오버헤드를 깊이 체감했습니다.

이러한 불편함을 근본적으로 해결할 방법을 고민하던 중, ESLint가 v9 이후 JSON, Markdown, CSS 등 다양한 언어에 대한 공식 지원(Language Support)을 시작하고 통합된 커스텀 규칙 작성 방식을 제공하고 있음에 주목했습니다. 저는 여기에 착안하여, 파편화된 Markdown 린팅 생태계를 ESLint라는 하나의 표준 도구로 통합함으로써 개발자 경험(DX)을 혁신할 수 있겠다는 아이디어를 구체화했습니다.

비록 ESLint core에서 Markdown 지원을 시작했으나, 이는 유지보수 비용 문제를 고려하여 필수적인 핵심 기능 위주로 구성되어 있어 실무에 필요한 풍부한 커스텀 규칙은 여전히 부족한 상황이었습니다. 이에 저는 ESLint core 프로젝트인 [`eslint/markdown`](https://github.com/eslint/markdown)의 한계를 보완하고, 기존에 `markdownlint`, `remark-lint`, `textlint` 등으로 흩어져 있던 규칙들을 ESLint 환경에 맞게 재구현하여 일괄적으로 관리할 수 있는 프로젝트를 시작했습니다. 현재 이 프로젝트는 약 20여 개의 규칙을 포함하고 있으며, `0.x` active development 단계에서 지속적으로 기능을 확장하며 Markdown 린팅의 통합된 표준을 제시하고자 노력하고 있습니다.

### 기능

`eslint-markdown` 패키지는 ESLint 환경에서 Markdown 문서를 효과적으로 린팅할 수 있도록 다양한 커스텀 규칙을 제공합니다. 현재 약 20여 개의 규칙이 포함되어 있으며, 주요 기능은 다음과 같습니다.

- ESLint 기반의 통합 린팅: Markdown 문서에 대한 린팅을 ESLint 환경에서 일관되게 수행할 수 있습니다.
- 다양한 커스텀 규칙 제공: 완전한 커스터마이징이 가능한 약 20여 개의 규칙을 통해, 문서 품질과 일관성을 높일 수 있습니다.
- 다양한 마크다운 문법 지원: 표준 마크다운 문법인 CommonMark뿐만 아니라, GitHub Flavored Markdown(GFM), Front Matter 등 다양한 마크다운 변형 문법을 지원합니다.
- 기존 린터와의 호환성: `markdownlint`, `remark-lint`, `textlint` 등 기존 린터에서 제공하는 주요 규칙들을 ESLint 규칙으로 재구현하여, 기존 규칙과의 호환성을 유지합니다.
- 개발자 경험(DX) 향상: 단일 린터 도구로 다양한 언어를 린팅할 수 있어, 설정 및 관리의 복잡성을 줄이고 개발자 경험을 향상시킵니다.

### 성취

- ESLint 플러그인 개발: ESLint의 플러그인 시스템과 커스텀 규칙 작성 방식을 깊이 이해할 수 있었습니다. 특히, ESLint의 AST(Abstract Syntax Tree) 순회 구조와 이를 활용한 코드 분석 및 변환 방법을 학습하였으며, 이를 통해 다양한 언어에 대한 린팅 규칙을 효과적으로 구현할 수 있었습니다. 또한, ESLint의 다양한 API와 유틸리티 함수를 활용하여, 효율적이고 확장 가능한 플러그인을 개발하는 경험을 얻을 수 있었습니다.
- 마크다운 표준 및 AST에 대한 이해: [CommonMark](https://commonmark.org/), [GitHub Flavored Markdown(GFM)](https://github.github.com/gfm/), [Front Matter](https://jekyllrb.com/docs/front-matter/), Math ([LaTeX](https://www.latex-project.org/)) 등 다양한 마크다운 표준과 변형 문법에 대한 깊은 이해를 얻을 수 있었습니다. 특히, 각 표준의 문법적 특징과 차이점을 학습하였으며, 이를 통해 다양한 마크다운 문서에 대한 린팅 규칙을 효과적으로 설계할 수 있었습니다. 또한, 마크다운 문서의 구조와 의미론적 요소들을 분석하는 방법을 학습하여, 보다 정교한 린팅 규칙을 구현하는 경험을 얻을 수 있었습니다.
- HTML 표준 및 AST에 대한 이해: 사용자들의 다양한 요구사항들을 마주하며 HTML 표준 및 AST에 대한 깊은 이해를 얻을 수 있었습니다. 특히, 마크다운 문서 내에 포함된 HTML 요소들을 분석하고 처리하는 방법을 깊이 이해할 수 있었으며, HTML Parser 및 이를 통한 AST를 활용하여, 마크다운 문서 내의 HTML 구조를 파악하고, 이를 기반으로 린팅 규칙을 설계하는 방법을 학습하였습니다.
- `peerDependencies` 관리: ESLint 플러그인 개발 과정에서 `peerDependencies` 및 `peerDependenciesMeta`의 `optional` 필드에 대한 중요성을 깊이 이해할 수 있었습니다. 특히, ESLint와 같은 호스트 패키지와의 버전 호환성을 유지하는 방법을 학습하였으며, 이를 통해 플러그인의 안정성과 호환성을 보장하는 경험을 얻을 수 있었습니다.
- 가독성 높은 문서 작성: 규칙에 대한 예제 코드와 상세한 설명을 포함한 문서화를 통해, 가독성 높은 기술 문서를 작성하는 능력을 향상시킬 수 있었습니다. 특히, 복잡한 개념을 명확하고 간결하게 전달하는 방법을 학습하였으며, 이를 통해 사용자들이 쉽게 이해하고 활용할 수 있는 문서를 작성하는 경험을 얻을 수 있었습니다.
- Vercel, Codecov 등 외부 서비스 연동: Vercel을 활용한 문서 사이트 배포 및 Codecov를 통한 코드 커버리지 시각화 등, 다양한 외부 서비스와의 연동 경험을 쌓을 수 있었습니다. 이를 통해, 오픈 소스 프로젝트의 품질 관리 및 사용자 경험 향상에 기여할 수 있었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`textlint-rule-allowed-uris`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris)

- 릴리즈: https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/releases

> [!IMPORTANT]
>
> 개인 오픈 소스 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

#### 개요

개인 블로그 프로젝트를 운영하며 마크다운 문서 내 이미지 URL 경로를 특정 도메인으로 제한해야 하는 기술적 요구사항을 마주했습니다. 저는 이를 해결하기 위해 자연어 및 마크다운 전용 린터인 [Textlint](https://textlint.org/)의 생태계에 주목하였고, 허용된 URI 목록을 기반으로 문서 내 링크를 검증하는 커스텀 규칙인 `textlint-rule-allowed-uris`를 직접 개발하여 배포했습니다. 이 규칙은 사전에 정의된 특정 도메인이나 URL 패턴만을 허용하고 그 외의 링크를 필터링함으로써, 문서의 신뢰성을 확보하고 일관된 데이터 출처를 유지하는 데 기여합니다.

특히 이 프로젝트는 저의 첫 오픈 소스 도전으로서, 단순한 기능 구현을 넘어 패키지 개발의 전 과정을 경험하는 중요한 이정표가 되었습니다. GitHub을 활용한 프로젝트 관리부터 CI/CD 파이프라인 구축, 릴리즈 자동화, 그리고 체계적인 문서화에 이르기까지 소프트웨어 라이프사이클 전반을 주도적으로 이끌었습니다. 이 과정에서 다양한 린터, 포매터, 테스트 프레임워크 및 CLI 도구들을 적재적소에 도입하고 최적화하며, 효율적인 개발 환경을 구축하기 위한 엔지니어링 역량과 오픈 소스 생태계에 대한 깊은 이해도를 쌓을 수 있었습니다.

#### 기능

- 화이트리스트 및 블랙리스트 방식의 URI 검증: 사전에 정의된 허용 도메인 및 URI 목록을 기반으로 마크다운 내 모든 링크와 이미지 경로를 엄격하게 검증합니다.
- 사용하지 않는 레퍼런스 감지: 문서 내에서 선언되었으나 실제로 사용되지 않는 링크들을 식별하여, 불필요한 레퍼런스를 제거할 수 있도록 지원합니다.
- 유연한 패턴 매칭 지원 및 다양한 옵션: 단순 도메인 일치 확인뿐만 아니라, 정규표현식(Regex)을 지원하여 복잡한 URL 구조나 특정 경로 패턴에 대해서도 정밀한 필터링이 가능하며, 링크, 이미지에 따른 개별 설정을 제공합니다.
- 타입 지원: TypeScript 타입을 지원하여, 타입 안전성을 보장하고 개발자 경험을 향상시킵니다.
- 최신 Textlint 생태계 호환: Textlint v14 및 v15 버전을 동시에 지원하여, 최신 메이저 버전 및 이전 버전의 라이브러리 환경 모두에서 안정적으로 동작합니다.
- CI/CD 통합 최적화: 표준화된 Textlint 규칙 인터페이스를 준수하여 GitHub Actions 등 자동화된 파이프라인 내에서 문서 린팅 단계에 즉각 도입이 가능합니다.

#### 성취

- npm 및 `package.json` 관리: `package.json` 파일의 다양한 필드와 설정 옵션들을 깊이 이해할 수 있었습니다. 특히, `main`, `module`, `types`, `files`, `engines`, `keywords`, `repository`, `bugs`, `homepage` 등, 패키지의 메타데이터와 배포 설정에 관련된 필드들을 학습하였으며, 이를 통해 패키지의 가독성과 관리성을 향상시키는 방법을 익혔습니다. 또한, `scripts` 필드를 활용하여 빌드, 테스트, 릴리즈 등 다양한 작업들을 자동화하는 경험을 얻을 수 있었습니다.
- 리포지토리 환경 설정: ESLint, Prettier, Textlint, TypeScript, Markdownlint, EditorConfig Checker 등 다양한 도구들의 설정 파일을 작성하고 관리하는 방법을 깊이 이해할 수 있었습니다. 특히, 각 도구의 설정 옵션과 구성 방식을 학습하였으며, 이를 통해 프로젝트의 코드 품질과 일관성을 유지하는 방법을 익혔습니다. 또한, 여러 도구들의 설정 파일 간의 충돌을 해결하고, 최적의 개발 환경을 구축하는 경험을 얻을 수 있었습니다.
- Pre-commit Hook: `husky` 및 `lint-staged`를 활용한 Pre-commit Hook을 활용하여, 커밋 전에 자동으로 텍스트 린팅 및 포매팅을 수행하는 방식을 이해할 수 있었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

<!--

### `moing.lumir.page` / `lumir.page`

> [!IMPORTANT]
>
> 개인 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

TODO -->

<!--

### `lumirlumir-configs`

> [!IMPORTANT]
>
> 개인 프로젝트로, 처음부터 끝까지 혼자서 기획, 설계, 개발, 배포, 운영까지 모두 담당한 프로젝트입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

TODO -->

## Open Source Contributions

> [!IMPORTANT]
>
> - 아래에 나열된 기여들은 외부 오픈 소스 프로젝트들에 대한 기여 중 일부이며, 중요도 및 대표성이 높은 기여들을 일부 선정하였습니다. 정량화하기 어려운 리뷰/논의 참여 및 중요도가 낮은 Docs/Chore/CI 등의 기여들은 대부분 포함하지 않았습니다. 자세한 내용은 [GitHub 프로필](https://github.com/lumirlumir) 및 [GitHub 기여 내역 Search](https://github.com/search?q=-org%3Alumirlumir+author%3Alumirlumir&type=pullrequests)를 참고해주세요.
> - 대부분의 기여는 중요도 및 대표성이 높은 경우 앞으로 오도록 나열하였습니다.
> - 일부 PR은 클릭할 경우, 더 자세한 내용을 확인할 수 있는 관련 Issue가 연결되어 있을 수 있습니다.

- [ESLint](https://eslint.org/): 총 [**1,800**개 이상](https://github.com/lumirlumir?from=2025-12-01&to=2025-12-31&org=eslint&year_list=1)의 기여, [**480**개 이상의 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+is%3Amerged&type=pullrequests), [**60**개 이상의 Issue opened](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+type%3Aissue&type=issues).
- [ko.react.dev](https://ko.react.dev/): 총 [**700**개 이상](https://github.com/lumirlumir?tab=overview&from=2025-12-01&to=2025-12-31&org=reactjs)의 기여, [**90**개 이상의 PR merged](https://github.com/search?q=org%3Areactjs+author%3Alumirlumir+is%3Amerged&type=pullrequests&p=1).

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslint`](https://github.com/eslint/eslint)

Find and fix problems in your JavaScript code.

> [Top 17 Contributor](https://github.com/eslint/eslint/graphs/contributors) | [77 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslint+is%3Amerged&type=pullrequests&p=1)

1. perf: improve time complexity of `getLocFromIndex` https://github.com/eslint/eslint/pull/19782<br>
행/열 정보를 인덱스 정보로 변환하는 `getLocFromIndex` 함수의 시간 복잡도를 $O(n)$에서 $O(log n)$으로 개선하여, **8배(800%) 이상**의 성능을 개선하였습니다. 특정 메소드가 오름차순으로 정렬된 배열을 탐색할 때, 선형 탐색 알고리즘을 통해 값을 찾는다는 것을 발견하여, 이를 이진 탐색 알고리즘으로 변경하였습니다. ESLint 코어에서 자주 호출되는 메소드인 만큼, 전체 성능에 미치는 영향이 컸습니다.
1. feat!: replace `chalk` with `styleText` and add `color` to `ResultsMeta` https://github.com/eslint/eslint/pull/20227<br>
터미널 ansi-styling 라이브러리인 `chalk`을 Node.js에서 지원하는 공식 API인 `styleText`로 변경하여, 패키지 크기를 100KB 줄였습니다. 매주 수천만 다운로드가 발생하는 패키지의 특성상 매주 1TB 이상의 트래픽을 절약할 수 있게 되었습니다.
1. feat: support `JSRuleDefinition` type https://github.com/eslint/eslint/pull/19604<br>
ESLint 규칙을 작성할 때, JavaScript로 작성된 규칙에 대한 타입 정의를 지원하는 PR입니다. JavaScript로 작성된 규칙에 대해서는 범용적인 타입 정의가 지원되지 않아, 사용자들이 JSDoc을 통해 타입 힌트를 얻기 어려웠습니다. 이번 PR을 통해, JavaScript로 작성된 규칙에 대해서도 타입 정의를 제공하여, 사용자들이 더 나은 DX를 경험할 수 있도록 하였습니다.
1. feat: throw error when column is negative in `getIndexFromLoc` https://github.com/eslint/eslint/pull/19831<br>
`getIndexFromLoc` 메소드에서, `loc` 인자의 `column` 값이 음수인 경우, 명확한 에러를 던지도록 하여, 디버깅 경험을 개선하였습니다.
1. fix: ensure `filename` is passed as third argument to `verifyAndFix()` https://github.com/eslint/eslint/pull/20405<br>
ESLint가 제공하는 `verifyAndFix()` API에서, `filename` 인자가 올바르게 전달되지 않는 문제를 수정하였습니다.
1. fix: handle `null` type `loc` in `getIndexFromLoc` method https://github.com/eslint/eslint/pull/19862<br>
`getIndexFromLoc` 메소드에서, `loc` 인자가 `null`인 경우를 올바르게 처리하지 못하는 문제를 수정하였습니다.
1. fix: correct typings for `loadESLint()` and `shouldUseFlatConfig()` https://github.com/eslint/eslint/pull/20393<br>
`loadESLint()` 및 `shouldUseFlatConfig()` 함수의 타입 정의가 실제 동작과 맞지 않는 문제를 수정하였습니다.
1. fix: use `MessagePlaceholderData` type from `@eslint/core` https://github.com/eslint/eslint/pull/20348<br>
ESLint 규칙 작성 시, `context.report()` 메소드에 전달하는 `data` 프로퍼티의 타입 정의를 `@eslint/core` 패키지에서 제공하는 `MessagePlaceholderData` 타입으로 변경 및 통일하였습니다.
1. fix: update `eslint-all.js` to use `Object.freeze` for `rules` object https://github.com/eslint/eslint/pull/20116<br>
ESLint 코어에서 제공하는 `all` Configuration file에서, `rules` 객체가 변경 불가능하도록 `Object.freeze`를 적용하여, 의도치 않은 변경을 방지하였습니다. 기존 타입 정의에서는 `readonly`로 지정되어 있었으나, 실제 동작에서는 변경이 가능하여, 이로 인해 발생할 수 있는 예기치 못한 버그를 사전에 방지하는 효과가 있습니다.
1. fix: correct mismatched removed rules https://github.com/eslint/eslint/pull/19734<br>
과거 ESLint에서 제거된 규칙들의 목록이 실제 제거된 규칙들과 일치하지 않는 문제를 수정하였습니다.
1. fix: update `minimatch` to `10.2.1` to address security vulnerabilities https://github.com/eslint/eslint/pull/20519<br>
ESLint가 의존하는 `minimatch` 패키지에서 발견된 보안 취약점을 해결하기 위해, `minimatch` 패키지를 최신 버전인 `10.2.1`로 업데이트하였습니다.
1. fix: update `ajv` to `6.14.0` to address security vulnerabilities https://github.com/eslint/eslint/pull/20537<br>
ESLint가 의존하는 `ajv` 패키지에서 발견된 보안 취약점을 해결하기 위해, `ajv` 패키지를 최신 버전인 `6.14.0`로 업데이트하였습니다.
1. test: replace deprecated rules in `linter` tests https://github.com/eslint/eslint/pull/20406<br>
ESLint v11에서 앞으로 제거될(Deprecated) 규칙들을 미리 테스트 코드에서 제거하는 PR입니다. 향후 릴리즈 시 발생할 수 있는 예기치 못한 문제를 미연에 방지하는 효과가 있습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/rewrite`](https://github.com/eslint/rewrite)

Monorepo for the new version of ESLint

> [Top 4 Contributor](https://github.com/eslint/rewrite/graphs/contributors) | [35 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Arewrite+is%3Amerged&type=pullrequests&p=1)

1. feat: add support for `getLocFromIndex` and `getIndexFromLoc` https://github.com/eslint/rewrite/pull/212<br>ESLint가 CommonJS 모듈 시스템에서 ESM 모듈로 옮겨 가는 과정에서, 코어를 다시 작성하고 (rewrite) 있습니다. 외부 사용자들이 ESLint 규칙을 작성할 때 도움이 되도록 ESLint는 자체적으로 유용한 유틸리티들을 제공하는데, 이 중 "행/열 정보를 인덱스 정보로 바꿔주는 유틸(`getIndexFromLoc`)" 및 "인덱스 정보를 행/열 정보로 바꿔주는 유틸(`getLocFromIndex`)" 이 존재합니다. 해당 메소드는 Naive 하게 접근하면 $O(n^2)$ 이 걸리는 메소드인데, 알고리즘 최적화, 캐싱, 지연 연산(lazy calculation)을 구현하여 최적화된 메소드로 구현하였습니다.
1. feat: make `TextSourceCodeBase` a generic type https://github.com/eslint/rewrite/pull/182<br>
`TextSourceCodeBase` 클래스를 제네릭 타입으로 만들어, 좀 더 정확한 타입 정의를 제공할 수 있도록 하였습니다.
1. feat: add support for custom name parameter to `includeIgnoreFile` https://github.com/eslint/rewrite/pull/211<br>
`includeIgnoreFile` 함수의 2번째 인자로, Ignore File의 이름을 커스텀하게 지정할 수 있도록 하였습니다.
1. fix!: remove `unstable_config_lookup_from_file` from MCP in v10 https://github.com/eslint/rewrite/pull/334<br>
ESLint가 v10으로 업데이트 되며, `unstable_config_lookup_from_file` 플래그가 제거되었습니다. 해당 플래그는 ESLint 설정 파일을 탐색하는 기능과 관련된 플래그였는데, ESLint v10에서 해당 기능이 제거되면서, MCP에서도 해당 플래그를 제거하였습니다.
1. fix: tighten types of `MergeStrategy` in `object-schema` https://github.com/eslint/rewrite/pull/348<br>
ESLint의 `object-schema` 패키지에서, `MergeStrategy` 타입이 너무 느슨하게 정의되어 있어, 사용자들이 잘못된 값을 전달할 수 있는 문제가 있었습니다. 이를 수정하여, `MergeStrategy` 타입을 더 엄격하게 지정하였습니다.
1. fix: make `data` property stricter https://github.com/eslint/rewrite/pull/327<br>
ESLint 규칙 작성 시, `context.report()` 메소드에 전달하는 `data` 프로퍼티의 타입을 더 엄격하게 지정하여, 사용자들이 더 안전하게 코드를 작성할 수 있도록 하였습니다. 기존에 별 다른 논의 없이, 외부 기여자에 의해 `Record<string, string>` 타입이 `Record<string, unknown>` 타입으로 변경되어 타입 안정성이 떨어지는 문제가 있었는데, 이를 수정하였습니다.
1. fix: update `minimatch` to `10.2.1` to address security vulnerabilities https://github.com/eslint/rewrite/pull/376<br>
ESLint가 의존하는 `minimatch` 패키지에서 발견된 보안 취약점을 해결하기 위해, `minimatch` 패키지를 최신 버전인 `10.2.1`로 업데이트하였습니다.
1. refactor: fix CI, use `zod` v4, and latest method in `mcp` https://github.com/eslint/rewrite/pull/332<br>ESLint가 MCP를 지원하는 과정에서 [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)를 의존성으로 사용하는데, 해당 의존성의 마이너 버전이 업데이트되며, 기존 빌드가 깨져 이를 수정하는 PR입니다. `@modelcontextprotocol/sdk`가 [`zod`](https://zod.dev/) v4를 지원하는 과정에서 기존 코드베이스와 충돌을 일으켜 타입 ambiguity가 발생하였고, 이를 해결하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/js`](https://github.com/eslint/js)

Monorepo for the JS language tools.

> [Top 5 Contributor](https://github.com/eslint/js/graphs/contributors) | [21 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Ajs+is%3Amerged&type=pullrequests&p=1)

1. feat: add types to ESLint Scope https://github.com/eslint/js/pull/709<br>
ESLint의 Scope Manager인 `eslint-scope` 패키지에 Type Definition을 추가하는 PR입니다. 리뷰어로 참여하여, 수십개의 코멘트를 주고 받으며 타입 정의의 완성도를 높였습니다.
1. feat: TypeScript support for Espree https://github.com/eslint/js/pull/705<br>
ESLint의 JavaScript 파서인 `espree` 패키지에 Type Definition을 추가하는 PR입니다. 리뷰어로 참여하여, 타입 정의의 완성도를 높였습니다.
1. build: remove unnecessary `@rollup/*` dev-dependencies in `espree` https://github.com/eslint/js/pull/715<br>
ESLint의 JavaScript 파서인 `espree` 패키지에서, 더 이상 사용하지 않는 `@rollup/*` 관련 개발 의존성을 제거하여, 패키지 관리의 복잡성을 줄였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/markdown`](https://github.com/eslint/markdown)

Lint JavaScript code blocks in Markdown documents.

> [Top 1 Contributor](https://github.com/eslint/markdown/graphs/contributors) | [102 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Amarkdown+is%3Amerged&type=pullrequests)

ESLint 프로젝트를 통틀어, 가장 오랜 시간을 보낸 프로젝트입니다. 2025년 4월 이후 발생한 95% 이상의 Issue 및 PR에 리뷰어로 참여하였습니다.

1. feat: support `eslint` config comments https://github.com/eslint/markdown/pull/332<br>
`<!-- eslint-disable-next-line -->`, `<!-- eslint-disable-line -->`, `<!-- eslint-enable rule/rulename -->` 등의 `eslint` 지시어를 Markdown에서 사용할 수 있도록 한 PR입니다.
1. feat: support front matter https://github.com/eslint/markdown/pull/328<br>
[CommonMark](https://commonmark.org/)와 [GFM](https://github.github.com/gfm/) 이외에, Markdown에서 자주 사용하는 비표준 스펙인 [FrontMatter](https://jekyllrb.com/docs/front-matter/) 파싱을 지원하는 PR 입니다.
1. feat: create `no-unused-definitions` rule https://github.com/eslint/markdown/pull/425<br>
Markdown 문서 내에서 정의된 링크 레퍼런스 중, 실제로 사용되지 않는 링크 레퍼런스를 찾아내는 `no-unused-definitions` 규칙을 추가하는 PR입니다.
1. feat: update `no-multiple-h1` rule to recognize JSON frontmatter https://github.com/eslint/markdown/pull/413<br>
`no-multiple-h1` 규칙에서, JSON 형식의 Front Matter를 올바르게 인식하도록 개선하는 PR입니다.
1. feat: create `no-duplicate-definitions` https://github.com/eslint/markdown/pull/360<br>
Markdown 문서 내에서 중복으로 정의된 링크 레퍼런스를 찾아내는 `no-duplicate-definitions` 규칙을 추가하는 PR입니다.
1. feat: create `no-empty-images` https://github.com/eslint/markdown/pull/357<br>
Markdown 문서 내에서 링크 텍스트가 비어있는 이미지 요소를 찾아내는 `no-empty-images` 규칙을 추가하는 PR입니다.
1. feat: handle CR and CRLF in `no-missing-atx-heading-space` https://github.com/eslint/markdown/pull/555<br>
`no-missing-atx-heading-space` 규칙에서, CR 및 CRLF 줄바꿈 문자를 올바르게 처리하도록 개선하는 PR입니다.
1. feat: add missing `mdast` types to `MarkdownRuleVisitor` https://github.com/eslint/markdown/pull/334<br>
`MarkdownRuleVisitor` 타입에, `mdast` 패키지에서 제공하는 누락된 타입들을 추가하는 PR입니다.
1. feat: export types from main entry point https://github.com/eslint/markdown/pull/520<br>
TypeScript를 사용하지 않고, JavaScript + JSDoc의 조합으로 타입을 지원하는 패키지의 특성 상, 공용으로 사용하는 Type Definition들을 메인 엔트리 포인트에서 쉽게 뽑아낼 수 없었습니다. ESM-only로 패키지를 전환한 후, 이를 쉽게 지원할 수 있게 되었습니다.
1. feat: export `MarkdownLanguage` from `index.js` https://github.com/eslint/markdown/pull/538<br>
CSS, JSON 등 다른 ESLint 플러그인들과 일관성을 맞추기 위해, `MarkdownLanguage` 타입을 메인 엔트리 포인트인 `index.js`에서 export 하도록 개선하는 PR입니다.
1. feat: fix false positives and negatives for consecutive backslashes https://github.com/eslint/markdown/pull/490<br>
`no-reference-like-urls` 규칙에서, 연속된 백슬래시(`\`) 처리와 관련된 False Positive 및 False Negative 문제를 수정하는 PR입니다.
1. feat: add support for `getLocFromIndex` and `getIndexFromLoc` https://github.com/eslint/markdown/pull/376<br>
행/열 정보를 인덱스 정보로 변환하는 `getIndexFromLoc` 및 인덱스 정보를 행/열 정보로 변환하는 `getLocFromIndex` 유틸리티 함수를 추가하는 PR입니다.
1. feat: incorrect regex pattern in `require-alt-text` and `no-html` https://github.com/eslint/markdown/pull/604<br>
`require-alt-text` 및 `no-html` 규칙에서, 일부 잘못된 정규식 패턴을 수정하는 PR입니다.
1. fix: bump `plugin-kit` to latest to resolve security vulnerabilities https://github.com/eslint/markdown/pull/485<br>
`@eslint/plugin-kit` 패키지의 버전을 최신으로 올려, 의존성 트리 내에 존재하는 보안 취약점을 해결하는 PR입니다. 기존에 존재하던 취약점은 정규표현식과 관련된 ReDoS 문제였습니다.
1. fix: `exactOptionalPropertyTypes` causes type errors when using plugins https://github.com/eslint/markdown/pull/524<br> 
`tsconfig.json`에서 `exactOptionalPropertyTypes` 옵션을 활성화한 경우, 플러그인 사용 시 타입 에러가 발생하는 문제를 수정하는 PR입니다.
1. fix: correct the return type of `applyInlineConfig` https://github.com/eslint/markdown/pull/548<br>
`applyInlineConfig` 함수의 반환 타입이 실제 동작과 맞지 않는 문제를 수정하는 PR입니다.
1. fix: allow any type for `meta.docs.recommended` in custom rules https://github.com/eslint/markdown/pull/502<br>
`meta.docs.recommended` 프로퍼티에 대해, 커스텀 규칙 작성 시 어떤 타입이든 허용하도록 개선하는 PR입니다.
1. fix: recognize `Definition` node in `no-missing-link-fragments` https://github.com/eslint/markdown/pull/603<br>
`no-missing-link-fragments` 규칙에서, `Definition` 노드를 올바르게 인식하지 못하는 문제를 수정하는 PR입니다.
1. fix: false positives for inline elements in `no-reversed-media-syntax` https://github.com/eslint/markdown/pull/597<br>
`no-reversed-media-syntax` 규칙에서, 인라인 요소에 대해 False Positive가 발생하는 문제를 수정하는 PR입니다.
1. fix: false positive triggered by HTML inside comments in `no-html` https://github.com/eslint/markdown/pull/592<br>
`no-html` 규칙에서, 주석 내부에 HTML이 포함된 경우 False Positive가 발생하는 문제를 수정하는 PR입니다.
1. fix: wrong location reporting in `require-alt-text` https://github.com/eslint/markdown/pull/574<br>
`require-alt-text` 규칙에서, 잘못된 위치 정보를 보고하는 문제를 수정하는 PR입니다.
1. fix: wrong location reporting in `no-invalid-label-refs` https://github.com/eslint/markdown/pull/545<br>
`no-invalid-label-refs` 규칙에서, 잘못된 위치 정보를 보고하는 문제를 수정하는 PR입니다.
1. fix: add `null` check and use `getLocFromIndex` in `require-alt-text` https://github.com/eslint/markdown/pull/543<br>
`require-alt-text` 규칙에서, `null` 체크를 추가해 Crash를 방지하고, 행/열 정보를 인덱스 정보로 변환하는 유틸리티인 `getLocFromIndex`를 사용하도록 리팩토링하는 PR입니다.
1. fix: handle CR in `MarkdownSourceCode` and Front Matter util https://github.com/eslint/markdown/pull/554<br>
`MarkdownSourceCode` 클래스 및 Front Matter 유틸에서, CR 줄바꿈 문자를 올바르게 처리하도록 개선하는 PR입니다.
1. fix: handle consecutive backslashes in `no-reference-like-urls` https://github.com/eslint/markdown/pull/523<br>
`no-reference-like-urls` 규칙에서, 연속된 백슬래시(`\`)를 올바르게 처리하도록 개선하는 PR입니다.
1. fix: false positives in `no-reversed-media-syntax` https://github.com/eslint/markdown/pull/521<br>
`no-reversed-media-syntax` 규칙에서, 특정 상황에서 False Positive가 발생하는 문제를 수정하는 PR입니다.
1. fix: wrong location reporting in `fenced-code-language` https://github.com/eslint/markdown/pull/518<br>
`fenced-code-language` 규칙에서, 잘못된 위치 정보를 보고하는 문제를 수정하는 PR입니다.
1. fix: handle CR in rules to follow CommonMark spec https://github.com/eslint/markdown/pull/493<br>
여러 규칙에서, CR 줄바꿈 문자를 올바르게 처리하도록 개선하여, CommonMark 스펙을 준수하도록 하는 PR입니다.
1. fix: false negatives and positives in `no-reversed-media-syntax` https://github.com/eslint/markdown/pull/473<br>
`no-reversed-media-syntax` 규칙에서, 특정 상황에서 False Negative 및 False Positive가 발생하는 문제를 수정하는 PR입니다.
1. fix: handle multiline setext headings in `no-duplicate-headings` https://github.com/eslint/markdown/pull/469<br>
`no-duplicate-headings` 규칙에서, 여러 줄에 걸친 Setext 스타일 헤딩을 올바르게 처리하도록 개선하는 PR입니다.
1. fix: case-insensitive attribute checks in `no-missing-link-fragment` https://github.com/eslint/markdown/pull/465<br>
`no-missing-link-fragment` 규칙에서, HTML 속성 검사 시 대소문자를 구분하지 않도록 개선하는 PR입니다.
1. fix: remove unused types from `types.ts` https://github.com/eslint/markdown/pull/462<br>
`types.ts` 파일에서, 더 이상 사용되지 않는 타입 정의들을 제거하여, 코드베이스의 복잡성을 줄이고 유지보수성을 향상시키는 PR입니다.
1. fix: make `meta` property optional in `Block` type https://github.com/eslint/markdown/pull/461<br>
`Block` 타입에서, `meta` 프로퍼티를 선택적으로 만들도록 개선하는 PR입니다.
1. fix: update `no-duplicate-headings` to align with CommonMark spec https://github.com/eslint/markdown/pull/438<br>
`no-duplicate-headings` 규칙을 CommonMark 스펙에 맞게 업데이트하는 PR입니다. 이로 인해, 헤딩 중복 검사 시 스펙에 정의된 규칙을 준수하도록 개선되었습니다.
1. fix: update `require-alt-text` rule to ignore commented images https://github.com/eslint/markdown/pull/385<br>
`require-alt-text` 규칙에서, 주석 처리된 이미지에 대해 alt 텍스트 요구를 무시하도록 개선하는 PR입니다.
1. fix: `no-invalid-label-refs` do not report correct position https://github.com/eslint/markdown/pull/366<br>
`no-invalid-label-refs` 규칙에서, 잘못된 위치 정보를 보고하는 문제를 수정하는 PR입니다.
1. fix: `no-missing-label-refs` rule does not respect escaping https://github.com/eslint/markdown/pull/348<br>
`no-missing-label-refs` 규칙에서, 이스케이프된 레퍼런스를 올바르게 처리하지 못하는 문제를 수정하는 PR입니다.
1. fix: enhance fenced code language rule to support tilde as a delimiter https://github.com/eslint/markdown/pull/344<br>
`fenced-code-language` 규칙에서, 물결표(`~`)를 코드 블록 구분자로 지원하도록 개선하는 PR입니다.
1. fix!: move certain types to import them from `@eslint/markdown/types` https://github.com/eslint/markdown/pull/446<br>
일부 타입들을 메인 엔트리 포인트에서 제거하는 Breaking Change PR입니다. 다른 ESLint language 플러그인들과 일관성을 맞추기 위한 변경입니다.
1. fix!: remove `/types` export https://github.com/eslint/markdown/pull/564<br>
TypeScript를 사용하지 않고, JavaScript + JSDoc의 조합으로 타입을 지원하는 패키지의 특성 상, 공용으로 사용하는 Type Definition들을 메인 엔트리 포인트에서 쉽게 뽑아낼 수 없었습니다. ESM-only로 패키지를 전환한 후, 이를 쉽게 지원할 수 있게 되어, 기존의 workaround를 제거하는 Breaking Change PR입니다.
1. refactor: use `getLocFromIndex` in `no-space-in-emphasis` https://github.com/eslint/markdown/pull/553<br>
`no-space-in-emphasis` 규칙에서, 행/열 정보를 인덱스 정보로 변환하는 유틸리티인 `getLocFromIndex`를 사용하도록 리팩토링하는 PR입니다. 100줄이 넘는 중복 코드를 제거하여, 코드의 가독성과 유지보수성을 향상시켰습니다.
1. refactor: use `getLocFromIndex` in `no-reversed-media-syntax` https://github.com/eslint/markdown/pull/541<br>
`no-reversed-media-syntax` 규칙에서, 행/열 정보를 인덱스 정보로 변환하는 유틸리티인 `getLocFromIndex`를 사용하도록 리팩토링하는 PR입니다. 50줄이 넘는 중복 코드를 제거하여, 코드의 가독성과 유지보수성을 향상시켰습니다.
1. refactor: simplify `no-bare-urls` with ESQuery selector https://github.com/eslint/markdown/pull/511<br>
`no-bare-urls` 규칙에서, ESQuery 셀렉터를 사용하여 불필요한 AST 트리 순회를 줄여, 약간의 성능 향상을 이룬 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/json`](https://github.com/eslint/json)

JSON language plugin for ESLint

> [Top 1 Contributor](https://github.com/eslint/json/graphs/contributors) | [46 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Ajson+is%3Amerged&type=pullrequests)

1. fix!: remove `rollup`, extraneous types and migrate to ESM-only https://github.com/eslint/json/pull/197<br>ESLint v10이 지원하는 Node.js 버전 범위에서 `require(ESM)`이 가능해져, CJS/ESM 듀얼 패키지에서, ESM 단일 패키지로 옮겨가는 Breaking Change PR 입니다.
1. feat!: export types from main entry and remove `/types` export https://github.com/eslint/json/pull/198<br>TypeScript를 사용하지 않고, JavaScript + JSDoc의 조합으로 타입을 지원하는 패키지의 특성 상, 공용으로 사용하는 Type Definition들을 메인 엔트리 포인트에서 쉽게 뽑아낼 수 없었습니다. ESM-only로 패키지를 전환한 후, 이를 쉽게 지원할 수 있게 되어, 기존의 workaround를 제거하는 Breaking Change PR입니다.
1. feat: add support for `getLocFromIndex` and `getIndexFromLoc` https://github.com/eslint/json/pull/109<br>
행/열 정보를 인덱스 정보로 변환하는 `getIndexFromLoc` 및 인덱스 정보를 행/열 정보로 변환하는 `getLocFromIndex` 유틸리티 함수를 추가하는 PR입니다.
1. feat: add `url` and `recommended` field to existing rules https://github.com/eslint/json/pull/104<br>
ESLint의 JSON 플러그인에서 제공하는 기존 규칙들에 대해, `url` 및 `recommended` 필드를 추가하는 PR입니다. 이를 통해, 각 규칙에 대한 문서 URL 및 권장 설정 정보를 명확하게 제공할 수 있게 되었습니다.
1. fix: program crashes in `no-unsafe-values` https://github.com/eslint/json/pull/194<br>
`no-unsafe-values` 규칙에서, JSON5 문법을 제대로 처리하지 못해 프로그램이 크래시 나는 문제를 수정하는 PR입니다.
1. fix: display raw key in the message https://github.com/eslint/json/pull/179<br>
ESLint 오류 메시지에 표시되는 키가 이스케이프된 형태로 나타나는 문제를 수정하는 PR입니다. 이제 원래의 키가 메시지에 올바르게 표시됩니다.
1. fix: correct the return type of `applyInlineConfig` https://github.com/eslint/json/pull/162<br>
`applyInlineConfig` 함수의 반환 타입이 실제 동작과 맞지 않는 문제를 수정하는 PR입니다.
1. fix: update `@eslint/core` to `v1.0.0` and adjust tests https://github.com/eslint/json/pull/190<br>
곧 다가올 ESLint v10 지원을 위해, `@eslint/core` 패키지를 `v1.0.0`으로 업데이트하고, 이에 맞게 테스트 코드를 조정하는 PR입니다.
1. fix: allow any type for `meta.docs.recommended` in custom rules https://github.com/eslint/json/pull/132<br>
`meta.docs.recommended` 프로퍼티에 대해, 커스텀 규칙 작성 시 어떤 타입이든 허용하도록 개선하는 PR입니다.
1. fix: add missing `name` property to `recommended` config https://github.com/eslint/json/pull/189<br>
`recommended` 구성 객체에 누락된 `name` 프로퍼티를 추가하는 PR입니다.
1. fix: bump `plugin-kit` to latest to resolve security vulnerabilities https://github.com/eslint/json/pull/125<br>
`@eslint/plugin-kit` 패키지의 버전을 최신으로 올려, 의존성 트리 내에 존재하는 보안 취약점을 해결하는 PR입니다. 기존에 존재하던 취약점은 정규표현식과 관련된 ReDoS 문제였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/css`](https://github.com/eslint/css)

CSS language plugin for ESLint

> [Top 2 Contributor](https://github.com/eslint/css/graphs/contributors) | [39 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Acss+is%3Amerged&type=pullrequests)

1. fix!: remove `rollup`, extraneous types and migrate to ESM-only https://github.com/eslint/css/pull/352<br>
ESLint v10이 지원하는 Node.js 버전 범위에서 `require(ESM)`이 가능해져, CJS/ESM 듀얼 패키지에서, ESM 단일 패키지로 옮겨가는 Breaking Change PR 입니다.
1. feat!: export types from main entry and remove `/types` export https://github.com/eslint/css/pull/353<br>
TypeScript를 사용하지 않고, JavaScript + JSDoc의 조합으로 타입을 지원하는 패키지의 특성 상, 공용으로 사용하는 Type Definition들을 메인 엔트리 포인트에서 쉽게 뽑아낼 수 없었습니다. ESM-only로 패키지를 전환한 후, 이를 쉽게 지원할 수 있게 되어, 기존의 workaround를 제거하는 Breaking Change PR입니다.
1. feat: add support for `getLocFromIndex` and `getIndexFromLoc` https://github.com/eslint/css/pull/167<br>
행/열 정보를 인덱스 정보로 변환하는 `getIndexFromLoc` 및 인덱스 정보를 행/열 정보로 변환하는 `getLocFromIndex` 유틸리티 함수를 추가하는 PR입니다.
1. fix: correct the return type of `applyInlineConfig` https://github.com/eslint/css/pull/281<br>
`applyInlineConfig` 함수의 반환 타입이 실제 동작과 맞지 않는 문제를 수정하는 PR입니다.
1. fix: allow any type for `meta.docs.recommended` in custom rules https://github.com/eslint/css/pull/231<br>
`meta.docs.recommended` 프로퍼티에 대해, 커스텀 규칙 작성 시 어떤 타입이든 허용하도록 개선하는 PR입니다.
1. fix: add missing `name` property to `recommended` config https://github.com/eslint/css/pull/336<br>
`recommended` 구성 객체에 누락된 `name` 프로퍼티를 추가하는 PR입니다.
1. fix: enforce unique items in the options of `prefer-logical-properties` https://github.com/eslint/css/pull/176<br>
`prefer-logical-properties` 규칙에서, 옵션 배열 내에 중복된 항목이 존재하지 않도록 강제하는 PR입니다.
1. fix: bump `plugin-kit` to latest to resolve security vulnerabilities https://github.com/eslint/css/pull/209<br>
`@eslint/plugin-kit` 패키지의 버전을 최신으로 올려, 의존성 트리 내에 존재하는 보안 취약점을 해결하는 PR입니다. 기존에 존재하던 취약점은 정규표현식과 관련된 ReDoS 문제였습니다.
1. refactor: replace `findOffsets` helper with native methods https://github.com/eslint/css/pull/272<br>
ESLint CSS 플러그인에서 사용되는 `findOffsets` 헬퍼 함수를 `getIndexFromLoc` 및 `getLocFromIndex` 유틸리티 함수로 대체하여, 코드의 일관성과 유지보수성을 향상시키는 PR입니다.
1. ci: ensure the auto-created `release-please` action runs CI https://github.com/eslint/css/pull/345<br>
자동 생성되는 `release-please` GitHub Action이 CI를 실행하도록 보장하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/code-explorer`](https://github.com/eslint/code-explorer)

ESLint Code Explorer

> [Top 3 Contributor](https://github.com/eslint/code-explorer/graphs/contributors) | [32 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Acode-explorer+is%3Amerged&type=pullrequests)

1. feat: add support for Markdown Front Matter parsing https://github.com/eslint/code-explorer/pull/92<br>
ESLint 코드 탐색기에서, Markdown 파일의 Front Matter 파싱을 지원하도록 추가하는 PR입니다. 이를 통해, Markdown 파일 내에 포함된 메타데이터를 올바르게 처리할 수 있게 되었습니다.
1. feat: add support for `allowTrailingCommas` option in JSON https://github.com/eslint/code-explorer/pull/96<br>
ESLint 코드 탐색기에서, JSON 파일을 파싱할 때 `allowTrailingCommas` 옵션을 지원하도록 추가하는 PR입니다. 이를 통해, JSON 파일 내에서 후행 쉼표를 허용할 수 있게 되었습니다.
1. feat: change ESQuery Selector placeholder text based on language https://github.com/eslint/code-explorer/pull/104<br>
ESLint 코드 탐색기에서, 사용자가 선택한 언어에 따라 ESQuery 셀렉터 입력란의 플레이스홀더 텍스트가 동적으로 변경되도록 개선하는 PR입니다.
1. fix: add missing `loc`, `comments`, `tokens` properties in JS https://github.com/eslint/code-explorer/pull/280<br>
JavaScript AST 노드에 누락된 `loc`, `comments`, `tokens` 프로퍼티들을 추가하는 PR입니다.
1. refactor: complete migration to React 19 https://github.com/eslint/code-explorer/pull/116<br>
React 18에서 React 19로 마이그레이션을 진행하였습니다. 메이저 버전이 업데이트되며 변경된 API들이 몇 개 존재하는데, 해당 API들을 모두 수정하고, 타입스크립트 타입을 업데이트하는 과정들을 거쳤습니다.
1. refactor: remove unnecessary `"use client"` `"use server"` directives https://github.com/eslint/code-explorer/pull/131<br>
더 이상 필요하지 않은 `"use client"` 및 `"use server"` 디렉티브들을 제거하여, 코드의 가독성과 유지보수성을 향상시키는 PR입니다.
1. refactor: use types from `@eslint/core` https://github.com/eslint/code-explorer/pull/223<br>
자체적으로 정의한 타입들 대신 `@eslint/core` 패키지에서 제공하는 타입들을 사용하도록 리팩토링하는 PR입니다.
1. refactor: use `defineConfig` in the default JavaScript example https://github.com/eslint/code-explorer/pull/234<br>
ESLint 코드 탐색기에서 제공하는 기본 JavaScript 예제에서, ESLint 설정을 정의할 때 `defineConfig` 유틸리티 함수를 사용하도록 리팩토링하는 PR입니다.
1. chore: remove unused `components.json` and `monaco.d.ts` files https://github.com/eslint/code-explorer/pull/183<br>
더 이상 사용되지 않는 `components.json` 및 `monaco.d.ts` 파일들을 제거하여, 코드베이스의 복잡성을 줄이고 유지보수성을 향상시키는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslint.org`](https://github.com/eslint/eslint.org)

ESLint website

> [Top 11 Contributor](https://github.com/eslint/eslint.org/graphs/contributors) | [13 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslint.org+is%3Amerged&type=pullrequests)

1. perf: introduce React Compiler to improve performance https://github.com/eslint/eslint.org/pull/720<br>
ESLint Playground 웹사이트에 React Compiler를 도입하였습니다.
1. fix: cursor jumps to start of line unexpectedly https://github.com/eslint/eslint.org/pull/745<br>
ESLint Playground 웹사이트에서, 코드 편집기 내에서 커서가 예상치 못하게 줄의 시작 부분으로 이동하는 문제를 수정하였습니다.
1. fix: unexpected `undefined` inserted when downloading config https://github.com/eslint/eslint.org/pull/833<br>
ESLint 공식 웹사이트에서, 설정 파일을 다운로드할 때 예상치 못한 `undefined` 문자열이 삽입되는 문제를 수정하였습니다.
1. fix: improve web accessibility by hiding non-semantic character https://github.com/eslint/eslint.org/pull/810<br>
ESLint 공식 웹사이트에서, 시맨틱하지 않은 문자를 숨겨 웹 접근성을 향상시키는 개선을 하였습니다.
1. refactor: complete migration to React 19 https://github.com/eslint/eslint.org/pull/740<br>
ESLint Playground 웹사이트를 React 19로 완전히 마이그레이션 하였습니다. 이로 인해, 최신 React 기능들을 활용할 수 있게 되었습니다.
1. chore: remove unused dependencies https://github.com/eslint/eslint.org/pull/855<br>
ESLint 공식 웹사이트 리포지토리에서, 더 이상 사용되지 않는 의존성들을 제거하여, 패키지 관리의 복잡성을 줄였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/workflows`](https://github.com/eslint/workflows)

Shared workflows across the ESLint organization

> [Top 1 Contributor](https://github.com/eslint/workflows/graphs/contributors) | [11 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aworkflows+is%3Amerged&type=pullrequests)

1. Which GitHub Actions should be included https://github.com/eslint/workflows/issues/4<br>ESLint가 관리하는 20개 이상의 리포지토리에서 공통으로 사용하는 GitHub Actions Workflow를 선정하고, 중앙화하였습니다. 여기에는 'Issue/PR 분류 자동화', '오래된 Issue/PR에 자동으로 댓글을 닫고 Close 해주는 Stale 자동화', '의존성 관리를 해주는 Renovate 중앙화', '스폰서 정보를 자동 업데이트 해주는 워크플로 자동화', 'bun 환경에서의 동작을 체크해주는 워크플로 자동화', 'npm/yarn/pnpm/bun 등의 여러 패키지에서의 동작을 확인해주는 워크플로 자동화' 등을 포함합니다.
1. feat: create `ci-package-manager.yml` https://github.com/eslint/workflows/pull/25<br>
ESLint 리포지토리에서, `npm`, `yarn`, `pnpm`, `bun` 등 다양한 패키지 매니저 환경에서의 동작을 확인하는 GitHub Actions 워크플로우를 추가하였습니다.
1. feat: create `ci-bun.yml` https://github.com/eslint/workflows/pull/15<br>
ESLint 리포지토리에서, `bun` 환경에서의 동작을 확인하는 GitHub Actions 워크플로우를 추가하였습니다.
1. feat: create `update-readme.yml` https://github.com/eslint/workflows/pull/12<br>
ESLint 리포지토리에서, 스폰서 정보를 자동으로 업데이트 해주는 GitHub Actions 워크플로우를 추가하였습니다.
1. feat: create `stale.yml` https://github.com/eslint/workflows/pull/8<br>
ESLint 리포지토리에서, 오래된 Issue/PR에 자동으로 댓글을 닫고 Close 해주는 Stale 자동화 GitHub Actions 워크플로우를 추가하였습니다.
1. feat: create `add-to-triage.yml` https://github.com/eslint/workflows/pull/7<br>
ESLint 리포지토리에서, Issue/PR 분류를 자동화하는 `add-to-triage` GitHub Actions 워크플로우를 추가하였습니다.
1. fix: group non-major dev-dependencies correctly https://github.com/eslint/workflows/pull/37<br>
의존성 관리 도구인 Renovate가 ESLint 워크플로 리포지토리의 비주요 개발 의존성들을 올바르게 그룹화하지 못하는 문제를 수정하였습니다.
1. fix: exclude Node.js and npm update from `eslint-app.json5` https://github.com/eslint/workflows/pull/34<br>
의존성 관리 도구인 Renovate가 `eslint-app.json5` 파일에서 Node.js 및 npm 업데이트를 제외하도록 설정을 수정하였습니다.
1. fix: move `update-readme` file generated location https://github.com/eslint/workflows/pull/32<br>
Sponsor 정보를 자동으로 업데이트하는 워크플로우에서, 공통 헬퍼 파일의 생성 위치를 이동하였습니다.
1. fix: `add-to-triage` does not work on PRs from fork https://github.com/eslint/workflows/pull/11<br>
`add-to-triage` 워크플로우가 포크된 리포지토리에서 생성된 PR에 대해 제대로 동작하지 않는 문제를 수정하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/create-config`](https://github.com/eslint/create-config)

Utility to create ESLint config files

> [Top 4 Contributor](https://github.com/eslint/create-config/graphs/contributors) | [15 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Acreate-config+is%3Amerged&type=pullrequests)

1. feat: add support for `.mts` and `.cts` extensions https://github.com/eslint/create-config/pull/173<br>
ESLint Configuration 생성 과정에서, TypeScript의 `.mts` 및 `.cts` 파일 확장자를 지원하도록 추가하는 PR입니다.
1. refactor: update `eslint` dependencies https://github.com/eslint/create-config/pull/190<br>
`eslint` 내부에서 사용하는 `eslint-config-eslint` 패키지를 최신 버전으로 업데이트 하며, 관련 린트 오류 및 기존 CI 에러를 수정하였습니다.
1. ci: fix CI errors caused by the newly released `eslint-config-xo` https://github.com/eslint/create-config/pull/186<br>
`eslint-config-xo` 패키지의 최신 버전 릴리즈로 인해 발생한 CI 오류를 수정하였습니다.
1. ci: ensure the auto-created `release-please` action runs CI https://github.com/eslint/create-config/pull/228<br>
자동 생성되는 `release-please` GitHub Action이 CI를 실행하도록 보장하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/generator-eslint`](https://github.com/eslint/generator-eslint)

A Yeoman generator to help with ESLint development

> [Top 3 Contributor](https://github.com/eslint/generator-eslint/graphs/contributors) | [16 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Agenerator-eslint+is%3Amerged&type=pullrequests)

1. feat: update plugin template to use `defineConfig` https://github.com/eslint/generator-eslint/pull/205<br>
ESLint 플러그인 템플릿에서, `ESLint` 설정을 정의할 때 `defineConfig` 유틸리티 함수를 사용하도록 업데이트하였습니다.
1. ci: workaround for a flaky test in Node.js 18.18.0 https://github.com/eslint/generator-eslint/pull/223<br>
Node.js v18.18.0 환경에서 간헐적으로 실패하는 테스트에 대한 대안을 추가하였습니다.
1. ci: resolve failure in the `release-please.yml` workflow https://github.com/eslint/generator-eslint/pull/234<br>
자동 생성되는 `release-please` GitHub Action이 실패하는 문제를 수정하였습니다.
1. chore: replace `npm-run-all` with native script https://github.com/eslint/generator-eslint/pull/224<br>
`npm-run-all` 패키지를 사용하던 스크립트를, Node.js의 네이티브 기능으로 대체하여, 불필요한 의존성을 줄였습니다.
1. chore: remove unused `yeoman-environment` dev-dependency https://github.com/eslint/generator-eslint/pull/252<br>
불필요한 `yeoman-environment` 개발 의존성을 제거하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslint-github-bot`](https://github.com/eslint/eslint-github-bot)

Plugin-based GitHub bot for ESLint.

> [Top 6 Contributor](https://github.com/eslint/eslint-github-bot/graphs/contributors) | [13 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslint-github-bot+is%3Amerged&type=pullrequests)

1. fix: auto assign is not working correctly https://github.com/eslint/eslint-github-bot/pull/220<br>
GitHub issues에서 Assignee를 자동으로 할당해주는 auto assign 플러그인이 올바르게 동작하지 않는 문제를 수정하였습니다.
1. test: migrate `jest` to v30 https://github.com/eslint/eslint-github-bot/pull/263<br>
`eslint-github-bot` 리포지토리의 테스트 프레임워크인 `jest`를 v30으로 마이그레이션 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslint-release`](https://github.com/eslint/eslint-release)

The ESLint release tool

> [Top 2 Contributor](https://github.com/eslint/eslint-release/graphs/contributors) | [13 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslint-release+is%3Amerged&type=pullrequests)

1. test: migrate `sinon` to v21 https://github.com/eslint/eslint-release/pull/87<br>
`eslint-release` 리포지토리에서 사용하는 테스트 관련 라이브러리인 `sinon`을 v21으로 마이그레이션 하였습니다.
1. test: replace `leche` helper function with native `forEach` https://github.com/eslint/eslint-release/pull/83<br>
Deprecated된 `leche` 라이브러리의 헬퍼 함수들을 네이티브 `forEach` 메서드로 대체하여, 코드의 복잡성을 줄이고 유지보수성을 향상시키는 PR입니다.
1. test: replace `chai` with Node.js `assert` to reduce dependency https://github.com/eslint/eslint-release/pull/64<br>
테스트 코드에서 `chai` 라이브러리를 제거하고, Node.js의 내장 `assert` 모듈을 사용하도록 리팩토링하여, 불필요한 의존성을 줄이는 PR입니다.
1. refactor: migrate to ESLint v9 https://github.com/eslint/eslint-release/pull/76<br>
ESLint를 v9으로 마이그레이션 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/tsc-meetings`](https://github.com/eslint/tsc-meetings)

Technical Steering Committee meeting notes, proposals, and related information

> [Top 9 Contributor](https://github.com/eslint/tsc-meetings/graphs/contributors) | [4 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Atsc-meetings+is%3Amerged&type=pullrequests&p=1)

1. chore: introduce `prettier` https://github.com/eslint/tsc-meetings/pull/641<br>
리포지토리에 코드 포매팅 도구인 `prettier`를 도입하였습니다.
1. chore: add `.git-blame-ignore-revs` https://github.com/eslint/tsc-meetings/pull/651<br>
리포지토리에 `.git-blame-ignore-revs` 파일을 추가하여, 특정 커밋들을 `git blame`에서 무시하도록 설정하였습니다.
1. chore: migrate ESLint to v9 https://github.com/eslint/tsc-meetings/pull/640<br>
리포지토리의 ESLint 버전을 v9으로 마이그레이션 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslint-transforms`](https://github.com/eslint/eslint-transforms)

> [Top 1 Contributor](https://github.com/eslint/eslint-transforms/graphs/contributors) | [13 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslint-transforms+is%3Amerged&type=pullrequests&p=1)

GitHub Actions workflows 중앙화 및 Chore 위주로 기여를 진행하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/csstree`](https://github.com/eslint/csstree)

> [8 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Acsstree+is%3Amerged&type=pullrequests)

GitHub Actions workflows 중앙화 위주로 기여를 진행하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/eslintrc`](https://github.com/eslint/eslintrc)

> [Top 5 Contributor](https://github.com/eslint/eslintrc/graphs/contributors) | [7 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aeslintrc+is%3Amerged&type=pullrequests)

GitHub Actions workflows 중앙화 위주로 기여를 진행하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/config-inspector`](https://github.com/eslint/config-inspector)

> [Top 6 Contributor](https://github.com/eslint/config-inspector/graphs/contributors) | [4 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3Aconfig-inspector+is%3Amerged&type=pullrequests)

GitHub Actions workflows 중앙화 위주로 기여를 진행하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint/.github`](https://github.com/eslint/.github)

Community health files for ESLint

> [Top 2 Contributor](https://github.com/eslint/.github/graphs/contributors) | [4 PR merged](https://github.com/search?q=org%3Aeslint+author%3Alumirlumir+repo%3A.github+is%3Amerged&type=pullrequests)

GitHub Actions workflows 및 템플릿 중앙화 위주로 기여를 진행하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint-community/eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x)

ESLint plugin about ECMAScript syntactic features.

> [Top 7 Contributor](https://github.com/eslint-community/eslint-plugin-es-x/graphs/contributors) | [5 PR merged](https://github.com/search?q=org%3Aeslint-community+author%3Alumirlumir+repo%3Aeslint-plugin-es-x+is%3Amerged&type=pullrequests)

1. feat: add `name` field to config to improve debugging experience https://github.com/eslint-community/eslint-plugin-es-x/pull/322<br>
ESLint 플러그인인 `eslint-plugin-es-x`에서, 구성 객체에 `name` 필드를 추가하여, 디버깅 경험을 향상시키는 PR입니다.
1. fix: update URLs in rule definitions to use HTTPS https://github.com/eslint-community/eslint-plugin-es-x/pull/320<br>
`eslint-plugin-es-x` 플러그인의 규칙 정의에서, URL을 HTTP에서 HTTPS로 업데이트하는 PR입니다. 이를 통해, 보안이 강화되고, 최신 웹 표준을 준수할 수 있게 되었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`eslint-community/eslint-plugin-eslint-plugin`](https://github.com/eslint-community/eslint-plugin-eslint-plugin)

An ESLint plugin for linting ESLint plugins

> [1 PR merged](https://github.com/search?q=org%3Aeslint-community+author%3Alumirlumir+repo%3Aeslint-plugin-eslint-plugin+is%3Amerged&type=pullrequests)

1. fix: downgrade the minimum supported Node.js 22 version from `22.13.1` to `22.13.0` https://github.com/eslint-community/eslint-plugin-eslint-plugin/pull/605<br>
`eslint-plugin-eslint-plugin`의 최소 지원 Node.js 22 버전을 `22.13.1`에서 `22.13.0`으로 낮추는 PR입니다. 이는 ESLint v10과의 호환성을 유지하기 위한 조치입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`vercel/next.js`](https://github.com/vercel/next.js)

The React Framework

> [Top 77 Contributor](https://github.com/vercel/next.js/graphs/contributors) | [30 PR merged](https://github.com/search?q=org%3Avercel+author%3Alumirlumir+repo%3Anext.js+is%3Amerged&type=pullrequests)

1. fix: ensure absolute paths are handled correctly with `--file` option in `next lint` command for `lint-staged` compatibility https://github.com/vercel/next.js/pull/69220<br>
`next lint` CLI 명령어에서 `--file` 옵션을 사용할 때, 절대 경로가 올바르게 처리되지 않는 문제를 수정하였습니다. 이로 인해, `lint-staged`와 같은 도구와의 호환성이 개선되었습니다.
1. fix: `getStaticProps` appears instead of `generateStaticParams` during app router build https://github.com/vercel/next.js/pull/71033<br>
App Router를 사용하는 프로젝트에서, 빌드 시 터미널에 `generateStaticParams` 대신 `getStaticProps`가 나타나는 문제를 수정하였습니다.
1. fix: `next info` command does not output the versions of `npm` `yarn` and `pnpm` correctly https://github.com/vercel/next.js/pull/71134<br>
`next info` 명령어가 `npm`, `yarn`, `pnpm`의 버전을 올바르게 출력하지 않는 문제를 수정하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`llvm/llvm-project`](https://github.com/llvm/llvm-project)

The LLVM Project is a collection of modular and reusable compiler and toolchain technologies.

> [1 PR merged](https://github.com/search?q=org%3Allvm+author%3Alumirlumir+repo%3Allvm-project+is%3Amerged&type=pullrequests)

1. [clang-format] fix: add missing `default_extensions` values to `git-clang-format` https://github.com/llvm/llvm-project/pull/117730<br>
`clang-format`의 `git-clang-format` 스크립트에서, 일부 파일 확장자가 누락되어 제대로 포매팅되지 않는 문제를 수정하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`oxc-project/oxc`](https://github.com/oxc-project/oxc)

Rust-based platform for the Web

> [1 PR merged](https://github.com/search?q=org%3Aoxc-project+author%3Alumirlumir+repo%3Aoxc+is%3Amerged&type=pullrequests)

1. fix(linter): compatibility issue with `DiagnosticData` type in ESLint https://github.com/oxc-project/oxc/pull/18396<br>
2025년 10월, 기존 ESLint 플러그인과의 호환성을 강조하며, [Oxlint는 JavaScript 플러그인을 지원](https://voidzero.dev/posts/announcing-oxlint-js-plugins)하기 시작했습니다. 이 과정에서, ESLint의 `DiagnosticData` 타입과 호환되지 않는 문제가 발생하여, 이를 수정하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`editorconfig-checker/editorconfig-checker.javascript`](https://github.com/editorconfig-checker/editorconfig-checker.javascript)

A tool to verify that your files are in harmony with your .editorconfig

> [1 PR merged](https://github.com/search?q=org%3Aeditorconfig-checker+author%3Alumirlumir+repo%3Aeditorconfig-checker.javascript+is%3Amerged&type=pullrequests)

1. fix: add support for `.zip` files in binary download https://github.com/editorconfig-checker/editorconfig-checker.javascript/pull/417<br>
`editorconfig-checker.javascript` 패키지에서, 바이너리 다운로드 시 `.zip` 파일 형식을 지원하도록 추가하는 PR입니다. EditorConfig Checker core가 v6으로 넘어가면서 바이너리 파일 압축 형식이 `.zip`으로 변경되었으나, 기존에는 이를 지원하지 않아 다운로드에 실패하는 문제가 있었습니다. 이 PR을 통해 해당 문제를 해결하였습니다.
1. ⚠️Run fails after v3.1.0 in `editorconfig-checker.javascript` https://github.com/editorconfig-checker/editorconfig-checker/issues/409<br>
앞선 fix PR과 연관된 이슈입니다.
1. ⚠️Error: Please support `.tar.gz` binary asset for Windows https://github.com/editorconfig-checker/editorconfig-checker/issues/415<br>
앞선 fix PR과 연관된 이슈입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`renovatebot/renovate`](https://github.com/renovatebot/renovate)

Home of the Renovate CLI: Cross-platform Dependency Automation by Mend.io

> [1 PR merged](https://github.com/search?q=org%3Arenovatebot+author%3Alumirlumir+repo%3Arenovate+is%3Amerged&type=pullrequests)

1. feat(replacements): add `clang-format` maintenance fork  https://github.com/renovatebot/renovate/pull/38144<br>
제가 직접 만든 `clang-format`의 대체 라이브러리인 `clang-format-node` 라이브러리를 대체 대상으로 추가하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`textlint/textlint`](https://github.com/textlint/textlint)

textlint is the pluggable linter for natural language text.

> [2 PR merged](https://github.com/search?q=org%3Atextlint+author%3Alumirlumir+repo%3Atextlint+is%3Amerged&type=pullrequests)

1. feat(@textlint/ast-node-types): add missing `LinkReference`, `ImageReference` and `Definition` node types https://github.com/textlint/textlint/pull/1459<br>
`@textlint/ast-node-types` 패키지에 누락된 `LinkReference`, `ImageReference`, `Definition` 노드 타입들을 추가하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`humanwhocodes/momoa`](https://github.com/humanwhocodes/momoa)

A JSON/JSONC/JSON5 parser, tokenizer, traverser, and printer.

> [1 PR merged](https://github.com/search?q=org%3Ahumanwhocodes+author%3Alumirlumir+repo%3Amomoa+is%3Amerged&type=pullrequests)

1. fix: add missing `LocationRange` type export https://github.com/humanwhocodes/momoa/pull/197<br>
`LocationRange` 타입이 패키지의 메인 엔트리 포인트에서 누락되어 있어, 이를 추가하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`sindresorhus/yocto-spinner`](https://github.com/sindresorhus/yocto-spinner)

Tiny terminal spinner

> [2 PR merged](https://github.com/search?q=org%3Asindresorhus+author%3Alumirlumir+repo%3Ayocto-spinner+is%3Amerged&type=pullrequests)

1. fix: Fix `clear()` method return value https://github.com/sindresorhus/yocto-spinner/pull/3<br>
문서와 달리, 특정 메소드가 `this`를 반환히지 않아 메소드 체이닝이 불가능한 문제를 수정하는 PR입니다.
1. fix: ensure default value is correctly applied in setter https://github.com/sindresorhus/yocto-spinner/pull/5<br>
클래스의 세터 메소드에서, TypeScript 오류가 발생해 이를 수정하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`material-extensions/vscode-material-icon-theme`](https://github.com/material-extensions/vscode-material-icon-theme)

Material Design icons for VS Code

> [5 PR merged](https://github.com/search?q=org%3Amaterial-extensions+author%3Alumirlumir+repo%3Avscode-material-icon-theme+is%3Amerged&type=pullrequests)

1. feat: add `websites` folder icon https://github.com/material-extensions/vscode-material-icon-theme/pull/2825<br>
`websites` 폴더 아이콘을 추가하는 PR입니다.
1. feat: ✨ `.editorconfig-checker.json` and `.ecrc` file icon https://github.com/material-extensions/vscode-material-icon-theme/pull/2665<br>
`.editorconfig-checker.json` 및 `.ecrc` 파일 아이콘을 추가하는 PR입니다.
1. feat: ✨ .clang-format-ignore file icon https://github.com/material-extensions/vscode-material-icon-theme/pull/2580<br>
`.clang-format-ignore` 파일 아이콘을 추가하는 PR입니다.
1. feat: ✨ .markdownlintignore file icon https://github.com/material-extensions/vscode-material-icon-theme/pull/2565<br>
`.markdownlintignore` 파일 아이콘을 추가하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`yuyinws/vitepress-plugin-group-icons`](https://github.com/yuyinws/vitepress-plugin-group-icons)

Enhance code blocks features for VitePress.

> [1 PR merged](https://github.com/search?q=org%3Ayuyinws+author%3Alumirlumir+repo%3Avitepress-plugin-group-icons+is%3Amerged&type=pullrequests)

1. feat: add `.mts` and `.cts` extensions to `builtin.ts` https://github.com/yuyinws/vitepress-plugin-group-icons/pull/14<br>
VitePress 코드 블럭 Icon 플러그인에서, TypeScript의 `.mts` 및 `.cts` 파일 확장자를 지원하도록 추가하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`reactjs/ko.react.dev`](https://github.com/reactjs/ko.react.dev)

React documentation website in Korean

> [Top 2 Contributor](https://github.com/reactjs/ko.react.dev/graphs/contributors) | [86 PR merged](https://github.com/search?q=org%3Areactjs+author%3Alumirlumir+repo%3Ako.react.dev+is%3Amerged&type=pullrequests) | [374 Commits](https://github.com/reactjs/ko.react.dev/commits?author=lumirlumir)

아래 나열된 기여 이외의 대부분의 기여는 번역/검수/스타일 가이드 적용 작업입니다.

1. fix: correct path handling for file name extraction in `rss.js` https://github.com/reactjs/ko.react.dev/pull/975<br>
`rss.js` 스크립트에서, 파일 이름 추출 시 경로 처리가 올바르게 이루어지지 않는 문제를 수정하는 PR입니다. Windows 및 POSIX 환경 모두에서 일관된 동작을 보장합니다.
1. feat: textlint (#971 #926) https://github.com/reactjs/ko.react.dev/pull/985<br>
React 공식 문서의 한국어 번역본에 대해, 일관된 문체와 스타일을 유지하기 위해 `textlint`를 도입하는 PR입니다. 이를 통해, 번역 품질을 향상시키고, 독자들에게 더 나은 읽기 경험을 제공할 수 있습니다.
1. feat: textlint (#971 #926) https://github.com/reactjs/ko.react.dev/pull/1017<br>
React 공식 문서의 한국어 번역본에 대해, 일관된 문체와 스타일을 유지하기 위해 `textlint`를 도입하는 PR입니다. 이를 통해, 번역 품질을 향상시키고, 독자들에게 더 나은 읽기 경험을 제공할 수 있습니다.
1. feat: introduction of `note` key value in TranslateGlossary https://github.com/reactjs/ko.react.dev/pull/1025<br>
용어집(TranslateGlossary)에 `note` 키-값 쌍을 도입하여, 각 용어에 대한 추가 설명이나 주석을 제공할 수 있도록 하는 PR입니다.
1. feat: missed script for yarn reset https://github.com/reactjs/ko.react.dev/pull/1013<br>
프로젝트 의존성을 초기 상태로 되돌리는 `yarn reset` 스크립트를 추가하는 PR입니다.
1. feat: introduction of editorconfig https://github.com/reactjs/ko.react.dev/pull/1069<br>
프로젝트 전반에 걸쳐 일관된 코드 스타일을 유지하기 위해 `.editorconfig` 파일 및 관련 설정을 도입하는 PR입니다.
1. fix: update regexp in translateGlossary.js https://github.com/reactjs/ko.react.dev/pull/1053<br>
`translateGlossary.js` 스크립트에서 사용되는 정규표현식을 업데이트하여, 용어 번역 시 더 정확한 매칭을 가능하게 하는 PR입니다.
1. fix: `stdin is not a tty` error in `husky` https://github.com/reactjs/ko.react.dev/pull/1054<br>
`yarn` 환경에서 `husky` Git hook 사용 시 발생하는 `stdin is not a tty` 오류를 해결하는 PR입니다.
1. fix: turn CRLF into LF for the errors in macOS https://github.com/reactjs/ko.react.dev/pull/1068<br>
macOS 환경에서 발생하는 줄바꿈 문제를 해결하기 위해, CRLF 줄바꿈 문자를 LF로 변환하는 PR입니다.
1. design: ux improvement in feedback.tsx https://github.com/reactjs/ko.react.dev/pull/1076<br>
피드백 컴포넌트의 UX를 개선하는 PR입니다.
1. ci: textlint test automation using husky and lint-staged https://github.com/reactjs/ko.react.dev/pull/1026<br>
커밋 시점에 `textlint` 검사를 자동으로 실행하도록 `husky` 및 `lint-staged`를 설정하는 PR입니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`reactjs/react.dev`](https://github.com/reactjs/react.dev)

The React documentation website

> [1 PR merged](https://github.com/search?q=org%3Areactjs+author%3Alumirlumir+repo%3Areact.dev+is%3Amerged&type=pullrequests)

1. ✨KOREAN(ko.react.dev) Translation Completed https://github.com/reactjs/react.dev/pull/7185<br>
React 공식 문서의 한국어 번역본인 [ko.react.dev](https://ko.react.dev/) 사이트의 번역 작업이 완료되어, 홈페이지 상의 번역 완료된 언어 목록에 한국어가 추가되었습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`typescript-eslint/typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint)

✨ Monorepo for all the tooling which enables ESLint to support TypeScript

> [1 PR merged](https://github.com/search?q=org%3Atypescript-eslint+author%3Alumirlumir+repo%3Atypescript-eslint+is%3Amerged&type=pullrequests)

문서 개선 관련 기여를 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`vitejs/vite`](https://github.com/vitejs/vite)

Next generation frontend tooling. It's fast!

> [3 PR merged](https://github.com/search?q=org%3Avitejs+author%3Alumirlumir+repo%3Avite+is%3Amerged&type=pullrequests)

문서 개선 관련 기여를 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

### [`lerna/lerna`](https://github.com/lerna/lerna)

Lerna is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.

> [3 PR merged](https://github.com/search?q=org%3Alerna+author%3Alumirlumir+repo%3Alerna+is%3Amerged&type=pullrequests)

문서 개선 관련 기여를 하였습니다.

[<kbd>Back to index ⬆️</kbd>](#index)

## 이외의 활동

- ESLint 및 한국 React 공식 문서 메인테이너로 활동하며, 지속적인 유지보수와 커뮤니티 기여를 인정받아 [GitHub Sponsors](https://github.com/sponsors/lumirlumir)를 통해 다수의 개인 후원을 받았습니다.
- 2025년 12월, [GDG (Google Developers Group) Incheon](https://ticketa.co/event/devfest-incheon-2025-bmbtaysp) 행사에서 ["모던 자바스크립트 패키지 개발하기: ESM, TypeScript, 의존성 그리고 DX"](https://docs.google.com/presentation/d/1JjQPxm2NZ4Jylirp-_GqIYGFuIkDzYra1uTNJy7pxoc/edit?usp=sharing) 라는 주제로 연사를 맡았습니다.

[<kbd>Back to index ⬆️</kbd>](#index)
