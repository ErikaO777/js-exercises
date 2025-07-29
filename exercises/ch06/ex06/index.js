let x = {
  a: 1,
  b: 2,
  c: 3,
};

let y = Object.create(x);
y.d = 4;

const parent = { name: "Jack" };
const child = Object.create(parent);
child.age = 19;

// すべての独自のプロパティと、列挙可能な継承プロパティの全てを配列で返す
export function showAllProperties(obj) {
  let property_list = [];

  let current = obj;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach(function (key) {
      // getOwnPropertyNamesは列挙可能なプロパティと列挙不可のプロパティを両方取得
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor.enumerable) {
        property_list.push(`${key}:${current[key]}`);
      } else {
        property_list.push(`${key}:${current[key]}`);
      }
    });
    current = Object.getPrototypeOf(current);
  }

  console.log("property_list: " + property_list);
  return property_list;
}

showAllProperties(y);
showAllProperties(child);

// export function showAllPropertiesOld(obj) {
//   let key_list = [];
//   Object.getOwnPropertyNames(obj).forEach(function (key) {
//     key_list.push(`${key}:${obj[key]}`);
//     console.log(`${key}=${obj[key]}`);
//   });

//   console.log("key_list: " + key_list);

//   //for/inループは継承されたプロパティも列挙する
//   let all_key_list = [];
//   // 列挙不可の独自プロパティはgetOwnPropertyNamesで取得
//   if (Object.getOwnPropertyDescriptor(obj, key_list[0]).enumerable === false) {
//     Object.getOwnPropertyNames(obj).forEach(function (key) {
//       key_list.push(`${key}:${obj[key]}`);
//     });
//   } else {
//     // それ以外
//     for (let key in obj) {
//       all_key_list.push(`${key}:${obj[key]}`);
//     }
//     console.log(all_key_list);
//   }
// }
