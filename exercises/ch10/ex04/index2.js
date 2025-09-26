class Heal{
    constructor(name, power){
        this.name = name;
        this.power = power;
    }

    use(){
        console.log(`${this.name}:` + this.power);
        return this.power;
    }
}

function recovery(hp, heal){
    return hp + heal;
}

// デフォルトのエクスポート
export  { Heal as Magic, recovery };