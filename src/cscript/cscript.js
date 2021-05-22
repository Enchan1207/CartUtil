//
// content script
//
import Message from "../lib/Message.js";
import MessageReceiver from "../lib/MessageReceiver.js";
import MessageSender from "../lib/MessageSender.js";

export function main() {
    const receiver = new MessageReceiver();
    receiver.callback = (message, sender, sendResponse) => {
        console.log(message);
        sendResponse(message);
    };

    const sender = new MessageSender();
    setInterval(() => {
        sender.sendMessage(null, new Message("ssci", "174", [], null, null), (response) => {
            console.log(response);
        });
    }, 1000);
}
