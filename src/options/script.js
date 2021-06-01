//
// options script
//

import WishListManager from "../lib/WishListManager.js";

document.addEventListener('DOMContentLoaded', async () => {
    const manager = new WishListManager();
    await manager.restore();

    const cellElements = manager.getLists().map((list) => {
        const listtype = "aki"; // TODO: WishListクラスにサイトタイプを示すプロパティを埋め込む
        const baseListElement = document.createElement("li");
        const anchorElement = document.createElement("a");
        anchorElement.href = "#";
        anchorElement.className = `list ${listtype}`;
        const thumbnailElement = document.createElement("span");
        thumbnailElement.className = "thumb";
        const iconElement = document.createElement("img");
        // TODO: こんな感じのを実装 またはThumbnailURLMakerを作成
        // list.items[0].product.getThumbnailURL()
        iconElement.src = "/assets/icons/icon.svg";

        const infoElement = document.createElement("span");
        infoElement.className = "info";

        const nameElement = document.createElement("h2");
        nameElement.textContent = list.name;

        const countElement = document.createElement("span");
        countElement.className = "count";
        countElement.textContent = `${list.items.length}個のアイテム`;

        infoElement.appendChild(nameElement);
        infoElement.appendChild(countElement);
        thumbnailElement.appendChild(iconElement);
        anchorElement.appendChild(thumbnailElement);
        anchorElement.appendChild(infoElement);

        baseListElement.appendChild(anchorElement);

        return baseListElement;
    });

    cellElements.forEach((element) => {
        const wishlistElement = document.getElementById("lists");
        wishlistElement.appendChild(element);
    });
});
