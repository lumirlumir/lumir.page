`/hihi/`라는 정규표현식에서 hihi라는 문자열만 추출해내는 방법을 JavaScript로 구현할 수 있습니다. 
정규표현식 객체의 source 속성을 사용하면 원본 패턴 문자열을 가져올 수 있습니다. 아래에 예시를 보여드리겠습니다.

```javascript
// 정규표현식 객체 생성
const regex = /hihi/;

// 정규표현식에서 원본 패턴 문자열 추출
const pattern = regex.source;

console.log(pattern); // 출력: hihi
```

이 예제에서는 `/hihi/`라는 정규표현식 객체를 만들고, `regex.source`를 사용하여 hihi라는 원본 패턴 문자열을 추출하고 있습니다.