## npx利用のメリット

### そもそもnpxとは？
node package executerの略でパッケージの実行ツールのこと。npmとの違いはインストールされていないパッケージでも、自動的に探して勝手にインストールをし実行して、実行後はそのパッケージの削除まで行うこと。イメージはnpmがパッケージの管理ツールなのに対し、npxはパッケージの実行ツールであること。

### 例
一時的な実行
```
npx create-react-app my-app
```
このとき、create-react-appが一時的にダウンロードされ実行し、そのあと削除される。

### メリット
npmと大きく違うのはパッケージの有無に関わらず自動でインストールされて実行される点なので、よく使うパッケージであればnpmでインストールをし、使用頻度が低いものはnpxでの一時実行がよいと考えられる。

参考
- https://qiita.com/kohta9521/items/ee3ed4a2360add80ad79
- https://zenn.dev/ryuu/articles/what-npxcommand
- https://unikoukokun.jp/n/nf9484f53c237+