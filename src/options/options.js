//
// options script - ほしい物リスト一覧
//

import WishListManager from "../lib/WishListManager.js";

document.addEventListener('DOMContentLoaded', async () => {
    const manager = new WishListManager();
    await manager.restore();

    const cellElements = manager.getLists().map((list) => {
        const listtype = list.siteType;

        const baseListElement = document.createElement("li");
        baseListElement.setAttribute("data-listid", list.id);
        baseListElement.setAttribute("data-listname", list.name);

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

        // TODO: ここspanボタン生成関数でも作って汎化したほうがいいんじゃないか
        // コールバックとclassName渡して

        const deleteButtonElement = document.createElement("span");
        deleteButtonElement.className = "listhoverbutton delete";
        deleteButtonElement.addEventListener('click', (event) => {
            const listID = baseListElement.getAttribute("data-listid");
            const listName = baseListElement.getAttribute("data-listname");
            event.preventDefault();
            event.stopPropagation();

            if (confirm(`「${listName}」 を削除しますか?`)) {
                console.log(`eliminate: ${listName}`);
                manager.removeList(listID);
                manager.flush().then(() => {
                    location.reload();
                });
            }
        });

        const deleteButtonIconElement = document.createElement("img");
        deleteButtonIconElement.src = "/assets/trash.svg";
        deleteButtonElement.appendChild(deleteButtonIconElement);

        const renameButtonElement = document.createElement("span");
        renameButtonElement.className = "listhoverbutton rename";
        renameButtonElement.addEventListener('click', (event) => {
            const listID = baseListElement.getAttribute("data-listid");
            console.log(`rename: ${listID}`);
            event.preventDefault();
            event.stopPropagation();
        });

        const renameButtonIconElement = document.createElement("img");
        renameButtonIconElement.src = "/assets/pencil.svg";
        renameButtonElement.appendChild(renameButtonIconElement);

        infoElement.appendChild(nameElement);
        infoElement.appendChild(countElement);
        thumbnailElement.appendChild(iconElement);
        anchorElement.appendChild(thumbnailElement);
        anchorElement.appendChild(infoElement);
        anchorElement.appendChild(renameButtonElement);
        anchorElement.appendChild(deleteButtonElement);

        baseListElement.appendChild(anchorElement);

        return baseListElement;
    });

    const wishlistElement = document.getElementById("lists");
    cellElements.forEach((element) => {
        wishlistElement.appendChild(element);
    });
});
