/*
 * コンテンツスクリプト
*/

/*
    コンテンツスクリプト側ではポップアップのメッセージに応じて
    ・ポップアップ側のコマンドに従って
    ・商品ページであれば商品情報を
    ・カートであればカートの中身を
    返す

    それ以外は特に処理を行わず、ポップアップ側でもウィッシュリストを表示するにとどめる
*/

//--表示しているページから商品情報を取得する
function getIteminfo() {
    let list = document.querySelectorAll("#goods_breadcrum div a");
    let desc = list[list.length - 1].innerHTML;
    let code = /akizukidenshi.com\/catalog\/g\/g(.*)\//.exec(location.href)[1];
    let price = /(\d)*$/.exec(document.querySelectorAll(".order_g .f14b")[1].innerText)[0];
    let count = document.querySelectorAll(".order_g .cart_tdc_sbn")[1].querySelector("input").value;
    let dat_ = {
        type: "productinfo",
        desc: desc,
        code: code,
        price: price,
        count: count
    };
    return dat_;
}

//--カートの一覧を取得する
function getCartItems() {
    //--カートリストから、通販コードのtdがあるtrのみ取り出す
    let cartElems_ = document.querySelectorAll("table.cart_table tr");
    let cartList = {
        type: "cartinfo",
        products: []
    };

    cartElems_.forEach(cartElem_ => {
        //--商品情報を持つ要素を取得
        let code_descElems_ = cartElem_.querySelectorAll("td.cart_tdl");
        let descElem_ = code_descElems_[1].querySelectorAll("a")[1];
        let codeElem_ = code_descElems_[0].querySelector("a");
        let priceElem_ = cartElem_.querySelector("td.cart_tdcb span");
        let countElem_ = cartElem_.querySelector("td.cart_tdc input");

        //--要素がそろえば商品情報のtrと判断し、リストに追加
        if(codeElem_ != null && countElem_ != null && descElem_ != null){
            let desc = descElem_.innerHTML;
            let code = codeElem_.innerHTML;
            let price = priceElem_.innerHTML.replace("(￥|,)", "");
            let count = numberElem_.getAttribute("value");
            
            //--一応通販コードか確認
            if(/(M|K|P|B|R|S|I|C|T)\-\d\d\d\d\d/.test(codeElem_.innerHTML) == true){
                cartList.products.push({
                    desc: desc,
                    code: code,
                    price: price,
                    count: count
                });
            }
        }
    });
    return cartList;
}

//--カートクエリからエクスポート
function listExport(cart){
    //--インポート用のフォームを作る
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

    //--クリック
    document.querySelector("#importcartsubmit").click();
}

//--メッセージ受信時の処理
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    let command = message;    
    let dat = {};

    //--コマンド分岐
    switch (command.method) {
        //--ページ種別取得
        case "pageType":
            let type = "other";
            if(/akizukidenshi.com\/catalog\/g\/*/.test(location.href)) type = "product";
            if(/akizukidenshi.com\/catalog\/cart\/*/.test(location.href)) type = "cart";
            dat = {type: type};
            break;

        //--商品情報取得
        case "productInfo":
            console.log("return item info.");
            dat = getIteminfo();
            break;
        
        //--カート内容取得
        case "cartitems":
            console.log("return cart items.");
            dat = getCartItems();            
            break;

        //--任意ページリダイレクト
        case "location":
            location.href = command.href;
            break;

        //--カート内容エクスポート
        case "export":
            listExport(command.items);
            break;
    
        default:
            console.log("undefined method:" + command.method);
            break;
    }

    sendResponse(dat);
});