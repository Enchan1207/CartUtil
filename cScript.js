/*
 * contentscript(ページのHTMLいじれる方のjs)
*/

//--
chrome.runtime.onMessage.addListener(function(command, sender, sendResponse) {
    //--コマンド分岐
    let commandObject = command.value;
    switch (commandObject.command) {
        //--カートをエクスポートする
        case "export":
            console.log("export.");
            
            let cart = convertList();

            //--ページ内に偽装フォームを作成
            let ipForm = document.createElement("form");
            ipForm.setAttribute("style", "display:none;");
            ipForm.setAttribute("action", "/catalog/quickorder/blanketorder.aspx");
            ipForm.setAttribute("name", "blanket_form");
            ipForm.setAttribute("method", "post");
            let ipInput = document.createElement("input");
            ipInput.setAttribute("name", "blanket");
            ipInput.setAttribute("value", "True");
            let ipTArea = document.createElement("textarea");
            ipTArea.setAttribute("name", "regist_goods");
            ipTArea.innerHTML = cart;
            let ipSubmit = document.createElement("input");
            ipSubmit.setAttribute("id", "importcartsubmit");
            ipSubmit.setAttribute("type", "submit");
            ipForm.appendChild(ipInput);
            ipForm.appendChild(ipTArea);
            ipForm.appendChild(ipSubmit);
            document.body.appendChild(ipForm);

            //--フォームをクリック
            let formtarget = document.querySelector('input#importcartsubmit');
            formtarget.click();

            //--ポップアップにメッセージを送る
            let resp_export = {
                type: "export"
            };
            sendResponse(resp_export);
        break;
    
        default:
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
        break;
    }
});