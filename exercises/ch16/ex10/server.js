import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'node:fs';

function serve(rootDirectory, port) {
    let server = new http.Server();
    server.listen(port);
    console.log("Listening on port", port);
    server.on("request", (request, response) => {
        let endpoint = url.parse(request.url).pathname;

        // エンドポイントが /test/mirror の場合
        if (endpoint === "/test/mirror") {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(200); // 200 OK
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                }\r\n`);
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }
            response.write("\r\n");
            request.pipe(response);
            return;
        }

        // ----------------------追加---------------------------------
        // PUTリクエストの場合にファイルをアップするようにする
        if (request.method === 'PUT') {
            // /foo/bar/file.txt → foo/bar/file.txt
            let rel = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

            // 保存先の絶対パスを作成
            const target = path.resolve(rootDirectory, rel);

            // ディレクトリが無ければ作る
            fs.mkdirSync(path.dirname(target), { recursive: true });

            // 書き込みストリームにパイプする
            const ws = fs.createWriteStream(target);
            request.pipe(ws);

            // 書き終わったら応答
            ws.on('finish', () => {
                response.writeHead(201, { "Content-Type": "text/plain" });
                response.end("Uploaded");
            });

            return;

        }
        // ------------------------------------------------------------

        let filename = endpoint.substring(1);
        filename = filename.replace(/\.\.\//g, "");
        filename = path.resolve(rootDirectory, filename);
        let type;
        switch (path.extname(filename)) {
            case ".html":
            case ".htm": type = "text/html"; break;
            case ".js": type = "text/javascript"; break;
            case ".css": type = "text/css"; break;
            case ".png": type = "image/png"; break;
            case ".txt": type = "text/plain"; break;
            default: type = "application/octet-stream"; break;
        }
        let stream = fs.createReadStream(filename);

        stream.once("readable", () => {
            response.setHeader("Content-Type", type);
            response.writeHead(200);
            stream.pipe(response);
        });
        stream.on("error", (err) => {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(404);
            response.end(err.message);
        });

    });
}

serve(process.argv[2] || "./ch16/ex10", parseInt(process.argv[3]) || 8000);