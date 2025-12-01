### Reactとクロスサイトスクリプティング
Reactにおいては、例えばex08で実行したような式の埋め込みは基本的に解釈されないようエスケープされる。
しかし、以下の場合などは依然危険性が残っている。
- jsスキーム
href属性は先頭がjavascriptから始まる場合はそれ以降の文字列をjavascript式として実行してしまう。
- dangerouslySetInnerHTML
innerHTMLのReact版。React公式のエスケープが無効化されてしまうオプション。


- 参考
https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de
https://qiita.com/Taira0222/items/c3ac3e7c635492d80a9f