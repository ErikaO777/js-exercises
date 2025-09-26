class Attack{
    constructor(name, power){
        this.name = name;
        this.power = power;
    }

    use(){
        console.log(`${this.name}:` + this.power);
        return this.power;
    }
}

function damage(hp, atk){
    return hp - atk;
}

module.exports = { Attack, damage };

// import するとき
// const Attack = require('./index.js');
// const myAttack = new Attack();
// const myDamage = damage(100, 30);