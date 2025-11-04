## どの部分が実行されるのかを調査

### 明示的にイテレータプロトコルの next() を呼び出す
イテレータ：
```
counterIter: next
{ value: 1, done: false }
```

ジェネレータ：
```
counterGen: next
{ value: 1, done: false }
```
どちらも、直接next()を呼び出してnext()を実行できる。
### 明示的にイテレータプロトコルの return() を呼び出す
イテレータ：
```
counterIter: return: 終了
{ value: '終了', done: true }
```
next同様に、done:trueになっておりreturn()が呼ばれ終了している。

ジェネレータ：
```
counterGen: finally
{ value: '終了', done: true }
```
ジェネレータはreturnを呼ぶとfinallyブロックの中が実行される。
### 明示的にイテレータプロトコルの throw() を呼び出す
イテレータ：
```
counterIter: throw: Error: 例外発生
```
throw()が呼ばれる。
ジェネレータ：
```
file:ch12/ex01/index.js:62
console.log(gen.throw(new Error("例外発生")));
```
"counterGen: catch:"は出力されず、エラー
### for-of ループを実行
イテレータ：
```
counterIter
counterIterのループ
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: next
3
counterIter: next
4
counterIter: next
5
counterIter: next
counterIterのループ完了
```
ジェネレータ：
```
counterIter
counterGenのループ
counterGen
counterGen: next
1
counterGen: next
2
counterGen: next
3
counterGen: next
4
counterGen: next
5
counterGen: finally
counterGenのループ完了
```
for-ofを用いて実行すると、イテレータはnext()野中が実行され、ジェネレータはyieldの値が返される。
### for-of ループを実行途中で break
イテレータ：
```
counterIter
counterIterのループ-途中で break
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
counterIterのループ-途中で break 完了
```
イテレータはbreakしたときにreturn()が呼ばれる。
ジェネレータ：
```
counterGenのループ-途中で break
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
counterGenのループ-途中で break 完了
```
ジェネレータはfinallyブロックが呼ばれる。
### for-of ループを実行中に例外発生
イテレータ：
```
counterIter
counterIterのループ-途中で例外発生
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
file:ch12/ex01/index.js:81
    throw new Error("例外発生");
```
breakされた時と同様に、return()が呼ばれる。
ジェネレータ：
```
counterIter
counterGenのループ-途中で例外発生
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
file:ch12/ex01/index.js:111
    throw new Error("例外発生");
```
中身は実行されていないが、最初にイテレータが呼ばれている。

メモ：Symbol.iteratorを定義することでobjをイテラブル（反復可能）オブジェクトにする