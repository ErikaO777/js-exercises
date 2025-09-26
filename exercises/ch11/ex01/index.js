export class TypeMap{
    
    constructor(){
        // this.list = [];
        this.list = new Map();
    }

    get(key){
        if (this.list.has(key)) {
            return this.list.get(key);
        } else {
            throw new Error("Not found");
        }
    }

    set(key, value){
        // keyがコンストラクタ関数かチェック
        if (typeof key === "function" && key.prototype && key.prototype.constructor === key) { // 関数かつ、プロトタイプを持ち、コンストラクタが自身
            if (key === String && (typeof value === "string" || value instanceof String)) {
                this.list.set(key, value);
            } else if (key === Number && (typeof value === "number" || value instanceof Number)) {
                this.list.set(key, value);
            } else if (key === Boolean && (typeof value === "boolean" || value instanceof Boolean)) {
                this.list.set(key, value);
            } else if (value instanceof key) {
                // その他のオブジェクト型の場合(例のFooなど)
                this.list.set(key, value);
            } else {
                throw new Error("Invalid key");
            }
        } else {
            throw new Error("Invalid key");
        }
    }

}


// 以下をクリアする
class Foo {}
const typeMap = new TypeMap();
// set
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
// typeMap.set(Date, "not a date"); // -> Error

// get
console.log(typeMap.get(String)); // -> "string"
console.log(typeMap.get(Number)); // -> 123
console.log(typeMap.get(Foo)); // -> Foo {}
