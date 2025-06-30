### for文のなかのtry-catch-finally
#### 予想
まず、for文の中でx=1;が評価された後try文でスローが呼び出されているためcatchブロックに移動する。catchブロックではbreak;されており、breakは一番内側だけのfor文を終わらせる。しかし、catchでbreak;が実行された後はfinallyブロックに移動し、ここではcontinue;が記述されている。finallyで移動があるような構文があると、処理中の動作はこのブロックの動作で置き換わるので、最終的にcontinueによってfor文のインクリメントが評価され、繰り返しを判断する。ゆえに、try-catch-finallyは影響を与えず、結果は5とコンソール出力される。

#### 結果
5