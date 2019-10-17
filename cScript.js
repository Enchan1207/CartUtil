/*
 * contentscript(ページのHTMLいじれる方のjs)
*/

//--こっちで余計に重たい処理しても仕方ないしタイトルとurlだけ持ってくればいいと思うの
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    let ret = {
        title: document.title,
        url: location.href
    };
    sendResponse(ret);
});