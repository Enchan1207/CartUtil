/*
 * オプションjs
*/

window.onload = function(){
    //--リスト一覧を作る
    let target = document.querySelector("datalist#list");
    loadWishList();
    wishlist.wishlist.forEach(function(list, index){
        let cell = document.createElement("option");
        cell.value = index;
        cell.innerHTML = list.name;
        target.appendChild(cell);
    });

    //--共有、削除、検索ボタンにイベントリスナを当てる
    let sharebtn = document.querySelector("input#share");
    let deletebtn = document.querySelector("input#delete");
    let searchbtn = document.querySelector("input#search");

    sharebtn.addEventListener("click", shareList());
    deletebtn.addEventListener("click", delList());
    searchbtn.addEventListener("click", dlList());
}