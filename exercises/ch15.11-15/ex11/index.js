const form = document.querySelector("#uploadForm");

function uploadUrl(fileName) {
    return `https://graph.microsoft.com/v1.0/me/drive/root:/js_test/${encodeURIComponent(fileName)}:/content`;
}


// キonedriveへのアップロード　ファイルとアクセストークンを引数
async function uploadtoDrive(file, ACCESS_TOKEN) {

    let response = await fetch(uploadUrl(file.name),
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": file.type || "application/octet-stream"
            },
            body: file
        });
    let body = await response.json();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // 送るときにトークンを読む
    const accesstokenInput = document.querySelector("#accessToken");
    let ACCESS_TOKEN = accesstokenInput.value.trim();

    const file = document.getElementById("fileInput").files[0];
    if (!file) {
        return;
    }

    uploadtoDrive(file, ACCESS_TOKEN).then(() => {
        alert("アップロード完了");
    });

});

// ハンズオン　https://github.com/osamum/Firstway_to_MSTeamsGraphAPI
// 