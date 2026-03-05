### 接続数チェック
方法：
Power shellで以下の接続を作成。正常に処理できた場合は数を増やす。
`
> for ($i=1; $i -le 200; $i++) {
>>     $client = New-Object System.Net.Sockets.TcpClient("localhost", 3000)
>>     Write-Host "connected $i"
>> }
`
結果：
58個めでエラー。
クライアント側：
`
connected 51
connected 52
connected 53
connected 54
connected 55
connected 56
connected 57
New-Object : "2" 個の引数を指定して ".ctor" を呼び出し中に例外が発生しました: "対象のコンピューターによって拒否されたた
め、接続できませんでした。 127.0.0.1:3000"
発生場所 行:2 文字:15
+ ...   $client = New-Object System.Net.Sockets.TcpClient("localhost", 3000 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (:) [New-Object]、MethodInvocationException
    + FullyQualifiedErrorId : ConstructorInvokedThrowException,Microsoft.PowerShell.Commands.NewObjectCommand
`
サーバ側：
`
Listening on http://localhost:3000
node:events:497
      throw er; // Unhandled 'error' event
      ^

Error: read ECONNRESET
`
理由：
ECONNRESETはTCP接続においてサーバ側から強制的に通信を切断されたことを示す。（RSTパケット受信：TCPにおける切断のパケットのこと）

  
- サーバーは同時に何個のTCP接続を処理できる？ https://www.reddit.com/r/AskProgramming/comments/io4al6/how_many_concurrent_tcp_connections_can_a_server/?tl=ja
`

### リクエストボディ
POSTで送ったとき
POST /greeting HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Length: 21
Cache-Control: max-age=0
sec-ch-ua: "Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Origin: http://localhost:3000
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: http://localhost:3000/
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: ja,en;q=0.9,en-US;q=0.8

name=aaa&greeting=aaa

### POST
`
{
  'POST /greeting HTTP/1.1\r\nHost: 127.0.0.1:3000\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 33\r\nConnection: close\r\n\r\nname': 'Hello',
  greeting: 'World'
}
`