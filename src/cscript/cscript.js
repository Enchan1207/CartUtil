//
// content script
//
import MessageReceiver from "../lib/MessageReceiver.js"

(() => {
    const receiver = new MessageReceiver();
    receiver.callback = (message, sender, sendResponse) => {
        console.log(message);
        sendResponse(message);
    };
})();
