const owner = 'ErikaO777';
const repository = 'js-exercises';
const args = process.argv.slice(2);
const verbose = args.includes('-v') || args.includes('--verbose');
const helpOpt = args.includes('-h') || args.includes('--help');

import { fileURLToPath } from 'url';
import path from 'path';


const originalUrl = `https://api.github.com/repos/${owner}/${repository}/issues`;

const helpmsg = `
Usage: node index.js <token> [options] <command>

Commands:
  create <title> <body>   Create a new issue with the given title and body
  close <number>         Close the issue with the given number
  list                    List open issues with their numbers and titles
  -h, --help              Show this help message
  -v, --verbose           Enable verbose logging

Examples:
  node index.js create "Issue Title" "Issue body goes here"
  node index.js close 123
  node index.js list
`;

// ヘルプ表示関数をエクスポート（テスト用）
export function showHelp() {
    console.log(helpmsg);
}

// -hまたは--helpオプションで使い方が確認できる
if (helpOpt) {
    showHelp();
    process.exit(0);
}

const argv = args.filter(a => a !== '-v' && a !== '--verbose' && a !== '-h' && a !== '--help');
let token = argv[0]; // トークンはコマンドラインから受け取る
const command = argv[1];

// テスト用にトークンを上書き
export function setToken(newToken) {
    token = newToken;
}

// HTTP ログを出力するための関数
export function logVerbose(...msg) {
    if (verbose) console.log('[VERBOSE]', ...msg);
}

// -vまたは--verboseオプションで HTTP ログを出力する
if (verbose) {
    console.log('Verbose mode enabled');
    global.logVerbose = (method, originalUrl, payload) => {
        console.log(`[${method}] ${originalUrl}`);
        if (payload) {
            console.log('Payload:', JSON.stringify(payload, null, 2));
        }
    };
} else {
    global.logVerbose = () => { };
}

// コマンドとトークンがない場合はエラー
// if (!token || !command) {
//     console.error('token and command are required');
//     process.exit(1);
// }

// Issueの作成
export async function createIssue(title, body) {
    const payload = { title, body };

    logVerbose('POST', originalUrl, payload);

    const res = await fetch(originalUrl, {
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
        throw new Error(await res.text());
    }

    const json = await res.json();
    console.log('Created:', json.number, json.title);
    return json;
}

// 指定した Issue をクローズする
export async function closeIssue(number) {
    const url = `${originalUrl}/${number}`;
    const payload = { state: 'closed' };

    logVerbose('PATCH', url, payload);

    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const json = await res.json();
    console.log('Closed:', json.number, json.title);
    return json;
}

// オープンな Issue の Id と Title の一覧を表示する
export async function listIssues() {
    const url = `${originalUrl}?state=open`;

    logVerbose('GET', url);

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const issues = await res.json();
    for (const issue of issues) {
        console.log(`${issue.number}: ${issue.title}`);
    }
    return issues;
}


// ===== 実行 =====
// import の時はコマンド実行をステップ（テスト用）

const isDirectRun =
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
    // コマンドとトークンがない場合はエラー（CLI実行時のみ）
    if (!token || !command) {
        console.error('token and command are required');
        showHelp();
        process.exit(1);
    }

    (async () => {
        try {
            if (command === 'create') { // createコマンドでIssueを作成
                const title = argv[2];
                const body = argv[3];
                if (!title || !body) throw new Error('create requires title and body');
                await createIssue(title, body);

            } else if (command === 'close') { // closeコマンドで指定したIssueをクローズ
                const number = argv[2];
                if (!number) throw new Error('close requires issue number');
                await closeIssue(number);

            } else if (command === 'list') { // listコマンドでオープンなIssueの一覧を表示
                await listIssues();

            } else {
                throw new Error(`unknown command: ${command}`);
            }
        } catch (e) {
            console.error('Error:', e.message);
            process.exit(1);
        }
    })();
}


// 入力はコマンドライン引数から受け取る
// Issue を作成できる
// 指定した Issue をクローズできる
// オープンな Issue の Id と Title の一覧を表示できる
// -hまたは--helpオプションで使い方が確認できる
// -vまたは--verboseオプションで HTTP ログを出力する

// https://qiita.com/syossan27/items/dd3bd152792360c29d01
// https://zenn.dev/yochi/scraps/9bec1b370c3f2d
