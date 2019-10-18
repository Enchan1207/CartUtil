/*
 * contentscript(ページのHTMLいじれる方のjs)
*/

//--
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    let pageData; //ページデータ

    //--URLからページの種類を取得
    let type = "other";
    if(/akizukidenshi.com\/catalog\/g\/*/.test(location.href)) type = "product";

    //--商品ページなら、商品名と個数情報を取得
    switch (type) {
        case "product":
            console.log("process as product page.");
            let list = document.querySelectorAll("#goods_breadcrum div a");
            let desc = list[list.length - 1].innerHTML;
            let code = /akizukidenshi.com\/catalog\/g\/g(.*)\//.exec(location.href)[1];
            let price = /(\d)*$/.exec(document.querySelectorAll(".order_g .f14b")[1].innerText)[0];
            let count = document.querySelectorAll(".order_g .cart_tdc_sbn")[1].querySelector("input").getAttribute("value");

            pageData = {
                type: type,
                desc: desc,
                code: code,
                price: price,
                count: count
            };
            break;
    
        default:
            pageData = {
                type : type
            };
            break;
    }

    sendResponse(pageData);
});