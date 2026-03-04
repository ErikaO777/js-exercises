setInterval(() => {
  console.log("child processing...");
  if (Math.random() < 1 / 3) {
    console.log("An error occurred. Exiting...");
    process.exit(1);
  }
}, 100);

// 0~1のランダムな数値から1/3より小さい値が出たら異常終了