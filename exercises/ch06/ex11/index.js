// 極座標変換
// x = r × cos(θ)
// y = r × sin(θ)
// r = √(x² + y²)
// θ = arctan(y, x)

export const obj = {
 r: 1.0,
 theta: 0.5,

 get x() {
    return this.r * Math.cos(this.theta);
 },
 set x(newvalue) {
   if (isNaN(newvalue) || newvalue === null) {
     throw new TypeError("Error: x は数値");
   }
   // 現在のyの値を計算で求める
   const currentY = this.r * Math.sin(this.theta); // xの値の変更に伴い、yの値も変更されるので現在のyの値を求める
   this.r = Math.sqrt(newvalue * newvalue + currentY * currentY);
   this.theta = Math.atan2(currentY, newvalue);
 },

 get y() {
    return this.r * Math.sin(this.theta);
 },
 set y(newvalue) {
   if (isNaN(newvalue) || newvalue === null) {
     throw new TypeError("Error: y は数値");
   }
   // 現在のxの値を計算で求める
   const currentX = this.r * Math.cos(this.theta);
   this.r = Math.sqrt(currentX * currentX + newvalue * newvalue);
   this.theta = Math.atan2(newvalue, currentX);
 }
};

//  r: 1.0, theta: 0.5の時x= 0.8775825618903728, y: 0.479425538604203
// y: 0.479425538604203でx=2.0とするとr= 2.056659633256298, theta: 0.4580380388392796