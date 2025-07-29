export function reverse(str) {
  const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" }); // 文字ごとで分割
  const segments = Array.from(segmenterJa.segment(str)); // 文字列のセグメントから配列を作る

  return segments
    .reverse()
    .map((seg) => seg.segment)
    .join(""); // セグメントを逆順にして文字列にして配列化

  //   strArray.forEach((char) => {
  //     const segments = segmenterJa.segment(char);
  //     newArray.unshift(...segments);
  //   });
  //   console.log(newArray);
  //   console.log(newArray[0].segment);
  //   return newArray.join(""); // 配列を文字列に変換して返す
}

console.log(reverse("abc123")); // "321cba"

// [
//   { segment: '3', index: 0, input: '3' },
//   { segment: '2', index: 0, input: '2' },
//   { segment: '1', index: 0, input: '1' },
//   { segment: 'c', index: 0, input: 'c' },
//   { segment: 'b', index: 0, input: 'b' },
//   { segment: 'a', index: 0, input: 'a' }
// ]
