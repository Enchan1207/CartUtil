/*
 * ポップアップ用js
*/

/*
    ポップアップでは、
    ・初期読み込み時にページタイプを取得し
    ・ページタイプによって表示するhtmlを操作し
    ・uiの操作に応じてコンテンツスクリプトに情報を投げる
*/

//--追加ボタンを表示
function showAddButton(product) {
    let table = document.querySelector("#panel");
    let add_tr = document.createElement("tr");

    //--通販コード
    let info_td = document.createElement("td");
    info_td.id = "add_code";
    info_td.innerHTML = product.code;

    //--購入数量
    let count_td = document.createElement("td");
    count_td.id = "add_count";
    let count_input = document.createElement("input");
    if(getItemByCode(product.code) != undefined){
        count_input.value = getItemByCode(product.code).count;
    }else{
        count_input.value = product.count
    }
    count_input.id = "add_countinput";
    count_td.appendChild(count_input);

    //--追加/更新ボタン
    let submit_td = document.createElement("td");
    submit_td.id = "add_submit";
    let submit_input = document.createElement("input");
    submit_input.type = "button";
    submit_input.autofocus = true;
    if(searchItem(product.code) != 0){
        submit_input.value = "更新";
    }else{
        submit_input.value = "追加";
    }
    submit_td.appendChild(submit_input);

    //--
    add_tr.appendChild(info_td);
    add_tr.appendChild(count_td);
    add_tr.appendChild(submit_td);
    table.appendChild(add_tr);

    //--追加したボタンにイベントを当てる
    submit_input.addEventListener("click", function(){
        let count = document.querySelector("#add_countinput").value;
        addItem(product.code, product.desc, product.price, count);
        saveWishList();
        location.reload();
    });
}

//--エクスポートボタンを表示
function showExportButton(product){
    let table = document.querySelector("#panel");
    let add_tr = document.createElement("tr");

    //--カート内容をエクスポート
    let export_td = document.createElement("td");
    let export_btn = document.createElement("input");
    export_td.id = "exbutton";
    export_btn.type = "button";
    export_btn.value = "エクスポート";
    export_btn.addEventListener("click", function(){
        chrome.tabs.query({active:true}, function(tabs) {
            let command = {
                method: "export",
                items: convertList()
            };
            chrome.tabs.sendMessage(tabs[0].id, command, function(res) {
                console.log(res);
            });
        }); 
    });

    //--
    export_td.appendChild(export_btn);
    add_tr.appendChild(export_td);
    table.appendChild(add_tr);
}

//--カート一覧を展開
function showCartList(){
    //--リスト一覧を展開
    let cartList = document.querySelector("#list");
    let sumcount = 0;
    let sumprice = 0;
    wishlist.wishlist[wlindex].products.forEach(function(item, index) {
        let base1 = document.createElement("tr");
        let base2 = document.createElement("tr");

        //--商品画像
        let image = document.createElement("img");
        let img_td = document.createElement("td");
        img_td.rowSpan = 2;
        img_td.setAttribute("class", "icon");
        image.src = "http://akizukidenshi.com/img/goods/L/" + item.code + ".jpg";
        img_td.appendChild(image);
        base1.appendChild(img_td);

        //--商品コード＋商品名
        let link_a = document.createElement("a");
        link_a.href = "http://akizukidenshi.com/catalog/g/g" + item.code;
        //クリック時はhrefで飛ばずにmessage経由で
        link_a.addEventListener("click", function(){
            chrome.tabs.query({active:true}, function(tabs) {
                let command = {
                    method: "location",
                    href: "http://akizukidenshi.com/catalog/g/g" + item.code
                };
                chrome.tabs.sendMessage(tabs[0].id, command, function(res) {
                    console.log(res);
                    
                });
            });
        });
        let name_td = document.createElement("td");
        name_td.colSpan = 2
        name_td.setAttribute("class", "code");
        link_a.innerHTML = "[" + item.code + "] " + item.desc;
        name_td.appendChild(link_a);
        base1.appendChild(name_td);

        //--購入個数
        let count_td = document.createElement("td");
        count_td.setAttribute("class", "count");
        count_td.innerHTML = item.count + "個";
        base2.appendChild(count_td);

        //--価格
        let price_td = document.createElement("td");
        price_td.setAttribute("class", "price");
        price_td.innerHTML = (item.price * item.count) + "円";
        base2.appendChild(price_td);

        //--削除ボタン
        let del_td = document.createElement("td");
        let del_btn = document.createElement("input");
        del_btn.setAttribute("data-delcode", item.code);
        del_td.rowSpan = 2;
        del_td.setAttribute("class", "delete");
        del_btn.type = "button";
        del_btn.value = "削除";
        del_btn.addEventListener("click", function(){
            removeItemByCode(del_btn.getAttribute("data-delcode"));
            saveWishList();
            location.reload();
        });

        //--アイテムセパレータ
        let base3 = document.createElement("tr");
        let sep_td = document.createElement("td");
        sep_td.colSpan = 4;
        sep_td.setAttribute("class", "sepline");
        sep_td.appendChild(document.createElement("hr"));
        base3.appendChild(sep_td);

        del_td.appendChild(del_btn);
        base1.appendChild(del_td);
        
        cartList.appendChild(base1);
        cartList.appendChild(base2);
        cartList.appendChild(base3);

        sumprice += item.price * item.count;
        sumcount += item.count;
    });

    //--リストの最下端に合計金額バーを追加
    let base = document.createElement("tr");
    base.id = "sum_tr";
    let dummy_td = document.createElement("td");
    let count_td = document.createElement("td");
    let price_td = document.createElement("td");
    count_td.id = "sumcount";
    price_td.id = "sumprice";
    dummy_td.innerHTML = "合計";
    dummy_td.id = "sumlabel";
    count_td.innerHTML = sumcount + "個";
    price_td.innerHTML = sumprice + "円";
    base.appendChild(dummy_td);
    base.appendChild(count_td);
    base.appendChild(price_td);

    cartList.appendChild(base);
}

//--ウィッシュリスト一覧をdatalistに格納
function showWishLists() {
    //--datalistにリスト名をoptionsで投げる
    let dlist = document.querySelector("#labels");
    wishlist.wishlist.forEach(function(list){
        let label_opt = document.createElement("option");
        label_opt.value = list.name;
        dlist.appendChild(label_opt);
    });

    //--初期値を設定
    let listddl = document.querySelector("#labelinput");
    listddl.value = wishlist.wishlist[wlindex].name;

    //--イベントリスナを貼る
    listddl.addEventListener("change", function(){
        //--選択された名前のウィッシュリストを検索し、インデックスを返す
        let index = -1;
        wishlist.wishlist.filter(function(list,index_,array){
            if(list.name == listddl.value){
                index = index_;
                return true;
            }else{
                return false;
            }
        });
        if(index!=-1) {
            wlindex = index;
        }else{
            //--なければ入力した名前でウィッシュリストを作成
            createWishList(listddl.value);
            wlindex = wishlist.wishlist.length - 1;       
        }
        saveWishList(); 
        location.reload();
    });
    listddl.addEventListener("focus", function(){
        //--フォーカスされたら値を消す
        listddl.value = "";
    });
    listddl.addEventListener("blur", function(){
        //--フォーカスが外れたら値を戻す
        listddl.value = wishlist.wishlist[wlindex].name;
    });

    //--削除ボタンにイベントを当てる
    let rmbtn = document.querySelector("#listremove");
    rmbtn.addEventListener("click", function(){
        //--選択された名前のウィッシュリストを検索し、インデックスを返す
        let index = -1;
        wishlist.wishlist.filter(function(list,index_,array){
            if(list.name == listddl.value){
                index = index_;
                return true;
            }else{
                return false;
            }
        });
        if(index != -1 && confirm(wishlist.wishlist[index].name +"を削除しますか?")) {
            if(removeWishList(index) == 1){
                alert("削除できません");
            }
        }
        saveWishList(); 
        location.reload();
    });
}

chrome.tabs.query({active:true}, function(tabs) {
    loadWishList();

    //--ページタイプを取得
    Transaction(tabs[0], "pageType").then(function(response){
        let pageType = response.type;
        
        switch (pageType) {
            //--商品ページの場合 -> 追加ボタンを表示
            case "product":
                Transaction(tabs[0], "productInfo").then(function(response){
                    showAddButton(response);
                });
                break;

            //--カートの場合 -> エクスポートボタンを表示
            case "cart":
                showExportButton();
                break;
        
            default:
                console.log("processi undefined.");
                break;
        }

        //--どっちにせよカートの中身は表示
        showCartList();

        //--ウィッシュリスト一覧もね
        showWishLists();

    });    
});

//--コンテンツスクリプトに任意メッセージを送信し、コールバックからデータを受け取る
function Transaction(tab, message) {
    return new Promise(function(resolve, reject){
        chrome.tabs.sendMessage(tab.id, {method: message}, function(res) {
            resolve(res);
        });
    });
}