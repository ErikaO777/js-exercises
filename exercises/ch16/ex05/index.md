## 用語
### 標準入力
指定がないときのデフォルトのデータの入力元
例）キーボード

### 標準出力
指定がないときのデフォルトのデータの出力先
例）PC画面

### 標準エラー出力
指定がないときのデフォルトのエラーの出力先

### リダイレクト
あるページからあるページに転送すること

### パイプ
半角縦棒（|）のことで、この記号でつなぐことで前のコマンドの出力を次のコマンドの入力として渡す仕組みのこと。

参考
- https://wa3.i-3-i.info/index.html

## 実験
cat.mjsの中身は指定されたファイルを読み取りその内容を標準出力すること。
### 1 node cat.mjs
予想：ファイルの指定がないためprocess.stdin.pipe(process.stdout);が実行されるが、データを渡していないので空が表示される。
結果：何も表示されない

### 1 echo FOO | node cat.mjs
予想：ファイルの指定がないためprocess.stdin.pipe(process.stdout);が実行され、FOOがコマンドラインに示される。
結果：FOOがコマンドライン表示

### 2 node cat.mjs > output2.txt
予想：>はリダイレクトを意味し、標準出力されるところをoutput.txtに出力されるので、空のoutput.txtが作成される。
結果：空のoutput.txtが生成された。

### 3 node cat.mjs hello.txt 
予想：ファイルが指定されているのでhello.txtのテキストをコマンドラインに出力する。
結果：Hello worldがコマンドライン出力された。

### 4 node cat.mjs file > output4.txt
予想：ファイルが指定かつ、出力先が指定されているのでhello.txtの中身がoutput4.txtに出力される。
結果：Hello worldと記載されたoutput4.txtが作成された。

### 5 node cat.mjs invalid-file > output5.txt
予想：存在しないファイルの読み込みが指定されているのでエラーになる。
結果：以下エラー。さらに空のoutput5.txtも作成された。
`
Emitted 'error' event on ReadStream instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\r00528102\\Desktop\\js研修\\js-exercises\\exercises\\ch16\\ex05\\invalid.txt'
}
`

### 6 node cat.mjs invalid-file 2> error.txt
予想：2>はエラーが起きた場合の処理を指すので、挙動は5と同じだがエラー内容がerror.txtに出力される。
結果：5と同じエラーがerror.txtに出力された。
