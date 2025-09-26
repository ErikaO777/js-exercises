// 常に正の数値を保持する
// クロージャはプライベート変数を作れる
export function PositiveNumber(x) {

    if (x <= 0) {
      throw new Error("require : x > 0");
    }

    let _x = x; // アンダーバー_を付けることでプライベート変数であることを示す

    return {
        getX: () => {
            console.log(_x);
            return _x;
        },
        setX: (x) => {
            if (x <= 0) {
                throw new Error("require : x > 0");
            }
            _x = x;
        }
    };
}


const pn = PositiveNumber(3);
pn.getX();     
pn.setX(15);   
pn.getX();     
pn._x = 8;     
pn.getX();     

// クラスはプライベート変数（#など）、関数はクロージャを用いて隠す？