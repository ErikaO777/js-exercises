// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数

export function getDays(year, premonth) {
  // 引数は数値

  if (typeof year !== "number" || typeof premonth !== "number") {
    throw new Error("引数は数値です");
  }

  let days;
  let date = new Date(year, premonth, 0); // 月は0-11, monthに0を指定すると前月の最終日になる
  days = date.getDate();

  return days;
}

console.log(getDays(2020, 2));

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数

export function getWeekdays(start, end) {
  // 形式チェック
  const format = /^\d{4}-\d{2}-\d{2}$/;
  if (!format.test(start) || !format.test(end)) {
    throw new Error("形式エラー");
  }

  let startDate = new Date(start);
  let endDate = new Date(end);

  let weekdaysCount = 0;
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    // 最後は日付のインクリメント
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      // 土日以外をカウント
      weekdaysCount++;
    }
  }

  console.log(weekdaysCount);
  return weekdaysCount;
}
getWeekdays("2020-01-01", "2020-01-31");
// getWeekdays('2020年01月01日', '2020年01月31日');

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function dayToString(date, locale) {
  // 形式チェック
  const format = /^\d{4}-\d{2}-\d{2}$/;
  if (!format.test(date)) {
    throw new Error("形式エラー");
  }

  // ロケールチェック
  try {
    const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(locale);
  } catch (e) {
    throw new Error("ロケール不正");
  }

  let dateObj = new Date(date);

  let dateStr = dateObj.toLocaleDateString(locale);

  return dateStr;
}
console.log(dayToString("2020-01-01", "ja-JP"));
// console.log(dayToString('2020-01-01', 'ああああ'));

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getDateObj() {
  let dateObj;
  let year;
  let monthIndex;
  const now = new Date();
  console.log(now);

  year = now.toISOString().split("-")[0]; // 14 Jun 2017 00:00:00 PDT　形式から年と月を取得
  monthIndex = now.toISOString().split("-")[1] - 1- 1; // 月は0-11なので-1、さらに先月にするため-1

  console.log(year, monthIndex);

  dateObj = new Date(year,monthIndex,1,0,0,0); 
  console.log(dateObj.toString());

  return dateObj;
}
getDateObj();