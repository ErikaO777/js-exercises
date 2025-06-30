import { parseJSON } from "./index.js";

describe("JSONパースを行う", () => {
  test("正常 {name: John, age: 30}", () => {
    expect(parseJSON('{"name": "John", "age": 30}')).toStrictEqual({"success":true,"data":{"name":"John","age":30}});
  });
  test("undefined含まれる", () => {
    expect(parseJSON('{"value": undefined}')).toStrictEqual({"success":false,"error":"Unexpected token u in JSON at position 10"});
  });
  test("シングルクォートが入っている", () => {
    expect(parseJSON('{\'name\': \'John\'}')).toStrictEqual({"success":false,"error":"Unexpected token ' in JSON at position 1"});
  });
});
