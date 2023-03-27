## Usage

1、webpack.config.js

```
  module: {
    rules: [
      { test: /\.js$/, use: {
        loader: 'then-add-catch-loader'
      }},
    ]
  },
```

2、vue.config.js

```
  config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader').loader('babel-loader').end()
      .use('then-add-catch-loader').loader('then-add-catch-loader').end()
```

3、ts

```
  config.module
      .rule('ts')
      .test(/\.ts$/)
      .exclude.add(resolve('node_modules'))
      .end()
      .use('cache-loader')
      .loader('cache-loader')
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('then-add-catch-loader').loader('then-add-catch-loader').end()
      .use('ts-loader')
      .loader('ts-loader')
      .end()
```