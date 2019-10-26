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
function getIteminfo(site) {
    let dat_ = {
        type: "productinfo",
        desc: "none",
        icon: "",
        code: "00000",
        price: "0",
        count: "0"
    }
    switch (site) {
        case "aki":
            let list = document.querySelectorAll("#goods_breadcrum div a");
            dat_.desc = list[list.length - 1].innerHTML;
            dat_.code = /akizukidenshi.com\/catalog\/g\/g(.*?)\/*$/.exec(location.href)[1];
            dat_.icon = "http://akizukidenshi.com/img/goods/L/" + dat_.code + ".jpg";
            dat_.price = /(\d)*$/.exec(document.querySelectorAll(".order_g .f14b")[1].innerText)[0];
            dat_.count = document.querySelectorAll(".order_g .cart_tdc_sbn")[1].querySelector("input").value;
            break;

        case "ssci":
            //--スイッチサイエンスさんはありがたいことにtableタグにまとまっているので、そのままqsaでtrだけ抜き出す
            let base = document.querySelectorAll("div.data>table>tbody>tr");
            dat_.desc = base[1].querySelector("td").innerHTML;
            dat_.code = base[3].querySelector("td").innerHTML;
            dat_.icon = base[0].querySelector("a").href.replace("500x500", "128x128");
            dat_.price = base[5].querySelector("td span.price").innerHTML.replace(/,/, "");
            dat_.count = base[6].querySelectorAll("td input")[1].value;
            break;

        default:
            break;
    }
    return dat_;
}

//--カートの一覧を取得する
function getCartItems(site) {
    let cartList = {
        type: "cartinfo",
        products: []
    };

    let cartElems_;
    switch (site) {
        case "aki":
            //--カートリストから、通販コードのtdがあるtrのみ取り出す
            cartElems_ = document.querySelectorAll("table.cart_table tr");
            cartElems_.forEach(cartElem_ => {
                //--商品情報を持つ要素を取得
                let code_descElems_ = cartElem_.querySelectorAll("td.cart_tdl");
                if(code_descElems_ == null) {
                    console.log("no item in this column.");
                    return;
                }
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
                        console.log("add products to cartlist.");
                    }
                }
            });
            break;

        case "ssci":
            //--
            cartElems_ = document.querySelectorAll("#cart form table tr");
            cartElems_.forEach(cartElem_ => {
                let desc = cartElem_.querySelector("td.name a").innerHTML;
                let code = /^\(\d*\)/.exec(cartElem_.querySelector("td.name span").innerHTML)[1];
                let price = cartElem_.querySelector("td.price").innerHTML.replace("(￥|,)", "");
                let count = cartElem_.querySelector("td.pcs span.quantity").innerHTML.replace(",", "");

                cartList.products.push({
                    desc: desc,
                    code: code,
                    price: price,
                    count: count
                });
            });
            break;
    
        default:
            break;
    }
    
    return cartList;
}

//--カートクエリからエクスポート
function listExport(site, cart){
    switch (site) {
        case "aki":
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
            break;

        case "ssci":
            //--その場でcsvファイルを作ってxhrで投げ、リロード
            let target = document.querySelector("input[name=csrfmiddlewaretoken]");
            let fdata = new FormData();
            let blob = new Blob([cart], {type: 'text/csv'});
            fdata.append("csrfmiddlewaretoken", target.value);
            fdata.append("file", blob);
            fdata.append("arudake", "");
            
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "https://www.switch-science.com/cart/loadcsv/", true);
            xhr.onload = function (event) {
                console.log(xhr.status);
                location.reload();
            };
            xhr.send(fdata);
            break;
    
        default:
            console.log("undefined site at export.");
            break;
    }
}

//--カート初期化
function cartClear(site) {
    try {
        switch (site) {
            case "aki":
                document.querySelector("input[name=clear]").click();
                break;
            
            case "ssci":
                document.querySelector("input[name=clear_cart]").click();
                break;
        
            default:
                break;
        }
    } catch (error) {
    }
}

//--メッセージ受信時の処理
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    let command = message;    
    let dat = {};

    //--コマンド分岐
    switch (command.method) {
        //--ページ種別取得
        case "pageType":
            let type = "other", site = "aki";
            //--サイト判別
            if(/akizukidenshi.com/.test(location.href)){
                site = "aki";
                if(/akizukidenshi.com\/catalog\/g\/*/.test(location.href)) type = "product";
                if(/akizukidenshi.com\/catalog\/cart\/*/.test(location.href)) type = "cart";
            }else if(/www.switch-science.com/.test(location.href)){
                site = "ssci";
                if(/www.switch-science.com\/catalog\/*/.test(location.href)) type = "product";
                if(/www.switch-science.com\/cart*/.test(location.href)) type = "cart";
            }

            dat = {type: type, site: site};
            break;

        //--商品情報取得
        case "productInfo":
            console.log("return item info.");
            dat = getIteminfo(command.site);
            console.log(dat);
            break;
        
        //--カート内容取得
        case "cartitems":
            console.log("return cart items.");
            dat = getCartItems(command.site);            
            break;

        //--任意ページリダイレクト
        case "location":
            location.href = command.href;
            break;

        //--カート内容クリア
        case "clear":
            cartClear(command.site);
            break;

        //--カート内容エクスポート
        case "export":
            listExport(command.site, command.items);
            break;
    
        default:
            console.log("undefined method:" + command.method);
            dat = {type: "received"};
            break;
    }

    console.log("send:" + dat.type);
    sendResponse(dat);
});