try {
    console.log("Start");
    throw new Error("テスト用のエラー");
} catch (error) {
    console.error(error);
} finally {
    console.log("Complete");
}

// console.error("Error:" + error.message); →Error:テスト用のエラー
// console.error("Error:" + error);　→Error:Error: テスト用のエラー
// console.error(error); →エラー