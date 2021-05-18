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

    //--存在チェック
    let flag = false;
    if(tmplist != null){
        wishlist = JSON.parse(tmplist);
        flag = true;
    }
    if(tmpindex != null){
        wlindex = JSON.parse(tmpindex);
        flag = true;
    }
    if(tmpindex == null || tmplist == null){
        flag = false;
    }
    if(flag){
        console.log("localStorageにデータが保存されています。");
        return 0;
    }

    //--正常なデータがなければ初期値を作ってlsに保存
    console.log("localStorageにデータがありません。");
    let initwlist = {
        "wishlist" : [
            {
                "name": "Default - 秋月",
                "isDefault": true,
                "type": "aki",
                "products" : [
                ]
            },
            {
                "name": "Default - スイッチサイエンス",
                "isDefault": true,
                "type": "ssci",
                "products" : [
                ]
            }
        ]
    };
    let initwlindex = {
        "aki": 0,
        "ssci": 1
    };
    wishlist = initwlist;
    wlindex = initwlindex;

    saveWishList();
}
function saveWishList() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wlindex", JSON.stringify(wlindex));
}

//--ウィッシュリストにアイテムを追加/指定インデックス/コードのアイテムを削除
function addItem(site, icon, code, desc, price, count) {
    //--一応バリデーション
    let vldCode;
    switch (site) {
        case "aki":
            vldCode = /^[MKPBRSICT]\-\d*$/.test(code);
            break;
        
        case "ssci":
            vldCode = /^\d*$/.test(code);
            break;
    
        default:
            break;
    }
    count = Number(count.replace(/[^0-9]/ig, ""));
    let vldcount = isNaN(count);
    desc = desc.replace(/(\{|\}|\,|\:|\"|\')/, " ");
    price = Number(price.replace(/[^0-9]/ig, ""));
    let vldprice = isNaN(price);

    if(vldCode == false || vldcount == true || vldprice == true || count == 0 || price == 0) {
        console.error("次の理由により、このアイテムを追加できません:\r\nsite:" + site + "\r\ncode:" + code + "\r\ndesc:" + desc + "\r\nprice:" + price + "\r\ncount:" + count + "\r\n");
        return 1;
    }

    //--追加
    let newItem = {
        "code" : code,
        "desc" : desc,
        "price" : price,
        "count" : count,
        "icon": icon
    };

    //--既に存在すれば更新、なければ追加
    let index = -1;
    wishlist.wishlist[wlindex[site]].products.filter(function(product,index_,array){
        if(product.code == code){
            index = index_;
            return true;
        }else{
            return false;
        }
    });

    if(index != -1){
        wishlist.wishlist[wlindex[site]].products[index] = newItem;
    }else{
        wishlist.wishlist[wlindex[site]].products.push(newItem);
    }

    return 0;
}
function removeItemByCode(site, code){
    wishlist.wishlist[wlindex[site]].products = wishlist.wishlist[wlindex[site]].products.filter(elem => elem.code != code);
}

//--アイテムを通販コードから検索
function searchItem(site, code_) {
    let fltList = wishlist.wishlist[wlindex[site]].products.filter(product => product.code == code_);
    return fltList.length;
}
function getItemByCode(site, code_){
    let fltList = wishlist.wishlist[wlindex[site]].products.filter(product => product.code == code_);
    return fltList[0];
}

//--ウィッシュリストを追加/削除(ただしウィッシュリストが一つの時は削除できない))
function createWishList(name, type) {
    let newList = {
        "name": name,
        "type": type,
        "isDefault": false, 
        "products" : []
    };
    wishlist.wishlist.push(newList);
}
function removeWishList(site, index) {
    if(wishlist.wishlist.length > 1 && wishlist.wishlist[wlindex[site]].isDefault == false){
        //--参照先を変更
        if(index == wlindex[site]) {
            wlindex[site] = getDefaultListIndex(site);
        }
        if(wlindex[site] < 0) wlindex[site] = 0; //インデックスアンダーフロー対策
        wishlist.wishlist.splice(index, 1);
        return 0;
    }else{
        return 1;
    }
}

//--各サイトのデフォルトリストインデックスを取得
function getDefaultListIndex(site) {
    let index = 0;
    let wl = wishlist.wishlist.filter(function(list, index_){
        if(list.type == site && list.isDefault == true){
            index = index_;
            return true;
        }
        return false;
    });
    return index;
}

//--ウィッシュリストを「カートに追加」できる形に変換
function convertList(type) {
    let query = "";
    wishlist.wishlist[wlindex[type]].products.forEach(product => {
        switch (type) {
            case "aki":
                    query += product.code + " " + product.count + "\r\n";                
                break;
            
            case "ssci":
                    query += product.code + "," + product.count + "\r\n";
                break;
        
            default:
                break;
        }
    });
    return query;
}
