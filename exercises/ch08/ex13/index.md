### Function()の危険性
```
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```

index.jsで上記のコードの動作確認より、inputに即時実行関数を入れた場合、それが実行されてしまう危険性がある。ゆえに、悪意のある第三者から何か破壊的なコードやセキュリティリスクのあるコードを入力された場合にもそれが実行されてしまう恐れがある。