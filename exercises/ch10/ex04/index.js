export default class Attack{
    constructor(name, power){
        this.name = name;
        this.power = power;
    }

    use(){
        console.log(`${this.name}:` + this.power);
        return this.power;
    }
}

export function damage(hp, atk){
    return hp - atk;
}

// デフォルトのエクスポート
// export { Attack, damage };

// 再エクスポート
export { Magic, recovery } from './index2.js';
// すべて再エクスポートするときは export * from './index2.js';でもよい
// export { Magic } from './index2/Magic.js';　←不可
