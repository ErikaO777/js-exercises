// たとえば、A=(a11 a12), B= (b11 b22)の時
// A * B =　(a11*b11 + a12*b22)
// ここではA = [[a11, a12]], B = [[b11], [b12]]とする

export function mul(matrix1, matrix2) { // 引数は二次元配列
  let res = [];
  // 何行何列の行列かを取得
  let row1 = matrix1.length; 
  let row2 = matrix2.length;
  let col1 = matrix1[0].length;
  let col2 = matrix2[0].length;

  for (let i1 = 0; i1 < row1; i1++) {
    res.push([]);
    for (let i2 = 0; i2 < col2; i2++) {
      res[i1].push(0);
      for (let i3 = 0; i3 < col1; i3++) {
        res[i1][i2] += matrix1[i1][i3] * matrix2[i3][i2];
      }
    }
  }

  return res;
}

// 和は同じ型でなければならない
// たとえば、A=(a11 a12), B= (b11 b22)の時
// A + B =　(a11 + b11, a12 + b22)
// ここではA = [[a11, a12]], B = [[b11, b12]]とする

export function sum(matrix1, matrix2) {
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    throw new Error("行列の型が一致しません");
  }

  let res = [];
  for (let i = 0; i < matrix1.length; i++) {
    res.push([]);
    for (let j = 0; j < matrix1[i].length; j++) {
      res[i].push(matrix1[i][j] + matrix2[i][j]);
    }
  }

  return res;

}
