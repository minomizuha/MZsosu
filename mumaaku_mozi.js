//=============================================================================
// mumaaku_mozi.js
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc サブタイトル付き文字を変更するプラグイン(ヘルプ参照)
 * 元：Korokoro様、トリアコンタン様の合成
 * @author 夢魔渥
 *
 * @param titlecolor
 * @desc タイトル文字の輪郭の色(デフォルトは#000066)
 * @default #000066
 *
 * @param hutosa
 * @desc タイトル文字の太さ(デフォルトは10)
 * @min 0
 * @default 10
 * @type number
 *
 * @param ookisa
 * @desc タイトル文字の大きさ(デフォルトは72)
 * @default 72
 * @type number
 * 
 * @param SubTitle
 * @desc サブタイトル(デフォルトは～サブタイトル～)
 * @default ～サブタイトル～
 *
 * @param OffsetX
 * @desc オフセットX(デフォルトは0)
 * @min 0
 * @default 0
 * @type number
 *
 * @param OffsetY
 * @desc オフセットY(デフォルトは50)
 * @min 0
 * @default 50
 * @type number
 *
 * @param FontSize
 * @desc フォントサイズ(デフォルトは36)
 * @default 36
 * @type number
 *
 * @param hutosa2
 * @desc 文字の太さ(デフォルトは5)
 * @min 0
 * @default 5
 * @type number
 *
 * @param color2
 * @desc 文字の輪郭の色(デフォルトは#000000)
 * @default #000000
 * 
 * @help
 * タイトル文字の輪郭の色、タイトル文字の太さ、
タイトル文字の大きさ、メッセージウィンドウの輪
郭の色をいじれます。

協力：Naoya　様
ありがとうございます！

サブタイトルもいじれます。

このプラグインはちょっとした見た目変更とかに良いかもしれません。
気に入ってもらえた場合は、お使いください。
*/

(function() {

//プラグインパラメータの取得
var Parameters = PluginManager.parameters('mumaaku_mozi');
var titlecolor = String(Parameters['titlecolor']) || '#000066';//タイトルカラー(周り)
var hutosa = Math.floor(Number(Parameters['hutosa'])) || 10; //タイトル文字の太さ
var ookisa = Math.floor(Number(Parameters['ookisa'])) || 72;//タイトル文字の大きさ
var color2 = String(Parameters['color2']) || '#000000';
var SubTitle = String(Parameters["SubTitle"]);
var OffsetX = Number(Parameters["OffsetX"]) || 0;
var OffsetY = Number(Parameters["OffsetY"]) || 50;
var FontSize = Number(Parameters["FontSize"]) || 36;
var hutosa2 = Math.floor(Number(Parameters['hutosa2'])) || 5;

//ここからプログラム。↓ここからは触れなくてもOKです。
Scene_Title.prototype.drawGameTitle = function() {
    var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = titlecolor;
    this._gameTitleSprite.bitmap.outlineWidth = hutosa;
    this._gameTitleSprite.bitmap.fontSize = ookisa;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    var sx = 20;
    var sy = Graphics.height / 4 + OffsetY;
    var smaxWidth = Graphics.width - x * 2;
    var stext = SubTitle;
    this._gameTitleSprite.bitmap.fontSize = FontSize;
    this._gameTitleSprite.bitmap.drawText(stext, sx + OffsetX, sy, smaxWidth + OffsetX, 48, 'center');
};

var _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_resetFontSettings.call(this);
    this.contents.outlineColor = color2;
};

const  _Window_Base_createContents = Window_Base.prototype.createContents;
    Window_Base.prototype.createContents = function() {
        _Window_Base_createContents.apply(this, arguments);
        this.contents.outlineWidth = hutosa2;
    };

    ColorManager.outlineColor = function() {
        return color2;
    };

})();