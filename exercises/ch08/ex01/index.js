// 1.自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
// 引数はn,cの二つ
export const ncList = (n, c) =>{
    let list = [];
    for (let i = 0; i < n; i++) {
        console.log(c);
        list.push(c);
    }
    return list;
}

// 2.数値xを引数にとり、xの二乗の数値を返す
// 引数はx　返り値のみの関数なのでかっこは不要
export const square = x => { return x * x ;}


// 3.引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
// 引数は無いが、かっこは必要
export const nowTime = () => { return { now : new Date() };}

// 確認
console.log("ncList " + ncList(3,"1"));

console.log("square " + square(2));

console.log(nowTime());