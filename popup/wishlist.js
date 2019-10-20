/*
 * ウィッシュリスト管理
*/

//--グローバル変数
let wishlist;
let wlindex;

//--ウィッシュリスト読み書き
function loadWishList() {
    let tmplist = localStorage.getItem("wishlist");
    let tmpindex = localStorage.getItem("wlindex");

    //--正常なデータが格納されていればそのままlsのデータを適用
    let flag = false;
    if(tmplist != null){
        wishlist = JSON.parse(tmplist);
        flag = true;
    }
    if(tmpindex != null){
        wlindex = tmpindex;
        flag = true;
    }
    if(flag){
        console.log("localStorageにデータが保存されています。");
        return 0;
    } 

    //--正常なデータがなければ初期値を作ってlsに保存
    console.log("localStorageにデータがありません。");
    let initwlist = 
        {
            "wishlist" : [
                {
                    "name": "デフォルトウィッシュリスト",
                    "products" : [
                    ]
                }
            ]
        };
    let initwlindex = 0;

    wishlist = initwlist;
    wlindex = initwlindex;

    saveWishList();
}
function saveWishList() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wlindex", wlindex);
}

//--ウィッシュリストにアイテムを追加/指定インデックス/コードのアイテムを削除
function addItem(code, desc, price, count) {
    //--一応バリデーション
    let vldCode = /^[MKPBRSICT]\-\d*$/.test(code);
    count = Number(count.replace(/[^0-9]/ig, ""));
    let vldcount = isNaN(count);
    desc = desc.replace(/(\{|\}|\,|\:|\"|\')/, " ");
    price = Number(price.replace(/[^0-9]/ig, ""));
    let vldprice = isNaN(price);

    if(vldCode == false || vldcount == true || vldprice == true || count == 0 || price == 0) return 1;

    //--追加
    let newItem = {
        "code" : code,
        "desc" : desc,
        "price" : price,
        "count" : count
    };

    //--既に存在すれば更新、なければ追加
    let index = -1;
    wishlist.wishlist[wlindex].products.filter(function(product,index_,array){
        if(product.code == code){
            index = index_;
            return true;
        }else{
            return false;
        }
    });

    if(index != -1){
        wishlist.wishlist[wlindex].products[index] = newItem;
    }else{
        wishlist.wishlist[wlindex].products.push(newItem);
    }

    return 0;
}
function removeItem(index) {
    wishlist.wishlist[wlindex].products.splice(index, 1);
}
function removeItemByCode(code){
    wishlist.wishlist[wlindex].products = wishlist.wishlist[wlindex].products.filter(elem => elem.code != code);
}

//--アイテムを通販コードから検索
function searchItem(code_) {
    let fltList = wishlist.wishlist[wlindex].products.filter(product => product.code == code_);
    return fltList.length;
}
function getItemByCode(code_){
    let fltList = wishlist.wishlist[wlindex].products.filter(product => product.code == code_);
    return fltList[0];
}

//--ウィッシュリストを追加/削除(ただしウィッシュリストが一つの時は削除できない))
function createWishList(name) {
    let newList = {
        "name": name,
        "products" : []
    };
    wishlist.wishlist.push(newList);
}
function removeWishList(index) {
    if(wishlist.wishlist.length > 1){
        if(index == wlindex) wlindex--; //指定インデックスが参照中なら参照先を変える
        wishlist.wishlist.splice(index, 1);
        return 0;
    }else{
        return 1;
    }
}

//--参照するウィッシュリストを切り替え/現在参照しているウィッシュリスト番号を取得
function setListIndex(index) {
    wlindex = index;
}
function getListIndex() {
    return wlindex;
}

//--ウィッシュリストを「カートに追加」できる形に変換
function convertList() {
    let query = "";
    wishlist.wishlist[wlindex].products.forEach(product => {
        query += product.code + " " + product.count + "\r\n";
    });
    return query;
}
