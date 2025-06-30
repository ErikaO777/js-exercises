export function extractEvenObject(obj){
    let evenObj = {};

    // 偶数の時だけ新しいオブジェクトに追加
    for (let i in obj) {
        if(obj[i] % 2 === 0) {
            evenObj[i] = obj[i];
        }else{
        }
    }

    return evenObj;
}

const o = { x: 1, y: 2, z: 3 };
console.log(extractEvenObject(o)); // { y: 2 }
console.log(o); // { x: 1, y: 2, z: 3 } 元のオブジェクトは変更しない
