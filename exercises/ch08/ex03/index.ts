// 問2

function factorial(n: number) {
  function iter(product: number, counter: number) {
    if (counter > n) {
      return product;
    }
    return iter(product * counter, counter + 1);
  }
  return iter(1, 1);
}

console.log(factorial(100000));

// 以下エラー
// [ERR]: "Executed JavaScript Failed:" 
// [ERR]: Maximum call stack size exceeded 