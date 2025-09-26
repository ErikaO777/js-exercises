### JSのモジュール
基本的にはCommonJSとES Moduleの2種類であり、歴史的な背景から誕生したものの恐らく使う場面はほとんどないが、以下のようなモジュールがある。
## AMD(Asynchronous Module Definition)
クライアント（ブラウザ）でモジュール形式が使えるようにした仕様になっている。
元はCommonJSプロジェクトのTransport/Cという規格提案(JavaScriptモジュールをブラウザに効率よく読み込ませるための提案のひとつ)としてスタートした。
書き方の例は以下。
`
define('Module1', [], function() {
  function func(a, b) {
    return a * b;
  }
  return func;
});

define('Module2', ['Module1'], function(module1) {
  function func() {
    // 15
    return module1(3,5);
  }
  return func;
});
`
definie(モジュール名、[依存関係]、func(依存関係のモジュール))で定義する。
また、AMDのデメリットは記述が複雑であること、依存関係が複雑になりやすいこと、またES Moduleが出てきて時代遅れになっり使う機会が減った。

参考：
https://qiita.com/qnighy/items/0c3fd208e0356fa19cda
https://zenn.dev/ebi_yu/scraps/db4c7d1f3e883a