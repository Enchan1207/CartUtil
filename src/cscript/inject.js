//
// lib-script injector
//

(() => {
    // 重複ロード防止
    const loadID = `${chrome.runtime.id}-script`
    if (document.getElementById(loadID)) {
        return;
    }
    const loadIdentifierElement = document.createElement("meta");
    loadIdentifierElement.id = loadID;
    document.head.appendChild(loadIdentifierElement);

    // 動的import
    const files = [
        // "src/lib/Message.js",
        // "src/lib/MessageSender.js",
        // "src/lib/MessageReceiver.js",
        "src/cscript/cscript.js"
    ];
    files.forEach(async (file) => { 
        await import(chrome.runtime.getURL(file));
    });
})();
