import { readFileSync } from "fs";
import { spawn } from "child_process";
import path from "path";

test("変更前と結果が同じであること", async () => {
  const inputPath = path.join(__dirname, "charfreq.js");
  const input = readFileSync(inputPath, "utf-8");

  const run = (file) =>
    new Promise((resolve, reject) => {
      const proc = spawn("node", [path.join(__dirname, file)]);
      let output = "";
      proc.stdout.on("data", (data) => (output += data));
      proc.stderr.on("data", (data) => reject(data.toString()));
      proc.on("close", () => resolve(output));
      proc.stdin.write(input);
      proc.stdin.end();
    });

  const result1 = await run("index.js");
  const result2 = await run("charfreq.js");

  expect(result1).toBe(result2);
});
