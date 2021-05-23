// @ts-check
//
// Unittest - Wishlist
//
import Product from "../src/lib/Product.js";
import WishList from "../src/lib/WishList.js";
import WishListItem from "../src/lib/WishListItem.js";

const main = async () => {
    // ウィッシュリストを生成
    const wishList = new WishList("new wishlist");
    console.log(`wishlist: ${wishList.id}`);

    // ダミーアイテム配列を生成
    /** @type {number} */
    const dummyCount = 100;

    /** @type {WishListItem[]} */
    const dummyItems = Array(dummyCount).fill(null).map(()=>{return new WishListItem(new Product("", "", Math.floor(Math.random() * 1000)), Math.floor(Math.random() * 10))});

    // ウィッシュリストに追加
    dummyItems.forEach((item) => { wishList.addItem(item); });

    // ランダムに一つ選択して削除し、存在しないことを確認
    const removeTarget = dummyItems[Math.floor(Math.random() * dummyCount)]
    console.log(`remove: ${JSON.stringify(removeTarget)}`);
    wishList.removeItem(removeTarget.id);
    if (wishList.getItems().filter((item) => { return item.id == removeTarget.id; }).length > 0) {
        throw new Error("\x1B[31mFAILED\x1B[0m couldn't remove item!");
    }
    
    // ランダムに一つ選択して更新し、反映されていることを確認
    const updateTarget = dummyItems[Math.floor(Math.random() * (dummyCount - 1))];
    const updateValue = Math.floor(Math.random() * 1000);
    console.log(`update: ${JSON.stringify(updateTarget)}`);
    updateTarget.count = updateValue;
    console.log(`updated: ${JSON.stringify(updateTarget)}`);
    wishList.updateItem(updateTarget);
    if (wishList.getItems().filter((item) => { return item.id == updateTarget.id; })[0].count != updateValue) {
        throw new Error("\x1B[31mFAILED\x1B[0m couldn't update item!");
    }

    // SUCCESS!
    console.log("\x1B[32mSUCCESS\x1B[0m");
}

main();

