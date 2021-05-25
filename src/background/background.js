//
// background script
//

import MessageReceiver from "../lib/MessageReceiver.js";

const main = () => {
    const receiver = new MessageReceiver();
    receiver.callback = (message, sender, sendResponse) => {
        if(message.source == "content" && message.command == "openoption"){
            chrome.runtime.openOptionsPage();
        }
        sendResponse(message);
    };
}
main();
