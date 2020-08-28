//=============================================================================
// kouya_scroll.js
// PUBLIC DOMAIN
//=============================================================================
/*:
 * @target MZ
 * @url https://wiki3.jp/botbot
 * @plugindesc スクロール文字の速度調整
 * @author 超巨大ドリル戦艦アラハバキ　ベース：mo-to様
 * 
 * @help
 * 速度を早めます。
設定するのは、早めるボタン、速度です。
早めるボタンはキャンセルキーを設定してあります。
速度はデフォルトでは５になっております。
 *
 * @param ButtonType
 * @desc 早めるボタン (デフォルト:cancel)
 * @default cancel
 * @type select
 * @option cancel
 * @option down
 * @option up
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 *
 * @param hayasadayo
 * @desc 速度(デフォルトは５です。)
 * @default 5
 * @type number
 */

(function() {

  var parameters = PluginManager.parameters('kouya_scroll');
  var ButtonType = String(parameters['ButtonType'] != 'ok' && parameters['ButtonType']);
  var hayasadayo = String(parameters["hayasadayo"]);
  
  var _Window_ScrollText_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;
  Window_ScrollText.prototype.scrollSpeed = function() {
      var speed = $gameMessage.scrollSpeed() / 2;
      if  (this.isStopForward()) {
          return speed *= hayasadayo;
      }
      return _Window_ScrollText_scrollSpeed.call(this);

  };

  Window_ScrollText.prototype.isStopForward = function() {
      return (Input.isPressed(ButtonType));
  };
  
})();