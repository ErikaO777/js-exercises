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

// mathの全員の合計点
let sumResult = data.reduce((x, y) => x + y.math, 0);
console.log("mathの全員の合計点:", sumResult);

// クラスAのchemistryの平均点
let classAChemistryAvg = data
  .filter((student) => student.class === "A") // filterでクラスAの生徒を抽出
  .reduce((x, y) => x + y.chemistry, 0) / 3; // クラスAのchemistryの合計点を3で割る
console.log("クラスAのchemistryの平均点:", classAChemistryAvg);

// 3科目合計点のクラスC内での平均点
let classCTotalAvg = data
  .filter((student) => student.class === "C") // クラスCの生徒を抽出
  .reduce((x, y) => x + y.math + y.chemistry + y.geography, 0) / 3; // クラスCの生徒の3科目合計点を3で割る
console.log("3科目合計点のクラスC内での平均点:", classCTotalAvg);

// 3科目合計点が最も高い人のname
let topStudent = data.reduce((top, current) => {
  let topTotal = top.math + top.chemistry + top.geography; // 3科目の合計点
  let currentTotal = current.math + current.chemistry + current.geography; // 回している中で現在の生徒の3科目の合計点
  // 回している中で現在の生徒の合計点がトップの合計点よりも高い場合、現在の生徒をトップにする
  if (currentTotal > topTotal) {
    return current;
  }else {
    return top; 
  }
});
console.log("3科目合計点が最も高い人のname:", topStudent.name);

// 全体のgeographyの標準偏差
let geographyScores = data.map(student => student.geography); // 地学の点数を抽出
let geographyMean = geographyScores.reduce((a, b) => a + b, 0) / geographyScores.length; // 平均
let geographyVariance = geographyScores.reduce((a, b) => a + (b - geographyMean) ** 2, 0) / geographyScores.length; // 分散
let geographyStdDev = Math.sqrt(geographyVariance); // 標準偏差
console.log("全体のgeographyの標準偏差:", geographyStdDev);

/////////// 結果果 //////////
// mathの全員の合計点: 530
// クラスAのchemistryの平均点: 45
// 3科目合計点のクラスC内での平均点: 176.66666666666666
// 3科目合計点が最も高い人のname: Frank
// 全体のgeographyの標準偏差: 22.3330569358242