setTimeout(() => console.log("Hello, world!"), 1000);

async function longA() {
    let count = 0;
    while (true) {
        if ((++count % 1000) === 0) { console.log("A"); } // カウントが1000ごとにログ出力
        await Promise.resolve({}) // 成功状態
    }
}

async function longB() {
    let count = 0;
    while (true) {
        if ((++count % 1000) === 0) { console.log("B"); }
        await Promise.resolve({})
    }
}

longA();
longB();
