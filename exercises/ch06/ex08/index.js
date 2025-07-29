// テンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する
// target => 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。
//           Symbol と継承プロパティは削除対象外
// template => テンプレートオブジェクト — このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。
//             継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。
let obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  name1: "Alice",
  name2: "Jack",
};
const obj2 = {
  a: 1,
  b: 2,
  d: 4,
};
const obj3 = {
  name1: "Alice",
};
const parent = { parent: "parent" };

export function restrict(target, template) {
  // templateに無いプロパティはtargetから削除する

  for (let key in target) {
    // targetのプロパティでループ
    if (!template.hasOwnProperty(key)) {
      // key in template ではダメ
      // templateのプロパティにあるか確認し、無ければ削除
      delete target[key];
    }
  }
  console.log("削除後のtarget: ", target);
  return target;
}

// restrict(obj1, obj2);
// restrict({ parent: "parent" },Object.create(parent));

// あるオブジェクトのプロパティを別のオブジェクトから削除する
// target => 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。
//           Symbol と継承プロパティは削除対象外です。
// sources => 削除対象指定オブジェクト (単数または複数) — 削除したいプロパティを含むオブジェクトです。
//           Symbol と継承プロパティは削除対象になりません。
export function substract(target, ...sources) {
  // ...sourcesで指定したプロパティをtargetから削除する

  console.log("入力オブジェクト: ", target, sources);

  for (let source of sources) {
    // 削除対象のオブジェクト数分ループ

    for (let key in source) {
      // sourceのプロパティでループ
      if (source.hasOwnProperty(key)) {
        // sourceのプロパティにあるか確認し、あれば削除
        delete target[key];
      }
    }
  }

  console.log("削除後のtarget: ", target);
  return target;
}

// substract(obj1, obj2, obj3);
substract({ parent: "parent" }, parent); // {}
substract(Object.create(parent), [{}, parent]); // {}
substract({ parent: "parent" }, [Object.create(parent), parent]); // { parent: "parent" }
