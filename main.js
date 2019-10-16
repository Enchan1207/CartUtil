window.onload = function () {

    //--かごリストを取得
    let target = document.querySelector("body");
    cartImport();

    //--ボタン生成
    let base = document.createElement("div");
    let extd = document.createElement("span");
    let exButton = document.createElement("button");
    exButton.addEventListener( "click" , savecart , false );
    exButton.innerHTML = "かごをエクスポートする";
    extd.appendChild(exButton);
    base.appendChild(extd);

    let intd = document.createElement("span");
    let inButton = document.createElement("button");
    inButton.addEventListener( "click" , loadcart , false );
    inButton.innerHTML = "かごをインポートする";
    intd.appendChild(inButton);
    base.appendChild(intd);

    target.appendChild(base);
}

//--ロード/セーブ
function savecart() {
    let cart = cartExport();
    localStorage.setItem("cart", cart);
}
function loadcart(){
    let target = document.querySelector('input#importcartsubmit');
    target.click();
};

//--保存した通販コードをインポート
function cartImport(){
    //localstorageから読んでくる
    let cart = localStorage.getItem("cart");
    if(cart == null) cart = "";

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
}

//--通販コードをエクスポート
function cartExport() {
    //--カートリストから、通販コードのtdがあるtrのみ取り出す
    let cartElems_ = document.querySelectorAll("table.cart_table tr");
    let cartList = "";

    cartElems_.forEach(cartElem_ => {
        let pcodeElem_ = cartElem_.querySelector("td.cart_tdl a");
        let pnumberElem_ = cartElem_.querySelector("td.cart_tdc input");
        if(pcodeElem_ != null && pnumberElem_ != null){
            let pcode = pcodeElem_.innerHTML;
            let pnumber = pnumberElem_.getAttribute("value");
            
            //--一応通販コードか確認
            if(/(M|K|P|B|R|S|I|C|T)\-\d\d\d\d\d/.test(pcodeElem_.innerHTML) == true){
                console.log(pcode + ":" + pnumber + "個");
                cartList += (pcode + " " + pnumber + "\r\n");
            }
        }
    });

    return cartList;
}