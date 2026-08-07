# SCSS to CSS Migration

## Why?

- 학습 곡선에 대한 부담.
- 과도한 warning. 시간이 지난 scss 프로젝트를 다시 관리하기 시작하고, sass의 버전을 업하는 순간 수 많은 deprecation warning에 압도됨.
- SCSS라는 전처리기의 마법 때문에 CSS 표준이 아닌 문법들을 자주 접하게 되고, 이러한 discrepancy가 앞으로 표준이 될 표준 CSS 문법에 대한 접근성을 낮추고, 표준이 아닌 비표준에 익숙해지는게 별로 맘에 들지 않음. 또한, SCSS에서 추가로 제공해주는 함수 등 비표준에 너무 익숙해져 native css를 오랜만에 접했을 때 그 간극을 느낌.
- SCSS를 좋아했던 이유는 CSS 문법과 유사한 구조를 활용하면서도 JavaScript와 TypeScript의 관계처럼 Superset의 느낌으로 활용할 수 있어서였는데, CSS Nesting을 Newly Available로 활용할 수 있고, postcss나 lightningcss에서 syntax lowering을 적절히 지원해줘, 더 이상 필요성을 못느끼는게 큼.
- Next.js의 SCSS -> CSS -> PostCSS를 거치는 css 파일 emitting 과정에서 불필요한 SCSS 오버헤드를 줄여서 빌드 속도 향상을 도모.

## How?

- `*.module.scss` 및 `*.scss` 파일들을 모두 `*.module.css` 및 `*.css`로 변경.
- [ ] nesting 문법 마이그레이션: 기존에 사용하던 nesting 패턴은 거의 대부분 호환 됨. 단, 내부에 사용하던 일부 at rule들이 정상 동작하지 않아 해당 부분들은 추가적인 고려가 필요했음.

- CSS Nesting at rules: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/At-rules#nesting_media_at-rule>

- [ ] `@keyframes`를 활용한 nested animation: `@keyframes`는 공식 CSS nesting에서 아직 nesting 문법을 사용할 수 없는 at rule이기에, `styles/animation.css` 파일에 전역적으로 사용할 애니메이션들을 명시한 다음 `styles/index.css`에서 `@import`로 뽑아 낸 다음 사용.
- [ ] `@media` 마이그레이션: `stylelint`로 `640px`, `768px` 등 강제. `@custom-media`는 사용하려고 했지만, `module.css`에서는 `@custom-media`가 외부 의존성 없이 파일 최상단에 insert되지 않아서 불가능: <https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media#modular-css-processing> / 추가로, css는 현재 newly available로 곧 widely available이 될 예정.
- [ ] 브라우저 호환성: `postcss`의 [`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/sites/postcss-preset-env) 혹은 `lightningcss` 등이 자동으로 syntax lowering을 진행해줘서 기본적인 기능들은 모두 무리없이 사용할 수 있다. Next.js와 Vite 모두 내부적으로 postcss를 사용하고 있기에, 편리하게 사용할 수 있다. (<https://nextjs.org/docs/app/api-reference/config/next-config-js/useLightningcss>)
- [ ] `@mixin`, `@include`: 믹스인 함수 및 `@include`를 사용하던 문법들은 모두 untility class로 변환.  아직 CSS의 규모가 그렇게 크지 않아, custom utility class로 모두 커버가 가능한 상황이라 외부 의존성을 줄이고 빌드 파이프라인 속도를 늦추지 않기 위해 native로 구현. 단, 이후 기능이 확장되면 tailwind로 마이그레이션 해도 좋을 듯.

```scss
$screen-breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  2xl: 1536px,
);

@mixin screen($breakpoint) {
  @media (min-width: map.get($screen-breakpoints, $breakpoint)) {
    @content;
  }
}
```

- [ ] SCSS variable: 모두 `var(--custom)` 문법을 사용하는 native CSS로 변환.

## Result

- HMR 속도 개선:
- 빌드 속도 감소: 불필요한 SCSS 전처리 시간을 줄임.
- `node_modules` 설치 시간 감소: `npm install` 시, 평균 XX초 걸리던 설치 속도를 평균 XX초로 줄임.
  - `sass` 및 `stylelint-config-standard-scss`를 제거할 수 있게 되어 각각 peerdepenencies 제외 7.6MB, 2.9MB 패키지를 없앨 수 있게 됨. 정확한 용량 비교는 dedupe까지 고려해야 하기에 대략적인 참고자료로 활용.
- stylelint 린트 시간 감소

## Caution?

- Playwright Screenshot 모드 등을 통해 이전에 SCSS를 활용했을 때의 모습을 스냅샷으로 찍어둔 뒤, CSS로 마이그레이션 했을 때의 모습과 비교하는 것을 추천. SCSS 파일을 전처리하는 과정에서 CSS와 미묘한 gap이 생겨 UI가 미묘하게 틀어질 수 있음
