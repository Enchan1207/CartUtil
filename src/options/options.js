//
// options script - ほしい物リスト一覧
//

import WishListManager from "../lib/WishListManager.js";

document.addEventListener('DOMContentLoaded', async () => {
    const manager = new WishListManager();
    await manager.restore();

    const cellElements = manager.getLists().map((list) => {
        const listtype = "aki"; // TODO: WishListクラスにサイトタイプを示すプロパティを埋め込む

        const baseListElement = document.createElement("li");
        baseListElement.setAttribute("data-listid", list.id);

        const anchorElement = document.createElement("a");
        anchorElement.href = `details.html?id=${list.id}`;
        anchorElement.className = `list ${listtype}`;
        const thumbnailElement = document.createElement("span");
        thumbnailElement.className = "thumb";
        const iconElement = document.createElement("img");
        // TODO: こんな感じのを実装 またはThumbnailURLMakerを作成
        // list.items[0].product.getThumbnailURL()
        // いっけねスイッチサイエンスの画像UUID含んでるやん Productから逆算できない

        // うーーーーんこれはもうProductにthumbnailsを追加するしかないかも
        iconElement.src = "/assets/icons/icon.svg";

        const infoElement = document.createElement("span");
        infoElement.className = "info";

        const nameElement = document.createElement("h2");
        nameElement.textContent = list.name;

        const countElement = document.createElement("span");
        countElement.className = "count";
        countElement.textContent = `${list.items.length}個のアイテム`;

        const contextMenuElement = document.createElement("span");
        contextMenuElement.className = "contextmenu";
        contextMenuElement.addEventListener('click', (event) => {
            console.log(baseListElement.getAttribute("data-listid"));
            event.preventDefault();
            event.stopPropagation();
        });

        const contextMenuIconElement = document.createElement("img");
        contextMenuIconElement.src = "/assets/threedots.svg";
        contextMenuElement.appendChild(contextMenuIconElement);

        infoElement.appendChild(nameElement);
        infoElement.appendChild(countElement);
        thumbnailElement.appendChild(iconElement);
        anchorElement.appendChild(thumbnailElement);
        anchorElement.appendChild(infoElement);
        anchorElement.appendChild(contextMenuElement);

        baseListElement.appendChild(anchorElement);

        return baseListElement;
    });

    const wishlistElement = document.getElementById("lists");
    cellElements.forEach((element) => {
        wishlistElement.appendChild(element);
    });
});
