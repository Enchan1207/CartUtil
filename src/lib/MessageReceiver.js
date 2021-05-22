//
// メッセージ受信クラス
//
import Message from "./Message.js";
export default class MessageReceiver {

    /**
     * @module constructor
     * @param {Object} callback - メッセージ受信時のコールバック
     */
    constructor() {
        this.callback = (request, sender, sendResponse) => {return;};
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            const message = new Message(request.source, request.command, request.args, request.response, request.errors);
            this.callback(message, sender, sendResponse);
        });
    }
}
