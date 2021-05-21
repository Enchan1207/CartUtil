//
// メッセージ受信クラス
//

class MessageReceiver{

    /**
     * @module constructor
     * @param {Object} callback - メッセージ受信時のコールバック
     */
    constructor(callback){
        this.callback = callback
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            const message = new Message(request.source, request.command, request.args, request.response, request.errors);
            this.callback(message, sender, sendResponse);
        });
    }
}
