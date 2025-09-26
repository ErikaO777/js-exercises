// 独自エラーの実装
// 入力エラー　カタカナのみを受け付ける
class InputError extends Error {
    constructor(value) {
        super(`${value} は不正な入力です。カタカナで入力してください。`);
        this.value = value;
    }

    get name() {
        return "KatakanaError";
    }
}

let error = new InputError("あいうえお");
console.log(error.message); // あいうえお は不正な入力です。カタカナで入力してください。
console.log(error.name); // KatakanaError

// カタカナの正規表現は/^[\u30A0-\u30FFー]+$/