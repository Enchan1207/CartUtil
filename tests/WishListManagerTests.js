// @ts-check
//
// Unittest - WishlistManager
//

import WishList from "../src/lib/WishList.js";
import WishListManager from "../src/lib/WishListManager.js";

const main = async () => {
    const manager = new WishListManager();

    // unittestでは失敗して欲しい
    try {
        await manager.restore();
    } catch (error) {
        console.log(error);
    }

    // ダミーリスト配列を生成
    /** @type {number} */
    const dummyCount = 100;

    /** @type {WishList[]} */
    const dummyItems = Array(dummyCount).fill(null).map(()=>{return new WishList("new WishList");});

    // ウィッシュリストに追加
    dummyItems.forEach((item) => { manager.addList(item); });

    // ランダムに一つ選択して削除し、存在しないことを確認
    const removeTarget = dummyItems[Math.floor(Math.random() * dummyCount)]
    console.log(`remove: ${JSON.stringify(removeTarget)}`);
    manager.removeList(removeTarget.id);
    if (manager.getLists().filter((item) => { return item.id == removeTarget.id; }).length > 0) {
        throw new Error("\x1B[31mFAILED\x1B[0m couldn't remove item!");
    }
    
    // ランダムに一つ選択して更新し、反映されていることを確認
    const updateTarget = dummyItems[Math.floor(Math.random() * (dummyCount - 1))];
    const updateValue = "Wooooooooo";
    console.log(`update: ${JSON.stringify(updateTarget)}`);
    updateTarget.name = updateValue;
    console.log(`updated: ${JSON.stringify(updateTarget)}`);
    manager.updateList(updateTarget);
    if (manager.getLists().filter((item) => { return item.id == updateTarget.id; })[0].name != updateValue) {
        throw new Error("\x1B[31mFAILED\x1B[0m couldn't update item!");
    }

    // SUCCESS!
    console.log("\x1B[32mSUCCESS\x1B[0m");

};
main();
