async function i1() {
    // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
    let v = 0;

    v = await Promise.any([
        wait1().then(() => 42),
        wait2()
            .then(() => (v = 100))
            .then(() => 0),
    ]);

    log(v);
    await wait2();
    log(v);
}

async function i2() {
    const v = await Promise.all([
        wait3().then(() => {
            logA();
            return "A";
        }),
        wait2().then(() => {
            logB();
            return "B";
        }),
        wait1().then(() => {
            logC();
            return "C";
        }),
    ]);
    log(v);
}

async function i3() {
    // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
    let v = 42;
    try {
        await Promise.all([
            wait3().then(() => {
                v = 0;
                errX();
            }),
            wait2().then(() => {
                logB();
                return "B";
            }),
            wait1().then(() => {
                errY();
            }),
        ]);
    } catch (e) {
        log(e.message);
        log(v);
        await wait3();
        log(v);
    }
}

async function i4() {
    // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
    let v = 0;

    const p1 = async () => {
        await wait1();
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            await wait2();
            v = next;
        }
    };

    const p2 = async () => {
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            await wait2();
            v = next;
        }
    };

    await Promise.all([
        p1()
            .then((num) => p2(num, v))
    ]);
    log(v);

}

// ---------　共通関数　---------
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

const wait0 = () => wait(0);
const wait1 = () => { console.log("wait1"); return wait(1000); }
const wait2 = () => { console.log("wait2"); return wait(2000); }
const wait3 = () => { console.log("wait3"); return wait(3000); }

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

// ---------　確認　---------
// i1();
// i2();
// i3();
i4();