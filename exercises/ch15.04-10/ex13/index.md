### hashbang
URLに入れる#!をさす。!をスラングでバンと呼ぶことからこう呼ばれる。
JavaScriptで制御されるページをGoogle Botがうまくクロールできなかったため、Googleが特別措置として仕様を作成。

### それぞれの意味
#→ Ajaxアプリケーションとして、ページ内遷移をするため。
!→ ”#”とセットにして、Googleクローラーにクロール可能なAjaxアプリとして認識させるため。

### なぜ最近見ないのか？
HTML5のpushStateに移行されたため、こちらの使用が推奨されているから。今まではハッシュ (Hashbang) を書き換えることで各サイトが JavaScriptを使って擬似的に処理していたことが、標準APIであるpushStateでできるようになった。

参考
- https://mame0112.hatenablog.com/entry/2015/06/06/025650
- https://karasuyamatengu.hatenadiary.org/entry/20110217/1297960228
- https://neos21.net/blog/2016/06/14-01.html