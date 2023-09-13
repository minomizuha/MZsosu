//=============================================================================
// mumaaku-NovelMessage.js
//=============================================================================
/*:ja
 * @plugindesc 全画面型のメッセージウィンドウです。
 * @target MZ
 * @author 夢魔渥
 *
 * @param Switch ID
 * @desc ノベルモードにするためのスイッチのIDです。
 * @default 1
 * @type number
 * @min 1
 *
 * @help
 * ノベルモードにて改ページをするには、制御文字「\F」を使用してください。
 *
 * このプラグインには、プラグインコマンドはありません。
 * Yoji Ojimaさま、 神無月サスケさま、DarkPlasmaさま、ありがとうございます！
 */

(function() {

    var parameters = PluginManager.parameters('mumaaku-NovelMessage');
    var switchId = Number(parameters['Switch ID'] || 1);

    function isNovelMode() {
        return $gameSwitches.value(switchId);
    };

    var _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.call(this);
        this._novelLineY = 0;
        this._novelNewPage = true;
    };

    var _Window_Message_updatePlacement =
            Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        if (isNovelMode()) {
            this.width = 816;
            this.height = 624;
            this.x = (Graphics.boxWidth - this.width) / 2;
        }
        else{
            // this.x = (Graphics.boxWidth - this.width) / 2;
            this.height = 170;
            this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
        }
        _Window_Message_updatePlacement.call(this);
        if (isNovelMode()) {
            this.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        }
        if (this.contents.height !== this.contentsHeight()) {
            this.contents.resize(this.contentsWidth(), this.contentsHeight());
        }
    };

    var _Window_Message_updateBackground =
            Window_Message.prototype.updateBackground;
    Window_Message.prototype.updateBackground = function() {
        _Window_Message_updateBackground.call(this);
        if (isNovelMode()) {
            this.setBackgroundType($gameMessage.background());
        }
    };

    var _Window_Message_onEndOfText = Window_Message.prototype.onEndOfText;
    Window_Message.prototype.onEndOfText = function() {
        if (isNovelMode()) {
            this.processNewLine(this._textState);
        }
        _Window_Message_onEndOfText.call(this);
    };

    var _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage.call(this);
        if (isNovelMode()) {
            this._textState.y = this._novelLineY;
        }
    };

    var _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        if (!isNovelMode() || this._novelNewPage) {
            _Window_Message_newPage.call(this, textState);
            this._novelLineY = 0;
            this._novelNewPage = false;
        }
        if (isNovelMode()) {
            textState.x = textState.startX;
            textState.y = this._novelLineY;
            textState.height = this.calcTextHeight(textState);
            this._lineShowFast = false;
            this._pauseSkip = false;
            if (this.needsNewPage(textState)) {
                this.contents.clear();
                textState.x = textState.startX;
                textState.y = 0;
                this._novelNewPage = true;
                this.startPause();
            }
        }
    };

    var _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function(textState) {
        _Window_Message_processNewLine.call(this, textState);
        if (isNovelMode()) {
            this._novelLineY = this._textState.y;
        }
    };

    var _Window_Message_processEscapeCharacter =
            Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        if (isNovelMode() && code === 'F') {
            textState.y = this.contents.height;
            this._novelNewPage = true;
            return;
        }
        _Window_Message_processEscapeCharacter.call(this, code, textState);
    };

    var _Window_ChoiceList_updatePlacement =
            Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function() {
        _Window_ChoiceList_updatePlacement.call(this);
        if (isNovelMode()) {
            this.y = Graphics.boxHeight - this.height - 8;
        }
    };

    var _Window_NumberInput_updatePlacement =
            Window_NumberInput.prototype.updatePlacement;
    Window_NumberInput.prototype.updatePlacement = function() {
        _Window_NumberInput_updatePlacement.call(this);
        if (isNovelMode()) {
            this.y = Graphics.boxHeight - this.height - 8;
        }
    };

    var _Window_NumberInput_buttonY =
            Window_NumberInput.prototype.buttonY;
    Window_NumberInput.prototype.buttonY = function() {
        if (isNovelMode()) {
            return 0 - this._buttons[0].height - 8;
        } else {
            return _Window_NumberInput_buttonY.call(this);
        }
    };

})();
