// テンプレートリテラルを受け取って文字列を返す
// 戻り値において補間値はその値ではなく、その型名を展開
// 1やnullなどはそのまま文字列にするのではなく型名へ
export function template(strings, ...values) {
    // reduceを使って、文字列と値を足したものを集約
    let s = strings.reduce((acc, str, i) => {
        const value = i < values.length ? String(typeof values[i]) : ""; // 文字列部分に対応する値があれば結合、最後は空文字
        return acc + str + value;
    }
        , "");
    return `"` + s + `"`;
}

// ---------- 確認 ----------
console.log(template``); // ""
console.log(template`test`); // "test"
console.log(template`Hello, ${"A"}`); // "Hello, string"
console.log(template`${1} ${null} ${() => { }}`); // "number object function"
console.log(template`type of 'A' is ${"A"}`); // "type of 'A' is string"

// tag`Hello ${name}, you are ${age} years old.`
// 文字列部分：strings →["Hello ", ", you are ", " years old."]
// 値部分：values →[name, age]