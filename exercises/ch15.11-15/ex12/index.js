const form = document.querySelector("#chat-input");

const URL = "http://localhost:11434/api/generate";
let reqBody = {
    "model": "gemma:2b",
    "prompt": null,
    "stream": false
};

// 送信されたときにollamaに送る
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 送るときにプロンプトを読む
    const prompt = document.querySelector("#message").value.trim();
    reqBody.prompt = prompt;

    // 送ったプロンプト内容をhtmlに表示
    const talk = document.querySelector(".talk");
    const userElem = document.createElement("div");
    userElem.className = "message user";
    userElem.textContent = prompt;
    talk.appendChild(userElem);

    // ここでollamaにリクエストを送信
    let response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });

    let data = await response.json();
    console.log(data);
    displayResponse(data.response);
});


// 回答が返ってきたらhtmlに表示する
function displayResponse(answer) {
    const talk = document.querySelector(".talk");
    const aiElem = document.createElement("div");
    aiElem.className = "message ai";
    aiElem.textContent = answer;
    talk.appendChild(aiElem);
}