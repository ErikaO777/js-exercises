export class C {
  static method() {
    console.log("C.method()は1");
    return 1;
  }

  method() {
    console.log("new C().method()は2");
    return 2;
  }

  static C = class {
    static method() {
      console.log("C.C.method()は3");
      return 3;
    }

    method() {
      console.log("new C.C().method()は4");
      return 4;
    }
  };

  C = class{
    static method() {
      console.log("new C().C.method()は5");
      return 5;
    }
    method() {
        console.log("new new C().C().method()は6");
        return 6;
      }
  };
 
//   C() { // インスタンスメソッド これだと名前の被りによってnew new C().C().method()として呼び出せない
//     return class {
//       method() {
//         console.log("new new C().C().method()は6");
//         return 6;
//       }
//     };
//   }

}

C.method(); // OK
new C().method(); // OK
C.C.method(); // OK
new C.C().method(); // OK
new C().C.method(); // OK
new new C().C().method(); // OK

// console.log(C.method()); // 1
// console.log(new C().method()); // 2
// console.log(C.C.method()); // 3
// console.log(new C.C().method()); // 4
// console.log(new C().C.method()); // 5
// console.log(new new C().C().method()); // 6
