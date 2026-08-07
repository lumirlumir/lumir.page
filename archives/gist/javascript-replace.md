javascript의 replace 함수는 새로운 값을 반환하는거야 아니면 기존 값을 바꾸는 거야?

---

JavaScript의 `replace` 함수는 **새로운 값을 반환**합니다. 원본 문자열을 수정하지 않고, 대체된 새로운 문자열을 반환하는 방식입니다. 따라서 원본 문자열은 변경되지 않으며, 결과를 사용하려면 반환된 값을 변수에 저장하거나 즉시 사용할 수 있습니다.

예시:
```javascript
let original = "Hello, World!";
let modified = original.replace("World", "JavaScript");

console.log(original);  // "Hello, World!" (변경되지 않음)
console.log(modified);  // "Hello, JavaScript!" (새로운 문자열 반환)
```

이처럼 `replace` 함수는 새로운 문자열을 반환하며, 원래 문자열은 그대로 유지됩니다.