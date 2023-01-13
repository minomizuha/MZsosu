// mumaaku_titleend.js
/*:
 * @plugindesc タイトル、メニューの終了に終了コマンドを追加する
 * @target MZ
 * @author 夢魔渥
 * 
 * @param Shutdown
 * @text シャットダウン
 * @desc タイトル画面に追加するシャットダウンの項目名です。
 * ローカル環境での実行時のみ表示されます。
 * @default ゲーム終了
 * 
 * @param MShutdown
 * @text メニューシャットダウン
 * @desc タイトル画面に追加するシャットダウンの項目名です。
 * ローカル環境での実行時のみ表示されます。
 * @default ゲーム終了
 * 
 * @help mumaaku_titleend.js
 * 
 * タイトル画面にゲームを終了するコマンドを追加します。
 * プラグインコマンドはありません。
 * タイトルコマンドなどを操作するプラグインは競合しやすいです。
 * 注意してください。
 *
*/

function Scene_Terminate() {
    this.initialize.apply(this, arguments);
}

(() => {
    'use strict'

    var parameters = PluginManager.parameters('mumaaku_titleend');
    var Shutdown = String(parameters['Shutdown']) || 'ゲーム終了';
    var MShutdown = String(parameters['MShutdown']) || 'ゲーム終了';

    Window_TitleCommand.prototype.makeCommandList = function() {
        const continueEnabled = this.isContinueEnabled();
        this.addCommand(TextManager.newGame, "newGame");
        this.addCommand(TextManager.continue_, "continue", continueEnabled);
        this.addCommand(TextManager.options, "options");
        this.addCommand(Shutdown, "exit");
    };

    Scene_Title.prototype.createCommandWindow = function() {
        const background = $dataSystem.titleCommandWindow.background;
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_TitleCommand(rect);
        this._commandWindow.setBackgroundType(background);
        this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
        this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
        this._commandWindow.setHandler("options", this.commandOptions.bind(this));
        this._commandWindow.setHandler("exit", () => {
            this._commandWindow.close();
            SceneManager.exit();
        });
        this.addWindow(this._commandWindow);
    };

    Scene_Title.prototype.commandWindowRect = function() {
      const offsetX = $dataSystem.titleCommandWindow.offsetX;
      const offsetY = $dataSystem.titleCommandWindow.offsetY;
      const ww = this.mainCommandWidth();
      const wh = this.calcWindowHeight(4, true);
      const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
      const wy = Graphics.boxHeight - wh - 96 + offsetY;
      return new Rectangle(wx, wy, ww, wh);
  };

    const _SceneGameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
  Scene_GameEnd.prototype.createCommandWindow = function() {
    _SceneGameEnd_createCommandWindow.call(this);
    this._commandWindow.setHandler('shutdown',   this.commandShutdown.bind(this));
  };

  const _WindowGameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
  Window_GameEnd.prototype.makeCommandList = function() {
    _WindowGameEnd_makeCommandList.call(this);
    this.addCommand(MShutdown, 'shutdown');
  };

  Scene_GameEnd.prototype.commandShutdown = function () {
    this._commandWindow.close();
    SceneManager.exit();
  };

  Scene_GameEnd.prototype.commandWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(3, true);
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};
})();