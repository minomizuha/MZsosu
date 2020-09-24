//=============================================================================
// mumaaku_yukadamenado.js
// PUBLIC DOMAIN
//=============================================================================
/*:
 * @target MZ
 * @url https://wiki3.jp/botbot
 * @plugindesc ごちゃまぜプラグイン
 * @author 夢魔 渥(むま あく)
 * 
 * @param subayasa
 * @desc 歩く素早さを変更します(デフォルトは256)
 * @default 256
 * 
 * @param aitemusaidai
 * @desc アイテム最大値を変更します(デフォルトは99)
 * @default 99
 * 
 * @param sikinsaidai
 * @desc 資金最大値を変更します(デフォルトは99999999)
 * @default 99999999
 * 
 * @help
 * １．ダメージ床のダメージを調整します。(直にいじってください。)
２．歩行速度を変更します。
３．アイテムの最大値を変更します。
４．資金の最大値を変更します。
 */

(function() {

  var parameters = PluginManager.parameters('mumaaku_yukadamenado');
  var subayasa = String(parameters["subayasa"]);
  var aitemusaidai = String(parameters["aitemusaidai"]);
  var sikinsaidai = String(parameters["sikinsaidai"]);

//ここから直にいじってください。
Game_Actor.prototype.basicFloorDamage = function() {
    //return 10;
if (this._level <= 15){ //レベル15以下の時

return 10 + this._level * 2; //10+現在レベル*2のダメージ

} else if (this._level >= 16) { //レベル16以上の時

return 10 + this._level * 5; //10+現在レベル*5のダメージ

} else if (this._level >= 50) { //レベル50以上の時

return 50 + this._level * 5; //10+現在レベル*5のダメージ

} else if (this._level >= 80) { //レベル80以上の時

return 100 + this._level * 5; //10+現在レベル*5のダメージ

}
};
//ここまで直にいじってください。

Game_CharacterBase.prototype.distancePerFrame = function() {
    return Math.pow(2, this.realMoveSpeed()) / subayasa;
};

Game_Party.prototype.maxItems = function(/*item*/) {
    return aitemusaidai;
};

Game_Party.prototype.maxGold = function() {
    return sikinsaidai;
};

})();