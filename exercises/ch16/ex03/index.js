import crypto from "crypto";
// ここを埋める
import fs from "fs/promises";
import { readFile } from "fs";

// 鍵を生成する
function generateKey() {
    // 32バイトの暗号論的疑似乱数を生成する
    // ここを埋める
    return crypto.randomBytes(32); // 32バイト = 256ビットの乱数鍵
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
    // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
    const iv = crypto.randomBytes(16); // 16バイトの乱数

    // 暗号化とBase64エンコード
    // ここを埋める
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // 鍵とIVから暗号機を作る
    let encryptedBase64 = cipher.update(text, "utf8", "base64") + cipher.final("base64"); // 平文をUTF-8からBase64に変換して暗号化
    // 暗号文とIVをbase64で返す
    return {
        value: encryptedBase64,
        iv: iv.toString("base64"),
    };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    // ここを埋める（fs.promisesで鍵を保存）
    const keyString = key.toString("base64"); // 鍵をBase64文字列に変換
    await fs.writeFile("key.json", JSON.stringify({ key: keyString }), "utf8"); // 鍵をJSON形式で保存(非同期処理)
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    // ここを埋める（fs.promisesで暗号データを保存）
    const encryptedData = JSON.stringify(data); // データをJSON文字列に変換
    await fs.writeFile("encryptedData.json", encryptedData, "utf8"); // データをJSON形式で保存(非同期処理)
}

async function readKey() {
    // ここを埋める（return Promise<鍵>）
    const keyData = await fs.readFile("key.json", "utf8"); // 鍵をJSON形式で読み込む(非同期処理)
    const keyObject = JSON.parse(keyData); // JSON文字列をオブジェクトに変換
    return Promise.resolve(Buffer.from(keyObject.key, "base64")); // Base64文字列をバッファに変換して返す
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
    // ここを埋める（return Promise<data>）
    const encryptedData = await fs.readFile("encryptedData.json", "utf8"); // 暗号データをJSON形式で読み込む(非同期処理)
    const dataObject = JSON.parse(encryptedData); // JSON文字列をオブジェクトに変換
    return Promise.resolve(dataObject); // データオブジェクトを返す valueとivはそのままBase64文字列
}

// 復号して平文を返す
function decrypt64(data, key) {
    // ここを埋める
    const iv = Buffer.from(data.iv, "base64"); // IVをBase64からバッファに変換
    const valueText = Buffer.from(data.value, "base64"); // 暗号文をBase64からバッファに変換
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv); // 鍵とIVから復号機を作る
    const decryptedText = decipher.update(valueText, "base64", "utf8") + decipher.final("utf8"); // 暗号文をBase64からUTF-8に変換して復号
    return decryptedText; // 復号した平文を返す
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
    // 平文
    const text = "Hello, World!";

    // 暗号化とBase64エンコード
    const key = generateKey();
    const encryptedData = encrypt64(text, key);

    // 鍵と暗号データをJSONで保存
    await writeKey(key);
    await writeEncrypt64(encryptedData);

    console.log("Encrypted Text (Base64):", encryptedData.value);

    // Base64デコードと復号
    const storedKey = await readKey();
    const storedEncryptedData = await readEncrypt64();
    const decryptedText = decrypt64(storedEncryptedData, storedKey);

    console.log("Decrypted Text:", decryptedText);
})();

// 参考　https://qiita.com/hinaqiita/items/719ff64c907aaa52d4f2