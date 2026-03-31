### 1
- NodeはFlowを理解できないためそのままFlowで書かれているtask_with_flow.jsを実行するとエラー
- Flowで書かれたjsファイルからflow-remove-typesを使ってflow構文を除去したtask.flow.jsを作成

### 2
- Flow構文をそのまま用いるにはプラグイン設定
- @babel/plugin-transform-flow-strip-typesを使う（@babel/nodeは CommonJSモードでの方が使いやすそう？）