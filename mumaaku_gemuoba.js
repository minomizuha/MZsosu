//=============================================================================
// mumaaku_gemuoba.js
// PUBLIC DOMAIN
//=============================================================================
/*:
 * @target MZ
 * @url https://wiki3.jp/botbot
 * @plugindesc 全滅時にスイッチON
 * @author 夢魔 渥(むま あく)
 * 
 * @param switch_ID
 * @desc スイッチIDを入力します(デフォルトは1)
 * @default 1
 * 
 * @help
 * スイッチを全滅時にONにします。
 */

(function() {

  var parameters = PluginManager.parameters('mumaaku_gemuoba');
  var switch_ID = String(parameters["switch_ID"]);

BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);//改造
            SceneManager.pop();//改造
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};

Scene_Base.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
        //SceneManager.goto(Scene_Gameover);//改造
        $gameSwitches.setValue(switch_ID,true);
    }
};

})();