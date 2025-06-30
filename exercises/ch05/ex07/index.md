### try-finally
#### 予想
finallyはtryの後に必ず実行され、また実行されるタイミングはtryの中でreturn分が実行された後＝tryブロックの実行が終了されたときに行われる。よってtryブロックのreturn trueで正常に実行が完了し、finallyブロックに移動する。ここで、finallyブロックにおいてreturnでfalseを返す場合、returnによって呼び出し元に正常に戻るので、結果はfalseで上書きされ、最終的な実行結果はfalseとなる。

#### 結果
false