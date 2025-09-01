function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f(`"World"`); // Hello, World
f("1 + 2"); // Hello, 12 →表示されるのは1 + 2ではない
f("(function() { console.log(\"ABC\") }())"); // ABCとHello, undefinedどちらも表示
f("(function() { 破壊的なコード }())"); // 即時実行関数式など