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

// フォーム送信
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    response1.textContent = "Loading...";
    response2.textContent = "Loading...";
    response3.textContent = "Loading...";

    const req1 = { ...sendJson, requestId: 1, payload: input1.value };
    ws.send(JSON.stringify(req1));
    console.log("Sent:", req1);


    const req2 = { ...sendJson, requestId: 2, payload: input2.value };
    ws.send(JSON.stringify(req2));
    console.log("Sent:", req2);

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
            response1.textContent = response.payload;
        } else if (response.requestId === 2) {
            response2.textContent = response.payload;
        } else if (response.requestId === 3) {
            response3.textContent = response.payload;
        }
    } catch (error) {
        response1.textContent = "Error: " + error.message;
        response2.textContent = "Error: " + error.message;
        response3.textContent = "Error: " + error.message;
    }

});


// Send Requestボタンが押されたとき
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     // 両端からホワイトスペースを取り除いた文字列を取得する
//     const payload1 = input1.value.trim();
//     const payload2 = input2.value.trim();
//     const payload3 = input3.value.trim();

//     req.payload = payload1;

//     fetch("http://localhost:3003", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(req) // nameのみ送信
//     })
//         .then((response) => response.json())
//         .then((item) => {
//             getResponse(item);
//         })
//         .catch((error) => {
//             alert(error);
//         });

// });

// レスポンスを受け取ってHTMLに表示する
// function getResponse(item) {
//     // ここから #todo-list に追加する要素を構築する
//     const elem = document.createElement("li");

//     const label = document.createElement("label");
//     label.textContent = item.name;
//     label.style.textDecorationLine = "none";

//     const toggle = document.createElement("input");

//     toggle.type = "checkbox";
//     toggle.addEventListener('change', () => {
//         fetch(`http://localhost:3003${item.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ status: "completed" })
//         })
//             .then((response) => response.json())
//             .then((updatedTask) => {
//                 label.style.textDecorationLine = "line-through";
//             })
//             .catch((error) => {
//                 alert(error);
//             });
//     });

//     // TODO: elem 内に toggle, label, destroy を追加しなさい
//     elem.append(toggle, label, destroy);
//     list.prepend(elem);
// }
