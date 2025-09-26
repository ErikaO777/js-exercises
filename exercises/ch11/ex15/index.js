// ベースの URL のパスとクエリを修正する
export function modifyUrl(obj) {
  let newURL;

  try {
    newURL = new URL(obj.base);
  } catch (e) {
    throw new Error("無効な URL");
  }

  // 引数の型チェック
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    throw new Error("無効な入力");
  }

  const queryParams = obj.addQuery;

  // urの修正
  // path,クエリが無い場合はそのままのURLを返す
  if (obj.path) {
    newURL.pathname = obj.path;
  }
  if (queryParams) {
    for (let i = 0; i < queryParams.length; i++) {
      const [key, value] = queryParams[i];
      newURL.searchParams.append(key, value);
    }
  }
  return newURL.href;
}

const urlObj = {
  base: "https://example.com/foo?a=b",
  addQuery: [["foo", "bar"]],
  path: "./buz",
};

console.log(modifyUrl(urlObj));

const urlObj2 = {
  base: "https://example.com/foo?a=b",
};
console.log(modifyUrl(urlObj2));
