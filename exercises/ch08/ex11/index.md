### 自作関数の場合
function msg(){
    console.log("Hello, world!");
}
よって、関数そのままの中身が出力された。

### 組み込み関数の場合
function random() { [native code] }
function keys() { [native code] }
自作関数とは違い、関数名とその中身は[native code]と出力された。