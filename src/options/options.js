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
        const anchorElement = document.createElement("a");
        anchorElement.href = `details.html?id=${list.id}`;
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

        const contextMenuElement = document.createElement("span");
        contextMenuElement.className = "contextmenu";
        contextMenuElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#666" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>`;

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
