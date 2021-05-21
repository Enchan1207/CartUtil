//
// content script
//

(() => {
    _ = new MessageReceiver((message, sender, sendResponse) => {
        console.log(message);
        sendResponse(message);
    });
})()
