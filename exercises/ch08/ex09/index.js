// class Resource {
//   /** リソース解放のため利用終了時に呼び出すこと */
//   close() {}
// }

// const resource = new Resource();
// resource.doA();
// resource.doB();
// resource.close();

// 後処理付き関数として実装
export function withResource(resource, callback) {
  try {
    callback(resource);
  } finally {
    resource.close();
  }
}
