### Youtubeが表示されない理由
トップページ（"https://www.youtube.com/"）の埋め込みは不可能で、 https://www.youtube.com/embed/VIDEO_IDのURLを使う必要がある。また、iframe内のDOMへ直接アクセスすることは同一オリジンポリシーで禁止されている。よって表示が拒否されてしまう。

### 同一オリジンポリシーとは
オリジンとはプロトコル（http://など）、ホスト名（example.comなど）、ポート番号（:80、:443など）の3要素で構成されるもの。同一オリジンポリシーでは同じオリジンのリソースにしか自由にアクセスできない仕組みのセキュリティ機構のこと。

### iframeタグとは
HTMLの中に別のHTMLを埋め込めるもの。

### クリックジャッキング
Webサイト上に偽のボタンを配置し、ユーザーを視覚的に騙してクリックして誘導する手法のこと。
これにより、ログインの必要なサイトで、ログイン後に利用者しか行えない操作が第三者によって介入されてしまったり、利用者の情報が抜かれてしまうなどの脅威がある。

- 参考
https://www.hitachi-solutions-create.co.jp/column/security/click-jacking.html
https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html
