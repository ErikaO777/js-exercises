### アクターモデル
アクターモデルはアクター同士が互いにメッセージを非同期に送りあうことでスケーラビリティを保ちながら並行処理を行うモデルのこと。

### メモ
- Atomicは共有の配列に対してスレッドセーフにアクセスできる
- スレッド間でのデータのやり取り https://qiita.com/suin/items/8fb7f77dd0a994b6f524
- 元コードではメインとサブでそれぞれ1000m万回ずつのインクリメントを行っている
- Atomics.load(sharedArray, 0)は2000万
- アクターモデル https://zenn.dev/kuramapommel/articles/self-study_actor-model-using-akka