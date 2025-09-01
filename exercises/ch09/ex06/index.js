// 複数の関数から新しい関数を作る
// その機能を内部に持つ

export class TypedMap {
  constructor(keyType, valueType, entries) {
    // ここでMapの委譲
    this.map = new Map(entries);

    // entries が指定されている場合、型をチェックする。(参考書同様)
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }

    this.keyType = keyType;
    this.valueType = valueType;
  }

  set(key, value) {
    // key やvalue の型が異なっている場合は、エラーをスローする。(参考書同様)
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    return this.map.set(key, value);
  }
}
