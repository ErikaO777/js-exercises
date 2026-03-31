// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);

    const ROWS = grid.length;      // grid から取得
    const COLS = grid[0].length;   // grid から取得

    // row と col をループして各セルを更新
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            let n = 0;
            const alive = grid[row][col];

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = col + dx,
                        ny = row + dy;
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