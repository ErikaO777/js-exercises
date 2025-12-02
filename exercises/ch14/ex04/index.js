export class Hiragana {

    constructor(str) {
        this.char = str; // ひらがな1文字のプロパティ
        this.cp = this.char.codePointAt(0); // ひらがなのUnicodeの取得
    }

    // 文字列、数値の時で返り値を変える
    // <,>などの比較演算子を想定してデフォルトでunicodeを返す
    [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
            return this.char; // ひらがな1文字
        } else if (hint === 'number') {
            return this.cp; // Unicode
        } else {
            return this.char; // それ以外はひらがな
        }
    }

    toString() {
        return this.char;
    }

}

// ひらがな判定 https://qiita.com/thzking/items/f07633e0ee9145a85ace

// ---------- 確認 ----------

const a = new Hiragana('あ');
const ka = new Hiragana('か');
const sa = new Hiragana('さ');

console.log(String(a));
console.log(Number(a));
console.log(a.toString());

console.log(a < ka);
console.log(sa > ka); 
