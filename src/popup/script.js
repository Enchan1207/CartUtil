//
// popup script
//
import Message from "../lib/Message.js";
import MessageReceiver from "../lib/MessageReceiver.js";
import MessageSender from "../lib/MessageSender.js";

document.addEventListener('DOMContentLoaded', async (event) => {

    const sender = new MessageSender();
    const currentTab = await getCurrentTab();
    setInterval(() => {
        const message = new Message("aki", "request", [], {}, []);
        sender.sendMessage(currentTab.id, message, (response) => {
            message.response = { date: `${new Date()}` };
            console.log(response);
        });
    }, 1000);

    const receiver = new MessageReceiver();
    receiver.callback = (message, sender, sendResponse) => {
        console.log(message);
        sendResponse(message);
    };

});

/**
 * 現在開いているタブを取得する。
 * @param {Object|null} query - クエリ(DI)
 * @returns Promise
 */
const getCurrentTab = (query = null) => {
    const q = query ?? { active: true, currentWindow: true };
    return new Promise((resolve, reject) => {
        chrome.tabs.query(q, (tabs) => {
            if (tabs.length == 0) {
                reject("couldn't specify tab!");
                return;
            }
            resolve(tabs[0]);
        });
    })
};
