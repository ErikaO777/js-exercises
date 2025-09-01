// 問1 any関数
const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); 
console.log(isNonZero(42)); 
console.log(isNonZero(-0.5)); 


export function any(...f){
    return function(...args){ // 新しい関数を返す
        for (const fn of f) {  // 引数にとった関数分繰り返し
            if (fn(...args)) return true; // いずれかの関数が真を返したら真を返す
        }
        return false;
    }
}

// 問2 catching関数
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

export function catching(fn1, fn2){
    return function(...args){
        try {
            return fn1(...args);
        } catch (e) {
            return fn2(e);
        }
    }
}

console.log(safeJsonParse('{"a": 1}')); 
console.log(safeJsonParse("{Invalid Json}")); 
