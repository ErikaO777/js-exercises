import { newHashTable, hash } from "./index.js";

describe("ハッシュ関数", () => {
    test("get, put正常", () => {
    const hashTable = newHashTable(5);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    expect(hashTable.get("key1")).toBe("value1");
    expect(hashTable.get("key2")).toEqual({ value: "value2" });
  });

  test("remove正常", () => {
    const hashTable = newHashTable(5);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2" );
    hashTable.remove("key1");
    
  });
  test("衝突", () => {
    const hashTable = newHashTable(10);
    hashTable.put("ak", "value1");
    hashTable.put("abced", "value2");
    hashTable.put("cabde", "value3");

    expect(hashTable.entries).toBe([
      { key: "ak", value: "value1", next: undefined },
      {
        key: "abced",
        value: "value2",
        next: { key: "cabde", value: "value3", next: undefined },
      },
      undefined,
    ]);
  });
});
