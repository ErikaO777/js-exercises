import fs from 'node:fs';

// NOTE: file.txt の内容をアップロード
// fetch("http://localhost:8000/foo/bar/big.txt", {
//     method: "PUT",
//     body: fs.createReadStream("./ch16/ex10/big.txt"),
//     duplex: "half",
// });



const fd = await fs.promises.open("./ch16/ex10/big.txt", "r");
const body = new ReadableStream({ async pull(c) { const b = Buffer.alloc(65536); const { bytesRead } = await fd.read(b, 0, b.length); if (!bytesRead) { c.close(); return; } c.enqueue(new Uint8Array(b.buffer, 0, bytesRead)); } });
fetch("http://localhost:8000/foo/bar/big.txt", {
    method: "PUT",
    body,
    duplex: "half",
});
