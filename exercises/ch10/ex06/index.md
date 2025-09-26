### エクスポートされていないファイルをimportして実行する時
importを用いてimport "./index.js";のような形でモジュールをインポートするとき、その後にインポートされても何も実行されないはずなので、実行結果の予想は以下。
Start
Calculate...5
one
two
three
End

結果：
Calculate...5
Start
one
two
three
End

→一番初めに実行された！