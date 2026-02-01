"use strict";

const button = document.querySelector("#send-button"); // 通信ボタン
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer(); // 通信ボタンが押されたときにサーバーからメッセージを取得
});

async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement); // メッセージ内容を表示

  // TODO: ここにサーバーとのやり取り等を実装しなさい

  // fetchでリクエストを送信
  await fetch("http://localhost:3003/message", { method: "GET" });

  // EventSourceでメッセージを受信
  const eventSource = new EventSource("http://localhost:3003/message");
  // サーバを開く
  eventSource.onopen = () => {
    console.log("Connection");
  };
  // メッセージを受信 →接続終了
  eventSource.onmessage = (event) => {
    button.disabled = true;
    console.log("data:", event.data);
    const jsonData = JSON.parse(event.data);
    messageElement.textContent = jsonData.value;
    if (jsonData.done) { //取得し終えたらクローズする（2つ目のさようならのdoneがtrueになるタイミング）
      button.disabled = false;
      eventSource.close();
    }
  };
  // エラー処理
  eventSource.onerror = (error) => {
    console.error("failed:", error);
  };
}
