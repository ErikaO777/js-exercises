### 1.クロスオリジンリクエストに制約が無かったら
たとえば、サーバサイドでAccess-Control-Allow-Originの設定をワイルドカードにしてしまった場合、どんなアクセスからも許可してしまうことになるので簡単に第三者の侵入を受け入れてしまったり攻撃の対象になりやすい。そのため許可するオリジンを適切に設定して未然に防ぐ必要がある。

### 2.リクエストの内容によってPreflightリクエストの有無が異なるのは何故か
ブラウザはサーバから帰ってきたレスポンスを見てCORS許可を判断する。
ここで登場するのがPreflightリクエストで、一見して判断が遅いように思われるこの仕組みで、事前確認を行う。
ブラウザからPreflightとしてOPTIONSリクエストをサーバに送り、CORS許可を確認。許可されていなかったらメインのリクエストは送らない。
このPreflightリクエストについて、<form>からのリクエストなどCORS誕生以前から存在しているリクエストにはPreflightリクエストは互換性を保つために発生しない。また、以下の条件を満たすシンプルリクエストと呼ばれるリクエストがある。このリクエストの際もCSRFなどのセキュリティ対策が行われていると仮定して、Preflightリクエストは発生しない。
- メソッドがGET, HEAD, POSTのいずれか
- リクエストヘッダがいずれか
    Accept
    Accept-Langage
    Content-Langage
    Content-Type
- Content-Typeのヘッダは以下のいずれか
    application/x-www-form-urlencoded
    multipart/form-data
    text/plain

参考
- なぜ、Preflight Request が発生するときとしないときがあるのか https://zenn.dev/tm35/articles/ad05d8605588bd