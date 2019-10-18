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
                if(vldCode && searchItem(response.code)){
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
                    window.close();
                }, false);
                break;

            default:
                console.log("process is undefined.");
                break;
        }
    });
});