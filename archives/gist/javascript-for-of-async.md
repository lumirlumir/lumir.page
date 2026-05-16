`Promise`를 직접 사용하지 않고, async/await 문법을 활용하면서 코드 흐름을 더 깔끔하게 작성할 수 있습니다. 각 파일의 태그 처리 부분을 함수로 분리하고, `Promise.all` 대신 `for...of` 루프를 사용하여 순차적으로 처리할 수 있습니다. 이렇게 하면 가독성을 높일 수 있습니다. 아래는 해당 코드를 개선한 버전입니다:

```ts
export async function readTagTree(dirPath) {
  const tagTree = {}; // 태그 트리를 저장할 빈 객체 초기화
  const markdownFilePaths = await readDirByExtension(dirPath, md);

  // 각 파일의 태그를 처리하는 함수 분리
  async function processMarkdownFile(markdownFilePath) {
    const { tags } = await readFileForMarkdown(join(dirPath, markdownFilePath), 'data');
    
    tags.forEach(tag => {
      tagTree[tag] = tagTree[tag] ?? [];
      tagTree[tag].push(markdownFilePath);
    });
  }

  // 비동기 작업을 순차적으로 처리하기 위해 for...of 사용
  for (const markdownFilePath of markdownFilePaths) {
    await processMarkdownFile(markdownFilePath);
  }

  return tagTree;
}
```

### 개선 사항:
1. `processMarkdownFile` 함수로 각 파일의 태그 처리를 분리하여 코드의 가독성을 향상시켰습니다.
2. `for...of`를 사용해 `Promise.all` 대신 파일을 순차적으로 처리합니다. 이 방법은 큰 성능 차이는 없지만 코드 흐름이 직관적으로 보일 수 있습니다.
3. 비동기 함수 안에서 `Promise`를 직접 사용하는 대신 `await`만으로 동기적인 흐름처럼 작업을 처리할 수 있게 되었습니다.

---

왜 for of는 사용 가능한데, map은 직접적으로 비동기 작업을 처리하지 못해?

---

`for...of`와 `map`의 차이는 **비동기 작업 처리 방식**에서 비롯됩니다. 두 가지 방식 모두 배열을 순회하는 데 사용되지만, 비동기 작업을 처리하는 흐름에서는 중요한 차이가 있습니다. 이 차이를 이해하기 위해 `for...of`와 `map`의 내부 동작 방식을 살펴보겠습니다.

### `for...of`와 비동기 처리

`for...of`는 일반적인 반복문처럼 동작하며, 각 반복마다 명시적으로 `await`을 사용할 수 있습니다. 이 방식은 각 비동기 작업이 **완료된 후** 다음 반복으로 넘어가기 때문에 순차적으로 실행됩니다. 즉, 비동기 작업이 완료될 때까지 기다렸다가 다음 작업을 처리할 수 있습니다.

#### 예시:
```ts
for (const item of items) {
  await asyncFunction(item);
}
```

이 코드는 각 `asyncFunction(item)`이 완료될 때까지 기다린 후 다음 아이템을 처리하므로, 코드의 흐름이 직관적으로 동작합니다.

### `map`과 비동기 처리

`Array.prototype.map()`은 기본적으로 배열의 각 요소에 대해 함수를 실행한 결과를 새로운 배열로 반환하는 함수입니다. 중요한 점은 **동기적으로** 동작한다는 점입니다. 즉, `map`은 각 요소에 대해 콜백 함수를 호출한 후 결과 배열을 반환하지만, **비동기 작업의 완료 여부를 기다리지 않습니다**.

비동기 함수가 `map` 내에서 호출되면, `map`은 그 즉시 `Promise` 객체를 반환하며, 비동기 작업이 실행되는 동안 기다리지 않고 넘어가 버립니다. 따라서, `map`을 사용할 경우 **비동기 작업을 병렬로 처리**하게 되며, 각 작업의 완료를 기다리지 않는 방식으로 동작합니다. 이를 해결하기 위해 `Promise.all`과 결합하여 모든 작업이 완료될 때까지 기다릴 수 있습니다.

#### 잘못된 예시:
```ts
items.map(async (item) => {
  await asyncFunction(item);
});
```
위 코드는 비동기 작업을 **병렬로 실행**하지만, `map` 자체는 동기적으로 바로 반환되므로 `asyncFunction(item)`의 결과를 기다리지 않습니다. 이를 해결하기 위해 `Promise.all`로 처리해야 합니다:

#### 해결 예시:
```ts
await Promise.all(items.map(async (item) => {
  await asyncFunction(item);
}));
```
이 방식은 각 비동기 작업을 병렬로 실행하고, 모든 작업이 완료될 때까지 기다리는 것입니다.

### 핵심 차이점

- `for...of`: 각 비동기 작업을 **순차적으로** 처리합니다. `await`를 사용하면, 각 작업이 완료될 때까지 기다렸다가 다음 작업을 실행하는 구조입니다.
- `map`: 기본적으로 **병렬 실행**이 되며, `await`를 직접 사용할 수 없으므로 `Promise.all`로 감싸서 모든 비동기 작업이 완료될 때까지 기다릴 수 있습니다.

### 상황에 따른 선택
- **순차적 실행**이 필요하다면 `for...of`가 적합합니다.
- **병렬로 비동기 작업을 실행**하고, 모든 작업이 끝난 후 처리하고 싶다면 `map` + `Promise.all`을 사용하는 것이 좋습니다.

이 차이로 인해 `map`은 직접적으로 비동기 처리를 하지 못하고, `for...of`는 `await`를 사용할 수 있어 비동기 처리가 가능한 것입니다.
