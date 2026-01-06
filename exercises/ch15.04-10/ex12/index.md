### 1
ActiveやCompletedのボタン押下後、以下のエラーが発生。
`
GET http://localhost:3000/ch15.04-10/ex12/all 404 (Not Found)
`
pushStateはブラウザ履歴を操作してページ遷移なしでURLを変更する。リロードなしで新しいエントリを追加する。

### なぜNot foundエラー？
pushStateは履歴を追加するだけでサーバからファイルをダウンロードしないため、リロードをしてもパスからファイルを取得できずNot Foundになる。
https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

### 2
サーバ側ですべてのリクエストに対してトップ画面を表示するような応答をする。