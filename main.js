window.onload = function () {
    //--カート画面では自動エクスポートし、必要に応じて出力
    if(this.location.href = "http://akizukidenshi.com/catalog/cart/cart.aspx"){
        let cart = cartExport();

    }
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