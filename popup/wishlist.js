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

//--ウィッシュリストにアイテムを追加/指定インデックスのアイテムを削除
function addItem(code, desc, price, count) {
    let newItem = {
        "code" : code,
        "desc" : desc,
        "price" : price,
        "count" : count
    };
    wishlist.wishlist[wlindex].products.push(newItem);
}
function removeItem(index) {
    wishlist.wishlist[wlindex].products.splice(index, 1);
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
