import { get } from 'node:http';
import net from 'node:net';

// 返却する要素
const html_get = `<!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>`;

// どのタイミングでメソッドを見分けて分岐する？
const server = net.createServer(socket => {

  socket.setEncoding('utf8');

  // dataから先頭行を読む
  socket.once('data', (chunk) => {
    console.log(chunk);
    const firstLine = chunk.split(/\r?\n/, 1)[0] || '';
    const [method, path, httpver] = firstLine.split(' ');

    // methodで分岐 
    // GETリクエストならhtml_getを返す
    if (method === 'GET') {
      const res =
        `HTTP/1.1 200 OK\r\n` +
        `Content-Type: text/html;` +
        `Content-Length: ${Buffer.byteLength(html_get, 'utf8')}\r\n` +
        `\r\n` +
        html_get;
      socket.end(res);
    } else if (method === 'POST' && path === '/greeting') {// POSTリクエストならhtml_postを返す
      const body = getParamfromReq(body);
      console.log(body);

      const html_post = `<!doctype html>
        <html lang="ja">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>POST リクエスト</title>
            </head>
            <body>
            <p>Name: ${body.name}</p>
            <p>Greeting: ${body.greeting}</p>
            </body>
        </html>`;

      const res =
        `HTTP/1.1 200 OK\r\n` +
        `Content-Type: text/html;` +
        `Content-Length: ${Buffer.byteLength(html_post, 'utf8')}\r\n` +
        `\r\n` +
        html_post;

      socket.end(res);
    } else { // 以上以外の時は404もしくは405を返す
      const res =
        `HTTP/1.1 404エラー\r\n` +
        `Content-Type: text/plain;` +
        `Content-Length: 9\r\n` +
        `\r\n` +
        `Not Found`;
      socket.end(res);
    }

  });
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});


function getParamfromReq(body) { // POSTリクエストのbodyからパラメータを抜き取るための関数
  const obj = {};
  for (const pair of body.split('&')) {
    if (!pair) continue;
    const [k, v = ''] = pair.split('=');
    const key = decodeURIComponent(k.replace(/\+/g, ' '));
    const val = decodeURIComponent(v.replace(/\+/g, ' '));
    obj[key] = val;
  }
  return obj;
}


// https://qiita.com/LittleBear-6w6/items/9d780fea1b88340a0840