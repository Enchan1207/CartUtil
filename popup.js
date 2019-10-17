/*
 * ポップアップ用js
*/

//--ページ情報を取得
chrome.tabs.query({active:true}, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {text:''}, function(response) {
        //--urlで処理分けますか
        let url = response.url;

        if(/akizukidenshi.com\/catalog\/g\/*/.test(url)){
            document.body.innerHTML = "商品ページです";
        }else if(/akizukidenshi.com\/catalog\/cart\/*/.test(url)){
            document.body.innerHTML = "カートの中身です";
        }else{
            document.body.innerHTML = "どちらでもないページです";
        }
    });
});