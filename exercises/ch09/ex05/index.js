export function instanceOf(object, constructor){
    // objectのプロトタイプチェーンをたどる
    let proto = Object.getPrototypeOf(object);

    // オブジェクトがこのコンストラクタから生成されたかどうかを確認し、whileで繰り返し
    while(proto !== null){
        if(proto === constructor.prototype){ 
        return true;
        }
        proto = Object.getPrototypeOf(proto); // チェーンをたどるために次のプロトタイプを取得
    }
    return false; // プロトタイプチェーンに見つからなかった場合
    
}


////////////////////// 確認 ////////////////////////////
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
const auto = new Car("Honda", "Accord", 1998);

console.log(auto instanceof Car);
console.log(instanceOf(auto, Car));
// Expected output: true

console.log(auto instanceof Object);
console.log(instanceOf(auto, Object));
// Expected output: true

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof