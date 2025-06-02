const obj1 = {x: 1};
obj1.y = 2;
console.log(obj1);

const obj2 = {x: 1, y: 2};
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
// true→　false
console.log(obj1 === obj2);

//equals関数
export function equals(o1, o2) {
    if (o1 === o2) {
        return true;
    }else if ( typeof o1 !== "object" || typeof o2 !== "object" || o1 === null || o2 === null) {
        return false;
    }else if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }else {
        for (const key in o1) {
            if (!o2.hasOwnProperty(key) | !equals(o1[key], o2[key])) {
                return false;
            }
        }
        return true;
    }
}

// 参考
// 厳密等価なら true
console.log(equals(42, 42)); // true
console.log(equals(null, null)); // true

// 厳密等価ではない場合オブジェクト以外が指定されれば false
console.log(equals({x: 42}, 42)); // false
console.log(equals(null, {x: 42})); // false

// プロパティの数・名前が一致しなければ false
console.log(equals({x: 1}, {y: 1})); // false
console.log(equals({x: 1}, {x: 1, y: 1})); // false

// プロパティの各値を equals で再帰的に比較
console.log(equals({x: {y: {z: 10}}}, {x: {y: {z: 10}}})); // true
console.log(equals({x: {y: {z: 10}}}, {x: {y: {z: 10, w: 1}}})); // false
