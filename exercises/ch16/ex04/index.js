import fs from "fs/promises";
import iconv from "iconv-lite";

const text = await fs.readFile("./ex04/hello.txt");
const decodedSJISText = iconv.decode(text, "Shift_JIS");
const decodedUTF8Text = iconv.decode(text, "utf8");
console.log(text);
console.log(decodedSJISText);
console.log(decodedUTF8Text);

// node:fsとfs/promises