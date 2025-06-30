export function fibonacciWithWHILE() {
    let list = [];
    let i = 0;
    while (i <10){
        list.push(fib(i));
        i++;
    }
    return list;
}

export function fibonacciWithDO_WHILE() {
    let list = [];
    let i = 0;
    do {
        list.push(fib(i));
        i++;
    }while (i < 10);
   
    return list;
}

export function fibonacciWithFOR() {
    let list = [];
    for (let i = 0; i < 10; i++) {
        list.push(fib(i));
    }
    return list;
}

const fib = fibmemo();
console.log("while文", fibonacciWithWHILE());
console.log("do-while文", fibonacciWithDO_WHILE());
console.log("for文", fibonacciWithFOR());

// フィボナッチ関数
function fibmemo() {
function fib(n){
    const memo = {};
    if (n <= 1) {
        return 1;
    }
    
    if (memo[n]) {
        return memo[n];
    }

        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
    }
    return fib;
}
