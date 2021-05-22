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

    // scriptタグを生成して追加
    const files = [
        "src/cscript/cscript.js",
        "src/lib/Message.js",
        "src/lib/MessageSender.js",
        "src/lib/MessageReceiver.js"
    ];
    files.forEach(async (file) => { 
        await import(chrome.runtime.getURL(file));
    });
})();
