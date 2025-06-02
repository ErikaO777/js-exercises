//フィボナッチ数列
//f0=0, f1=1, f(n) = f(n-1) + f(n-2)

export function fib(n) {
    if (n <2) {
        return n; 
    }
    if (n >= 2){
        return fib(n - 1) + fib(n - 2);
    }
 }