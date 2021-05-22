//
// メッセージ送信クラス
//
import Message from "./Message.js";

export default class MessageSender {

    /**
     * `Message`オブジェクトを送信する。
     * @module sendMessage
     * @param {number|null} destination - 送信先(`tab.id`の値)
     * @param {Message} message - 送信するメッセージ
     * @param {Object} callback - メッセージのレスポンスを受け取る関数
     */
    sendMessage(destination, message, callback) {
        if (!(message instanceof Message)) {
            console.warn(`passed argument ${message} is not instance of Message.`);
        }
        if (destination === null) {
            chrome.runtime.sendMessage(message, callback);
        } else {
            chrome.tabs.sendMessage(destination, message, callback);
        }
    }
}
