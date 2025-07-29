const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 各クラス３人
// 数学、化学、地学

// mathの点数が高い順にソート
// mathが同点数の場合はchemistryの点数が高い順に、さらに同点数の場合はgeographyの点数が高い順に

data.sort((a, b) => b.math - a.math || b.chemistry - a.chemistry || b.geography - a.geography); 
// 左から実行(数学、次は化学、次は地学)
// a.XXX - b.XXX === 0なら変更されない

console.log("mathの点数が高い順にソート:", data);

// 結果
//  [
//     { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
//   {
//     name: 'Justin',
//     class: 'C',
//     math: 80,
//     chemistry: 40,
//     geography: 30
//   },
//   { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
//   { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
//   {
//     name: 'Mallet',
//     class: 'C',
//     math: 60,
//     chemistry: 70,
//     geography: 90
//   },
//   { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
//   { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
//   { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
//   { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 }
// ]