(function () {
  let x = 0001;
  let y = 0002;
  console.log( "x + y = " + (x + y));
})();

// (function () {
//   let a = 1;
//   let b = 2;
//   let obj = { b: 4 };
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// })();

// vscodeでエラーは出るが実行できた
// トップレベルでのwith文はエラー

