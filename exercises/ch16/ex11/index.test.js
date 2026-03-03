// test-basic.spec.js
import test from 'node:test';
import assert from 'node:assert';
import net from 'node:net';

const HOST = '127.0.0.1';
const PORT = 3000;

// 受信を全部集める
function sendRawRequest(requestText) {
    return new Promise((resolve, reject) => {
        const socket = net.createConnection({ host: HOST, port: PORT }, () => {
            socket.write(requestText);
        });

        let data = '';
        socket.setEncoding('utf8');

        socket.on('data', chunk => {
            data += chunk;
        });
        socket.on('end', () => resolve(data));
        socket.on('error', reject);
    });
}

function parseHttpResponse(raw) {
    // シンプルに先頭行と本文を取る最低限のパーサ
    const [headerPart, bodyPart = ''] = raw.split('\r\n\r\n');
    const firstLine = headerPart.split('\r\n')[0] || '';
    return { firstLine, headerPart, body: bodyPart };
}

test('GET ', async () => {
    const req =
        `GET / HTTP/1.1\r\n` +
        `Host: ${HOST}:${PORT}\r\n` +
        `Connection: close\r\n` +
        `\r\n`;

    const res = await sendRawRequest(req);
    const { firstLine, headerPart, body } = parseHttpResponse(res);

    assert.match(firstLine, /HTTP\/1\.1\s+200/); // ステータスラインに 200 が含まれていることを確認
    assert.match(headerPart, /Content-Type:\s*text\/html/i); // Content-Type が text/html を含むことを確認

});

test('POST /greeting ', async () => {
    const form = `name=Hello&greeting=World`;
    const req =
        `POST /greeting HTTP/1.1\r\n` +
        `Host: ${HOST}:${PORT}\r\n` +
        `Content-Type: application/x-www-form-urlencoded\r\n` +
        `Content-Length: ${Buffer.byteLength(form, 'utf8')}\r\n` +
        `Connection: close\r\n` +
        `\r\n` +
        form;

    const res = await sendRawRequest(req);
    const { firstLine, headerPart, body } = parseHttpResponse(res);

    assert.match(body, /Name:\s*Hello/);
    assert.match(body, /Greeting:\s*World/);
});

test('GET /unknown ', async () => {
    const req =
        `GET /unknown HTTP/1.1\r\n` +
        `Host: ${HOST}:${PORT}\r\n` +
        `Connection: close\r\n` +
        `\r\n`;

    const res = await sendRawRequest(req);
    const { firstLine } = parseHttpResponse(res);

    assert.match(firstLine, /HTTP\/1\.1\s+404/);
});
