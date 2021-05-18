/*
 * リスト管理js
*/

//--選択中のリストを削除する
function delList(){
    let target = document.querySelector("select#list");
    removeWishList(wishlist.wishlist[target.value].type, target.value);
    saveWishList();
}