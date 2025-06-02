//jsにおける整数の最小値と最大値
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

//最大値 + 1
const x = Number.MAX_SAFE_INTEGER + 1;
console.log(x);

//最大値 + 1と最大値 + 2の比較
const y = Number.MAX_SAFE_INTEGER + 2;
console.log(x === y); 

//最後の比較について数学的には一致していないが、javascript(コンピュータ)が扱う数字として正確に表せる範囲を超えているような大きな値もしくは小さな値に対し、下一桁レベルの範囲であれば同じ値として扱うため。