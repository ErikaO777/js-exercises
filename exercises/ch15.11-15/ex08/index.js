// やること：
// htmlのリクエストをserverにおくる。
// serverからのレスポンスをhtmlに送る。

// websocketクライアントの作成
// import WebSocket from "ws";　ブラウザだとimport不要
const ws = new WebSocket("ws://localhost:3003");

// HTML要素
const input1 = document.querySelector("#payload1");
const input2 = document.querySelector("#payload2");
const input3 = document.querySelector("#payload3");
const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");
const response3 = document.querySelector("#response3");
const form = document.querySelector("#requests");

// タイマーID保存用
const timeoutId = {
    1: null,
    2: null,
    3: null,
};

// 送る内容
let sendJson = {
    "requestId": 0,
    "type": "request",
    "payload": ""
}

// WebSocket接続が開いた
ws.addEventListener("open", () => {
    console.log("WebSocket connected");
});

// タイマー用要素
const responseEls = {
    1: response1,
    2: response2,
    3: response3
};

// タイマー
function setTimeoutForId(id) {
    timeoutId[id] = setTimeout(() => {
        // 返ってきていないレスポンスがあればそこだけエラー表示
        responseEls[id].textContent = "Error: Request timed out";
        timeoutId[id] = null;
    }, 3000);
}

// フォーム送信
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    response1.textContent = "Loading...";
    response2.textContent = "Loading...";
    response3.textContent = "Loading...";

    // それぞれリクエスト前にタイマーを仕掛ける
    setTimeoutForId(1);
    const req1 = { ...sendJson, requestId: 1, payload: input1.value };
    ws.send(JSON.stringify(req1));
    console.log("Sent:", req1);

    setTimeoutForId(2);
    const req2 = { ...sendJson, requestId: 2, payload: input2.value };
    ws.send(JSON.stringify(req2));
    console.log("Sent:", req2);

    setTimeoutForId(3);
    const req3 = { ...sendJson, requestId: 3, payload: input3.value };
    ws.send(JSON.stringify(req3));
    console.log("Sent:", req3);

});

// レスポンスを受け取る
ws.addEventListener("message", (res) => {
    console.log("Received:", res);

    try {
        const response = JSON.parse(res.data);

        if (response.requestId === 1) {
            if (timeoutId[1] !== null) {
                clearTimeout(timeoutId[1]); // タイマークリア   
                timeoutId[1] = null;   // タイマーIDをnullに戻す             
            }
            response1.textContent = response.payload;
        } else if (response.requestId === 2) {
            if (timeoutId[2] !== null) {
                clearTimeout(timeoutId[2]);
                timeoutId[2] = null;
            }
            response2.textContent = response.payload;
        } else if (response.requestId === 3) {
            if (timeoutId[3] !== null) {
                clearTimeout(timeoutId[3]);
                timeoutId[3] = null;
            }
            response3.textContent = response.payload;
        }
    } catch (error) {
        response1.textContent = "Error: " + error.message;
        response2.textContent = "Error: " + error.message;
        response3.textContent = "Error: " + error.message;
    }

});

// WebSocket接続が閉じたとき
ws.addEventListener("close", () => {
    [1, 2, 3].forEach(id => {
        responseEls[id].textContent = "Error: Request timed out";
    });
});

