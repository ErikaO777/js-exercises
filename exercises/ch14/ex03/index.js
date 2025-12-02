// 合成可能なダイアクリティカルマークは文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除く
// Café→Unicode正規化→Cafe\u0301から\u0301を取り除いて"Cafe"にする
export class IgnoreAccentPattern {

    constructor(pattern) {
        // 正規表現の場合はそのまま保持、文字列の場合は正規化してエスケープ
        if (pattern instanceof RegExp) {
            this.isRegex = true; // 正規表現の場合
            this.originalPattern = pattern;
            this.normalizedPattern = this._normalizeRegex(pattern); // 正規表現からアクセント文字を除く
        } else {
            this.isRegex = false; // 文字列の場合
            this.originalPattern = String(pattern);
            this.normalizedPattern = this._normalizeString(String(pattern)); // 文字列を正規表現にする
        }
    }

    // 以下三つの関数で入ってきたテキストの正規化を行う
    // アクセント文字を除去する関数
    _removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //\u0300-\u036f（アクセント）を取り除く
    }

    // 文字列パターンの正規化
    _normalizeString(pattern) {
        const normalized = this._removeAccents(pattern); // アクセントも除去
        return normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // エスケープ
    }

    // 正規表現パターンの正規化
    _normalizeRegex(regex) {
        const source = regex.source;
        const flags = regex.flags;
        // 正規表現の場合は、元のパターンを保持しつつ、検索時に文字列を正規化する
        return new RegExp(source, flags);
    }

    // search関数
    search(str) {
        const normalizedStr = this._removeAccents(String(str));
        if (this.isRegex) {
            // 正規表現の場合
            const normalizedSource = this._removeAccents(this.originalPattern.source);
            const normalizedRegex = new RegExp(normalizedSource, this.originalPattern.flags); // .flagsでgなどのフラグを取得できる
            const match = normalizedStr.match(normalizedRegex);
            return match ? match.index : -1; // 一致があれば、最初に一致するインデックスを返す
        } else {
            // 文字列の場合
            const normalizedPattern = this._removeAccents(this.originalPattern);
            return normalizedStr.indexOf(normalizedPattern);
        }
    }

    toString() { return this.originalPattern.toString(); }

    // searchとmatchをそれぞれ定義
    [Symbol.search](str) {
        return this.search(str);
    }

    [Symbol.match](str) {
        const normalizedStr = this._removeAccents(String(str));
        if (this.isRegex) {
            const normalizedSource = this._removeAccents(this.originalPattern.source);
            const normalizedRegex = new RegExp(normalizedSource, this.originalPattern.flags);
            const match = normalizedStr.match(normalizedRegex);
            if (match) {
                // グローバルフラグgの有無で処理を分ける
                if (this.originalPattern.global) {
                    // グローバルの場合は単純な配列を返す
                    return [...match];
                } else {
                    // 非グローバルの場合はプロパティ付きの結果を返す
                    const result = [...match];
                    result.index = match.index;
                    result.input = normalizedStr;
                    result.groups = match.groups;
                    return result;
                }
            }
            return null;
        } else {
            const normalizedPattern = this._removeAccents(this.originalPattern);
            const index = normalizedStr.indexOf(normalizedPattern);
            if (index !== -1) {
                // String.prototype.match()と同じ形式の結果を作成
                const result = [normalizedPattern];
                result.index = index;
                result.input = normalizedStr; // 正規化された文字列をinputに設定
                result.groups = undefined;
                return result;
            }
            return null;
        }
    }

}

// ------- 確認 -------
console.log("Coffee Cafe".search(new IgnoreAccentPattern("Cafe")));
console.log("Coffee Café".search(new IgnoreAccentPattern("Cafe")));

console.log("Coffee Café".match(new IgnoreAccentPattern(/[a-e]/g)));

// match() メソッド...正規表現にマッチするすべての部分を配列として返します。
// search() メソッド...正規表現に最初に一致した位置のインデックスを返します。

// https://lingo.dev/en/javascript-i18n/compare-strings-ignore-accents