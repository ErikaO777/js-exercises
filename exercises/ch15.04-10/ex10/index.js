// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  // row と col をループして各セルを更新
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let n = 0;
      const alive = grid[row][col];

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = col + dx, ny = row + dy;
          if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
            n += grid[ny][nx];
          }
        }
      }

      // 誕生・生存・死滅のルール
      // - 誕生: dead && cnt==3
      // - 生存: alive && (cnt==2 || cnt==3)
      // - それ以外は死/維持（deadのまま）
      if (alive) {
        nextGrid[row][col] = n === 2 || n === 3;
      } else {
        nextGrid[row][col] = n === 3;
      }

    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// 表示の更新頻度を一定にするにはrequestAnimationFrameの第一引数にコールバック関数を渡す
// フレーム数依存ではなく経過時間に対しての進行量の設定が必要
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

// 更新を固定にする
const TARGET_FPS = 30;        // 間隔を30FPSに設定              
const FRAME_INTERVAL = 1000 / TARGET_FPS;   // ミリ秒単位のフレーム間隔
let lastTime = 0;         // 前フレームのtimestamp
let accumulator = 0;      // 経過時間の蓄積
const MAX_STEPS = 5;     // 最大更新ステップ数


function callback(now) {
  if (!lastTime) lastTime = now; // 初回のみ初期化(現在のtimestamp)

  // 経過時間を蓄積
  let delta = now - lastTime; // 現時刻から前更新時刻を引く
  lastTime = now; // 前更新時刻を現時刻に
  delta = Math.min(delta, 250); // 最大250msまでに制限

  accumulator += delta; // 経過時間の蓄積

  // 一定間隔（FRAME_INTERVAL）を超えた分だけ、更新を実施
  let steps = 0;
  while (accumulator >= FRAME_INTERVAL && steps < MAX_STEPS) { // 蓄積時間の方が更新間隔以上で、最大ステップ数未満の間
    grid = updateGrid(grid); // 画面更新
    accumulator -= FRAME_INTERVAL; // 蓄積時間から更新間隔を引く
    steps++;
  }

  // 描画は毎フレーム実施（見た目は高Hzでも滑らか、進行は一定）
  renderGrid(grid);

  animationId = requestAnimationFrame(callback);
}

// function update() {
//   grid = updateGrid(grid);
//   renderGrid(grid);
//   // 第一引数指定でリフレッシュレートを制御する
//   animationId = requestAnimationFrame(update);
// }

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  // 前更新時刻、蓄積時間をリセット
  lastTime = 0;
  accumulator = 0;
  animationId = requestAnimationFrame(loop);
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);


// 参考
// https://snap-roll-blog.blogspot.com/2015/08/javascript.html
