//
// options script - ほしい物リスト詳細
//

import WishListManager from "../lib/WishListManager.js";

document.addEventListener('DOMContentLoaded', async () => {
    const manager = new WishListManager();
    await manager.restore();
    const searchParams = new URL(location.href).searchParams;
    const specifiedID = searchParams.get('id');

    if (specifiedID === null) {
        location.href = chrome.runtime.getURL("src/options/options.html");
        return;
    }

    const targetList = manager.getListByID(specifiedID);
    console.log(targetList);

});
