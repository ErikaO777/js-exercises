### 確認
hello.js,world.jsからのリクエストを応答している
`
request: GET /hello.js
request: GET /world.js
`

RICOHのアラートはindex.html内にあり。
CSPでworld.jsのリクエストを拒否して、アラートを表示しないようにする。
helloからのリクエストのみ許可。

https://qiita.com/yuria-n/items/c50a1bc0ba51f6e33215