// grid を canvas に描画する
export function renderGrid(grid, ctx, RESOLUTION) {

    const ROWS = grid.length;      // grid から取得
    const COLS = grid[0].length;   // grid から取得

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}