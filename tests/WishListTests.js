// @ts-check
//
// Unittest - Wishlist
//
import Product from "../src/lib/Product.js";
import WishList from "../src/lib/WishList.js";
import WishListItem from "../src/lib/WishListItem.js";
import TestCase from "./TestCase.js";

export default class WishlistTests extends TestCase {

    constructor() {
        super();

        // ウィッシュリストを生成
        this.wishList = new WishList("new wishlist");
        console.log(`wishlist: ${this.wishList.id}`);

        // ダミーアイテム配列を生成
        /** @type {number} */
        this.dummyCount = 100;

        /** @type {WishListItem[]} */
        this.dummyItems = Array(this.dummyCount).fill(null).map(() => { return new WishListItem(new Product("", "", Math.floor(Math.random() * 1000)), Math.floor(Math.random() * 10)) });

        // ウィッシュリストに追加
        this.dummyItems.forEach((item) => { this.wishList.addItem(item); });
    }

    async test() {
        this.testRemove();
        this.testUpdate();
    }

    // 削除テスト
    testRemove() {
        // ランダムに一つ選択して削除し、存在しないことを確認
        const removeTarget = this.dummyItems[Math.floor(Math.random() * this.dummyCount)]
        console.log(`remove: ${JSON.stringify(removeTarget)}`);
        this.wishList.removeItem(removeTarget.id);
        if (this.wishList.getItems().filter((item) => { return item.id == removeTarget.id; }).length > 0) {
            throw new Error("couldn't remove item");
        }
    }

    // 更新テスト
    testUpdate() {
        // ランダムに一つ選択して更新し、反映されていることを確認
        const updateTarget = this.dummyItems[Math.floor(Math.random() * (this.dummyCount - 1))];
        const updateValue = Math.floor(Math.random() * 1000);
        console.log(`update: ${JSON.stringify(updateTarget)}`);
        updateTarget.count = updateValue;
        console.log(`updated: ${JSON.stringify(updateTarget)}`);
        this.wishList.updateItem(updateTarget);
        if (this.wishList.getItems().filter((item) => { return item.id == updateTarget.id; })[0].count != updateValue) {
            throw new Error("couldn't update item");
        }
    }
}
