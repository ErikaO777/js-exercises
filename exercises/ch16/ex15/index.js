import threads from 'worker_threads';

if (threads.isMainThread) {
    let num = 0; // numはnumber型
    let numArray = new Int8Array(num);
    let worker = new threads.Worker(new URL(import.meta.url));

    const idmap = new Map();

    worker.on("message", (message) => { // ワーカーからのメッセージを待機

        if (message?.type === 'increment') { // ワーカーからインクリメントの命令を受け取る
            num += message.value;
        } else if (message?.type === 'done') {
            console.log('num =', num);        // ここが最終結果
            worker.terminate(); // ワーカーを終了
        }

    });

    worker.on("error", (err) => {
        console.error('Worker error:', err);
    });

} else {
    // サブスレッドでnumをインクリメントする命令を送り、メインスレッドで受信
    (() => {

        let i = 0;
        while (i < 20_000_000) {
            threads.parentPort.postMessage({ type: 'increment', value: 20_000_000 });
            i += 20_000_000;
        }
        threads.parentPort.postMessage({ type: 'done' });
    })();
}

// これだと送りあうのではなく一方的にサブ→メインへの命令になってしまっている？

/* Atomics.add() 関数
は、共有配列の指定された要素を読み込み、指定された値を加算し、その計算結果を配列に書き
戻します。Atomics.add() は、この操作を1 つの操作であるかのようにアトミックに行い、操作
が行われている間ほかのスレッドが値を読み書きできないようにします。 */

