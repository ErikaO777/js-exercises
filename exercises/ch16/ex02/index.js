import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 子プロセスが異常終了したのをトリガーに、子プロセスを再起動する
// 子プロセス終了はstartChildの返すPromiseが解決されたときのレスポンスで受け取る
// 子プロセス終了のコードは1

let shutdown = false; // シャットダウンフラグ
// シグナル2種を受け取ったときの処理
process.once("SIGINT", () => {
  console.log("SIGINT受信");
  shutdown = true; // フラグを立てる
  if (child) { // 子プロセスが生きてたら
    child.kill("SIGINT"); // 子プロセスに同じシグナルを送る
  }
  // 子が終了するのを待つ
  child.on("exit", (code, signal) => {
    console.log(`子シグナル: ${signal}`);
    process.kill(process.pid, "SIGINT"); // 自分自身も同じシグナルで終了する
  });

});

process.once("SIGTERM", () => {
  console.log("SIGTERM受信");
  shutdown = true;
  if (child) {
    child.kill("SIGTERM"); // 子プロセスに同じシグナルを送る
  }
  child.on("exit", (code, signal) => {
    console.log(`子シグナル: ${signal}`);
    process.kill(process.pid, "SIGTERM"); // 自分自身も同じシグナルで終了する
  });
});


// 子プロセスの監視
async function monitorChild() {
  while (!shutdown) { // シャットダウンフラグが立ってない限りループ
    const [code, signal] = await startChild();

    console.log(code, signal);
    console.log(`子プロセスが終了`);

    if (code === 1) { // 異常終了（コード1）の時にstartChildを呼び再起動
      console.log("再起動");
      continue;
    }
  }

}

// シグナル→SIGINT(Ctrl+C)やSIGTERM(kill)

monitorChild();