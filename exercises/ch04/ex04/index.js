export function bitCount(number) {

  //　0bが付いていると10進数として扱われるので2進数に変換
  const binaryString = number.toString(2);
  console.log("number:", binaryString);

  // 1の時だけカウント
  let count = 0;
  for (let i = 0; i < binaryString.length; i++) {
    //文字列に変換
    if (binaryString[i] === "1") {
      count++;
    }
  }

  console.log(count);
  return count;
}

bitCount(1101111011);
bitCount(0b1111111111111111111111111111111);
