//
// lib-script injector
//

(() => {
    // 重複ロード防止
    const loadID = `${chrome.runtime.id}-script`;
    if (document.getElementById(loadID)) {
        return;
    }
    const loadIdentifierElement = document.createElement("meta");
    loadIdentifierElement.id = loadID;
    document.head.appendChild(loadIdentifierElement);

    // 動的import
    (async () => {
        const cscript = await import(chrome.runtime.getURL("src/cscript/cscript.js"));
        cscript.main();
    })();
})();
