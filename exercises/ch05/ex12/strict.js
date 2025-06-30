(function () {
  let x = 0001;
  let y = 0002;
  console.log("x + y = " + (x + y));
})();

// 以下のエラー
// node .\ex12\strict.js
// file:///C:/XXXXXX/js-exercises/exercises-public/exercises/ch05/ex12/strict.js:24
//   let y = 0002;
//           ^^^^

// SyntaxError: Octal literals are not allowed in strict mode.
//     at ESMLoader.moduleStrategy (node:internal/modules/esm/translators:119:18)
//     at ESMLoader.moduleProvider (node:internal/modules/esm/loader:469:14)
//     at async link (node:internal/modules/esm/module_job:67:21)

// ------------------------------------------------------

// (function () {
//   let a = 1;
//   let b = 2;
//   let obj = { b: 4 };
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// })();

// 以下のエラー
// node .\ex12\strict.js
// file:///C:XXXXXX/js-exercises/exercises-public/exercises/ch05/ex12/strict.js:5
//   with (obj) {
//   ^^^^

// SyntaxError: Strict mode code may not include a with statement
//     at ESMLoader.moduleStrategy (node:internal/modules/esm/translators:119:18)
//     at ESMLoader.moduleProvider (node:internal/modules/esm/loader:469:14)
//     at async link (node:internal/modules/esm/module_job:67:21)
