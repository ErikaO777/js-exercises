import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1); // クラスCのmethod()は1
  expect(new C().method()).toBe(2); // コンストラクタで生成されたCのインスタンスのmethod()は2
  expect(C.C.method()).toBe(3); // クラスCの静的メソッドCのmethod()は3
  expect(new C.C().method()).toBe(4); // コンストラクタで生成されたCの静的メソッドCのインスタンスのmethod()は4
  expect(new C().C.method()).toBe(5); // コンストラクタで生成されたCのインスタンスの静的メソッドCのmethod()は5
  expect(new new C().C().method()).toBe(6); // コンストラクタで生成されたCのインスタンスの静的メソッドCのインスタンスのmethod()は6
});

// 6個目
// new C()でC のインスタンスを作成
// .C() でそのインスタンスの C() メソッドを呼び出す → クラス（または関数）を返す
// new newで そのクラスのインスタンスを作成
// .method() でそのインスタンスの method() を呼び出す