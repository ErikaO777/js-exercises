console.log("undefinedは " + typeof undefined);
console.log("nullは " + typeof null);
console.log("objectは " + typeof {});
console.log("NaNは " + typeof NaN);
console.log("0は " + typeof 0);
console.log("functionは " + typeof function () {});

// 予想
// undefinedはundefined
// nullはobject
// objectはobject
// NaNはobject
// 0はnumber
// functionはfunction
