### 結果
適切なintegrityを付けたときは正しく読み込まれ、そうでないintegrityを付けたときは以下のエラーが表示されscriptの中身は実行されなかった。
`
Error parsing 'integrity' attribute ('error'). The hash algorithm must be one of 'sha256', 'sha384', 'sha512', or 'ed21159', followed by a '-' character.
`

### integrityについて
javascriptやcssはCDNなどから取得した外部スクリプトを読み込むことができる。この際、使用する外部スクリプトが第三者によって改ざんなどされていないかを検証することができるのがintegrityである。これによってインジェクション攻撃（外部から不正な文字列を与え、システムを乗っ取る）を防御することができる。

- 参考
https://web.havincoffee.com/html/tag/script/integrity.html