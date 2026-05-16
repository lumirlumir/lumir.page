네, webpack으로 시작한 React 프로젝트에서도 CSS Modules를 활용할 수 있습니다. 이를 위해서는 webpack 설정을 수정해야 합니다. 다음은 webpack 설정을 통해 CSS Modules를 적용하는 방법입니다.

### 1. 프로젝트에 필요한 패키지 설치
먼저 필요한 패키지를 설치합니다.
```bash
npm install --save-dev css-loader style-loader
```

### 2. webpack 설정 파일 수정
`webpack.config.js` 파일을 열고, CSS Modules를 지원하도록 설정을 추가합니다.
```js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 엔트리 파일 경로
  output: {
    path: path.resolve(__dirname, 'dist'), // 출력 디렉토리 경로
    filename: 'bundle.js' // 출력 파일 이름
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.module\.css$/, // .module.css 파일에 대해 CSS Modules 적용
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true // CSS Modules 사용 설정
            }
          }
        ]
      },
      {
        test: /\.css$/, // 일반 .css 파일에 대해 기본 CSS 로더 적용
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
```
