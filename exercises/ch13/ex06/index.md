### jQuery Deferred について
jQuery.DeferredとはjQueryにおいて非同期処理をうまく扱うための標準モジュールのこと。JavaScriptのPromiseに似ている。Ajaxやアニメーションなどの非同期処理を扱うために使われていた。特徴としては以下。
- 非同期処理の連結の時、直列処理や並列処理が可能
- エラー処理の記述が便利
- 一連の非同期処理を関数化できる
また、jQuery.Deferredでは、非同期の処理それぞれにromiseオブジェクトを割り当てる。ゆえに、jQuery.DeferredとはjsのPromiseオブジェクトを利用したjQuery独自のモジュールだと考えられる。Promiseオブジェクトの3つの状態はDeferred.state()で取得できる。

参考：
- https://techblog.yahoo.co.jp/programming/jquery-deferred/#%E7%94%A8%E8%AA%9E%E3%81%AE%E6%95%B4%E7%90%86%EF%BC%9Adeferred%E3%81%A8promise
- https://beck23.hatenablog.com/entry/2014/11/08/022842
