//=============================================================================
// mumaaku_tpmax.js
// PUBLIC DOMAIN
//=============================================================================
/*:
 * @target MZ
 * @url https://wiki3.jp/botbot
 * @plugindesc TPMAXを変更
 * @author 夢魔 渥(むま あく)
 * 
 * @param tpmax
 * @desc TPの最大値を変更します。(設定は100)
 * @default 100
 * @type number
 * 
 * @help
 * パーティのTPの最大値を変更します。
 */

(function() {

  var parameters = PluginManager.parameters('mumaaku_tpmax');
  var tpmax = String(parameters["tpmax"]);

Game_BattlerBase.prototype.maxTp = function() {
    return tpmax;
};

})();