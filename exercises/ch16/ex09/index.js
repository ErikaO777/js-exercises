// Express フレームワークを用いたサーバ
// 指定されたディレクトリからファイルを提供するシンプルで静的なHTTPサーバ
import express from 'express';
import url from 'url';
import path from 'path';
const app = express();

// 指定されたポートで待ち受けるHTTP サーバを介して、
// 指定されたルートディレクトリのファイルを提供する。
export function serve(rootDirectory, port) {
    const app = express();

    // どんな Content-Type でもテキストとして受け取って、エコーできるようにする
    app.use(express.text({ type: '*/*', defaultCharset: 'utf-8', limit: '10mb' }));

    // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
    // expressではif文でなく/test/mirrorの時だけこのハンドラが呼ばれるようにできる
    app.all('/test/mirror', (req, res) => {
        const reqLine = `${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`;
        const headers = Object.entries(req.headers)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join('\r\n');

        res.type('text/plain; charset=UTF-8').status(200);
        res.write(reqLine);
        res.write(headers + '\r\n\r\n');
        res.end(req.body ?? '');
    });

    // 静的ファイル配信（index.html も自動解決）
    app.use(express.static(rootDirectory, {}));

    // 404
    app.use((req, res) => {
        res.status(404).type('text/plain; charset=UTF-8').send('Not Found');
    });

    // 他エラー
    app.use((err, req, res, _next) => {
        console.error(err);
        res.status(500).type('text/plain; charset=UTF-8').send('Internal Server Error');
    });

    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
        console.log(`Serving static files from: ${path.resolve(rootDirectory)}`);
        console.log(`Echo endpoint:            /test/mirror`);
    });

    return app;
}

// 直接起動された場合：CLI 引数から root と port を受ける
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    const [_node, _file, rootArg, portArg] = process.argv;
    if (!rootArg || !portArg) {
        console.log('Usage: node server-express.mjs <rootDirectory> <port>');
        process.exit(1);
    }
    const root = path.resolve(process.cwd(), rootArg);
    const port = Number(portArg) || 3000;
    serve(root, port);
}


// Expressはexpress.static()によってパス正規化、ルート外アクセス拒否、Content-Typeの自動判定、ストリーミング配信などを行ってくれる
// https://zenn.dev/oku/articles/f55c7d540710bf