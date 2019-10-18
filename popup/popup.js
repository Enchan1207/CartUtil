/*
 * ポップアップ用js
*/

//--ページ情報を取得
chrome.tabs.query({active:true}, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {text:''}, function(response) {
        loadWishList();

        //--タイプ別処理
        switch (response.type) {
            case "product":
                //--既に現在選択中のリストに登録されているか検索
                let vldCode = /^[MKPBRSICT]\-\d*$/.test(response.code);
                if(vldCode && (searchItem(response.code) != 0)){
                    let target = document.querySelector("#info");
                    target.innerHTML = "登録済みアイテムです。";
                    target = document.querySelector("input[type=submit]");
                    target.value = "更新";
                }

                //--フォーム更新
                let target = document.forms[0];
                target.querySelector("input[name=code]").value = response.code;
                target.querySelector("input[name=desc]").value = response.desc;
                target.querySelector("input[name=price]").value = response.price;
                target.querySelector("input[name=count]").value = response.count;
                target.addEventListener('submit', function(){
                    addItem(
                        target.querySelector("input[name=code]").value,
                        target.querySelector("input[name=desc]").value,
                        target.querySelector("input[name=price]").value,
                        target.querySelector("input[name=count]").value
                    );
                    saveWishList();
                }, false);

                //--リスト名を表示
                let listLabel = document.querySelector("div#listLabel select");
                let lists = wishlist.wishlist;
                lists.forEach(function(list, index){
                    let optelem = document.createElement("option");
                    if(wlindex == index) optelem.setAttribute("selected", "");
                    optelem.value = list.name;
                    optelem.innerHTML = list.name;
                    listLabel.appendChild(optelem);
                });

                //--リスト一覧を展開
                let cartList = document.querySelector("div#cart table");
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
                    let name_td = document.createElement("td");
                    name_td.colSpan = 2
                    name_td.setAttribute("class", "code");
                    link_a.innerHTML = "[" + item.code + "] " + item.desc;
                    name_td.appendChild(link_a);
                    base1.appendChild(name_td);

                    //--価格
                    let price_td = document.createElement("td");
                    price_td.setAttribute("class", "price");
                    price_td.innerHTML = item.price + "円";
                    base2.appendChild(price_td);

                    //--購入個数
                    let count_td = document.createElement("td");
                    count_td.setAttribute("class", "count");
                    count_td.innerHTML = item.count + "個";
                    base2.appendChild(count_td);

                    cartList.appendChild(base1);
                    cartList.appendChild(base2);

                    sumprice += item.price * item.count;
                    sumcount += item.count;
                });

                //--リストの最下端に合計金額バーを追加
                let base = document.createElement("tr");
                let dummy_td = document.createElement("td");
                let count_td = document.createElement("td");
                let price_td = document.createElement("td");
                count_td.setAttribute("id", "sumcount");
                price_td.setAttribute("id", "sumprice");
                dummy_td.innerHTML = "合計";
                count_td.innerHTML = sumcount + "個";
                price_td.innerHTML = sumprice + "円";
                base.appendChild(dummy_td);
                base.appendChild(count_td);
                base.appendChild(price_td);

                cartList.appendChild(base);
                break;

            default:
                console.log("process is undefined.");
                break;
        }
    });
});