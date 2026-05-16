babel‑loader 와 polyfill 은 서로 보완하지만 역할이 완전히 다릅니다.

babel‑loader

컴파일 타임에만 동작
최신 JavaScript 문법(import/export, optional chaining, class fields 등)을
타겟 환경(Node 14)에서 이해할 수 있는 문법(예: CommonJS, ES5)으로 변환
문법 트랜스파일( syntax transform)만 수행하며, 프로토타입 메서드나 전역 API를 만들어 주진 않음

polyfill

런타임에 동작
Array.prototype.toSorted, Promise.finally, globalThis 같은
누락된 API를 전역 객체나 빌트인 프로토타입에 추가
코드 자체를 변형하지 않고 존재하지 않는 함수·속성을 채워 줌

요약하면
• babel‑loader → “이 코드를 어떻게 다시 써야(구문 변환) 실행할 수 있을까?”
• polyfill   → “이 함수나 속성이 없으면 런타임에 실행이 안 되니까 직접 만들어 주자”
