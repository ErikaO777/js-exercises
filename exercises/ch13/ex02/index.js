function f1() {
    // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
    //
    // 回答:
    // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
    //
    // 説明:
    // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                                 wait1
    //                                |-----|
    //                                       logC
    //                                      |-|
    wait3()
        .then(logA)
        .then(() => wait2().then(logB))
        .then(() => wait1().then(logC));
}

function f2() {
    // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
    //
    // 解答例:
    // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
    // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
    // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                  wait1
    //                 |-----|
    //                        logC
    //                       |-|
    wait3()
        .then(logA)
        .then(() => {
            wait2().then(logB);
        })
        .then(() => wait1().then(logC));
}

function f3() {
    // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
    try {
        wait(0).then(logA).then(errX);
    } catch (e) {
        logB();
    } finally {
        logC();
    }
}

function f4() {
    // NOTE: f5 との比較用
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then((value) =>
            wait(1000).then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}

function f5() {
    // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then(
            wait1().then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}

function f6() {
    // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

    const p = wait1().then(logA);
    p.then(() => wait1()).then(logB);
    p.then(() => wait2()).then(logC);
}

function f7() {
    // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
    // (= 解決済みの Promise の then を呼び出すとどうなるか)
    const p = wait1().then(logA);
    wait2()
        .then(() => {
            return p.then(logB);
        })
        .then(logC);
}

function f8() {
    // NOTE: f9, f10 との比較用
    wait1()
        .then(errX)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}

function f9() {
    // NOTE: f10 との比較用
    wait1()
        .then(() => 42)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}

function f10() {
    // NOTE: then(r, c) と then(r).catch(c) は等しいか？
    wait1()
        .then(() => 42)
        .then(errY, (e) => log(e.message))
        .finally(logA);
}

function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
    new Promise((resolve, reject) => {
        errX();
    }).catch((e) => log(e.message));
}

function f12() {
    // new Promise 内だがコールバック関数で throw した場合は？
    new Promise((resolve, reject) => {
        setTimeout(() => errX(), 0);
    }).catch((e) => log(e.message));
}

// ---------　共通関数　---------
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

const wait0 = () => { console.log("wait0"); return wait(0); };
const wait1 = () => { console.log("wait1"); return wait(1000); };
const wait2 = () => { console.log("wait2"); return wait(2000); };
const wait3 = () => { console.log("wait3"); return wait(3000); };

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};

// --------- 確認 ---------
// console.log("f1:");
// f1();
// // console.log("f2:");
// f2();
// console.log("f3:");
// f3();
// console.log("f4:");
// f4();
// console.log("f5:");
// f5();
// console.log("f6:");
f6();
// console.log("f7:");
// f7();
// console.log("f8:");
// f8();
// console.log("f9:");
// f9();
// console.log("f10:");
// f10();
// console.log("f11:");
// f11();
// console.log("f12:");
// f12();