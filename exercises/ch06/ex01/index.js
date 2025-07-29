// マッピングの追加、取得、削除を行うメソッドおよびマッピング数を示すプロパティをもつ
//ハッシュテーブルは生成時に配列のサイズを受け取り、固定長の配列にマッピング情報を保持する

export function hash(key, capacity) {
  //ハッシュ関数
  // console.log(`key=${key}, entries=${entries}`);

  let num = 0; // 初期化が必要
  for (let i = 0; i < key.length; i++) {
    num += key.charCodeAt(i); // keyの各1文字1文字のコードを取得して合計する
  }

  console.log(`hash=${num % capacity}`);
  return num % capacity; // ハッシュ値に対して配列サイズの剰余(インデックス)
}

// ハッシュ値は保存するのか？
// ハッシュ値のベストな生成方法は？

export function newHashTable(capacity) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列
    get(key) {
      // keyにマップされた値を取得する

      const index = hash(key, capacity);
      let entry = this.entries[index];
      while (entry) {
        if (entry.key === key) return entry.value;
        entry = entry.next;
      }
      return undefined;

      // if (key !== undefined) {
      //   //keyがundefinedでない場合はvalueを返す
      //   return this.entries[hash(key, capacity)];
      // } else if (key === undefined) {
      //   //keyがundefinedの場合はundefinedを返す
      //   return undefined;
      //}
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      // keyがすでに存在する場合は入力されたvalueを上書きする
      // keyが存在せず、undefinedでない場合は入力された値を追加する

      const index = hash(key, capacity);
      const newEntry = { key, value, next: undefined };

      if (!this.entries[index]) {
        this.entries[index] = newEntry;
      } else {
        let current = this.entries[index];
        while (true) {
          if (current.key === key) {
            current.value = value; // 上書き
            return;
          }
          if (!current.next) break;
          current = current.next;
        }
        current.next = newEntry; // 末尾に追加
      }

      this.size += 1;

      // const bucket = this.entries[index];
      // const existing = bucket.find((e) => e.key === key);
      // if (existing) {
      //   existing.value = value; // 上書き
      // } else {
      //   bucket.push({ key, value }); // 新規追加
      //   this.size += 1;
      // }
    },
    remove(key) {
      // keyのマッピングを削除する

      const index = hash(key, capacity);
      let entry = this.entries[index];
      let prev = null;

      while (entry) {
        if (entry.key === key) {
          if (prev) {
            prev.next = entry.next;
          } else {
            this.entries[index] = entry.next;
          }
          this.size -= 1;
          return;
        }
        prev = entry;
        entry = entry.next;
      }

      // if (this.entries[index] !== undefined) {
      //   this.entries[index] = undefined; // spliceだとサイも変更されてしまうう
      //   this.size -= 1;
      // }
      console.log(`remove key=${key}, size=${this.size}`);
    },
  };
}

function sample() {
  const hashTable = newHashTable(10);
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}

sample();
hash("ak", 10);
hash("abced", 10);
hash("cabde", 10);
