## package-lock.jsonの役割とコミット

### package-lock.jsonとは？
依存関係のパッケージのバージョン詳細を記載したファイルのこと。
インストールした際のパッケージのバージョンが異なるためアプリケーションの動作保証ができない問題を解決する。package-lock.jsonがあると、npｍ installをしたときに自動でnode_moduleを生成せずpackage-lock.jsonを利用してnode_moduleを生成する。

### リポジトリへのコミット
チーム開発においてはチーム間での環境を合わせるためコミットはしておいた方がよい。依存関係を固定し、統一することができる。

参考
- https://qiita.com/phoby20/items/ca17d96bbf0da0b9989e
‐ https://www.reddit.com/r/learnprogramming/comments/nvdoq6/should_i_push_packagelockjson_to_git/?tl=ja