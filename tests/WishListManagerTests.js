// @ts-check
//
// Unittest - WishlistManager
//

import WishList from "../src/lib/WishList.js";
import WishListManager from "../src/lib/WishListManager.js";
import TestCase from "./TestCase.js";

export default class WishlistManagerTests extends TestCase {
    constructor() {
        super();

        this.manager = new WishListManager();

        // ダミーリスト配列を生成

        /** @type {number} */
        this.dummyCount = 100;

        /** @type {WishList[]} */
        this.dummyItems = Array(this.dummyCount).fill(null).map(() => { return new WishList("new WishList"); });

        // ウィッシュリストマネージャに追加
        this.dummyItems.forEach((item) => { this.manager.addList(item); });

    }

    async test() {
        this.testRemove();
        this.testUpdate();
    }

    // 削除テスト
    testRemove() {
        // ランダムに一つ選択して削除し、存在しないことを確認
        const removeTarget = this.dummyItems[Math.floor(Math.random() * this.dummyCount)]
        this.manager.removeList(removeTarget.id);
        if (this.manager.getLists().filter((item) => { return item.id == removeTarget.id; }).length > 0) {
            throw new Error("couldn't remove item");
        }
    }

    // 更新テスト
    testUpdate() {
        // ランダムに一つ選択して更新し、反映されていることを確認
        const updateTarget = this.dummyItems[Math.floor(Math.random() * (this.dummyCount - 1))];
        const updateValue = "Wooooooooo";
        console.log(`update: ${JSON.stringify(updateTarget)}`);
        updateTarget.name = updateValue;
        console.log(`updated: ${JSON.stringify(updateTarget)}`);
        this.manager.updateList(updateTarget);
        if (this.manager.getLists().filter((item) => { return item.id == updateTarget.id; })[0].name != updateValue) {
            throw new Error("couldn't update item");
        }
    }

}
