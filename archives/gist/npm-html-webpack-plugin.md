webpack에서 html-webpack-plugin의 역할에 대해서 자세히 알려줘

---

Webpack에서 `html-webpack-plugin`은 중요한 역할을 하며, 여러 가지 작업을 자동화하는 데 도움을 줍니다. 이 플러그인의 주요 기능은 다음과 같습니다:

1. **HTML 파일 생성**: Webpack 빌드 프로세스 동안 HTML 파일을 자동으로 생성합니다. 이 HTML 파일은 개발자가 직접 작성하지 않고도 Webpack의 아웃풋을 포함할 수 있게 합니다.

2. **스크립트 자동 삽입**: 빌드된 자바스크립트 번들을 HTML 파일에 자동으로 삽입합니다. 번들 파일명에 해시를 추가하는 경우(캐시 관리를 위해) 해당 스크립트 태그의 소스 경로도 자동으로 업데이트됩니다.

3. **커스터마이징**: `html-webpack-plugin`은 기본 HTML 템플릿을 사용자가 제공한 템플릿으로 대체할 수 있게 해줍니다. 이를 통해 HTML 파일의 레이아웃이나 추가적인 메타 데이터, 링크 등을 커스터마이징할 수 있습니다.

4. **성능 최적화**: 플러그인은 여러 최적화 옵션을 제공합니다. 예를 들어, CSS와 JS 파일을 압축하거나 병렬로 로드할 수 있도록 `link` 태그와 `script` 태그에 특정 속성을 추가할 수 있습니다.

5. **여러 HTML 파일 처리**: 프로젝트에 여러 페이지가 있는 경우, 각 페이지에 대한 HTML 파일을 생성하기 위해 여러 인스턴스를 사용할 수 있습니다. 각 페이지는 서로 다른 자바스크립트 진입점을 사용할 수 있습니다.

`html-webpack-plugin`을 사용하는 방법은 다음과 같은 간단한 예제를 통해 살펴볼 수 있습니다:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/template.html' // 사용자 정의 HTML 템플릿
    })
  ]
};
```

위 예제에서는 `entry` 포인트를 정의하고, `output`을 통해 번들 파일의 위치와 이름을 설정합니다. `plugins` 배열에 `HtmlWebpackPlugin` 인스턴스를 추가하여 HTML 파일 생성을 자동화합니다. 여기서 `template` 옵션을 사용해 기본 HTML 템플릿 대신 사용자 정의 템플릿을 지정할 수 있습니다.

이 플러그인을 사용함으로써, 웹팩의 다양한 빌드 과정과 관련된 파일들을 효율적으로 관리하고 자동화할 수 있어, 웹 개발의 생산성을 크게 향상시킬 수 있습니다.