### tsc
・TypeScriptの開発チームが提供しているトランスパイラ
・TypeScriptで書かれたソースコード→JavaScriptへとトランスパイルできる
・tscのトランスパイル対象となるのはJavaScriptの構文のみ
→Promiseなどの組み込みオブジェクトは対象外となる

### @babel/preset-typescript
・BabelはES2020などの最新のJavaScriptコードをIE11などのブラウザでも動作するJavaScriptコードに変換するトランパイラ
・Plugins…Babelでどのようにコードを変換するかを定義したJSのプログラム
・Presets…複数のプラグインを目的に応じてパッケージとして集約する
@babel/preset-typescriptはTypeScriptをトランスパイルするパッケージである。
tscと異なり、Promiseにも対応が可能。
注意点としては型チェックが実行されないため型の不整合が存在してもトランスパイルが成功してしまう。回避策として、Babelでのトランスパイル実行の前に事前にtscでバット型チェックをするなどがある。

参考
- https://t-yng.jp/post/tsc-and-babel
　