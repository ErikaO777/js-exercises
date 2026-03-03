const owner = 'ErikaO777';
const repository = 'js-exercises';
const token = process.argv[0]; // トークンはコマンドラインから受け取る

const url = `https://api.github.com/repos/${owner}/${repository}/issues`;

const payload = {
    title: 'テスト-タイトル',
    body: ['テスト-ボディ'].join('\n')
};

const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
});

if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${txt}`);
}
const json = await res.json();
console.log('Created issue:', json.number, json.html_url);


// 入力はコマンドライン引数から受け取る
// Issue を作成できる
// 指定した Issue をクローズできる
// オープンな Issue の Id と Title の一覧を表示できる
// -hまたは--helpオプションで使い方が確認できる
// -vまたは--verboseオプションで HTTP ログを出力する

// https://qiita.com/syossan27/items/dd3bd152792360c29d01
// https://zenn.dev/yochi/scraps/9bec1b370c3f2d