// @ts-check
//
// DOM編集 - 秋月
//
import DOMModifier from "./DOMModifier.js";
import Message from "./Message.js";
import MessageSender from "./MessageSender.js";
import Product from "./Product.js";
import WishList from "./WishList.js";
import WishListItem from "./WishListItem.js";
import WishListManager from "./WishListManager.js";

export default class AkizukiDOMModifier extends DOMModifier {

    /**
     * @constructor
     * @param {Document} document 
     */
    constructor(document) {
        super();
        this.document = document;
    }

    /**
     * @module modify
     * @param {Product} product
     */
    modify(product) {
        this.injectAddButton();
        this.initWishListInDropDown(product);
        this.injectWishListViewButton();
    }

    /**
     * 「ほしい物リストに追加」ボタンを挿入
     * @module injectAddButton
     */
    injectAddButton() {
        // ボタンを生成

        /** @type {string} */
        const buttonhtml = `
            <div class="addbutton">ほしい物リストに追加する</div>
            <ul class="addlist">
            </ul>
        `;
        const buttonWrapperElement = this.document.createElement("div");
        buttonWrapperElement.id = "addwrapper";
        buttonWrapperElement.innerHTML = buttonhtml;

        // buttonにeventlistenerを設定して (ここクソ実装)
        const buttonElement = buttonWrapperElement.querySelector(".addbutton");
        buttonWrapperElement.setAttribute("data-state", "false");
        const switchState = (state = null) => {
            const currentState = state ?? buttonWrapperElement.getAttribute("data-state");
            buttonWrapperElement.setAttribute("data-state", currentState == "true" ? "false" : "true");
        };
        buttonElement.addEventListener('click', () => { switchState(); });

        // appendChild
        const buttonSelector = "#maincontents > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td";
        this.document.querySelector(buttonSelector).appendChild(buttonWrapperElement);

    }

    /**
     * 「ほしい物リストに追加」のドロップダウンを設定
     * @module initWishListInDropDown
     * @param {Product} product
     */
    async initWishListInDropDown(product) {
        // 取得して
        const wishListDropDownSelector = ".addlist";
        const wishListDropDownElement = this.document.querySelector(wishListDropDownSelector);

        // マネージャから持ってきて
        const manager = new WishListManager();
        await manager.restore();

        // 取得したリストからリスト要素を生成して
        const listElements = manager.getLists().map((list) => {
            const liElement = this.document.createElement("li");
            const liNameElement = this.document.createElement("span");
            const liCountElement = this.document.createElement("span");

            liElement.setAttribute("data-listid", list.id);
            liNameElement.textContent = list.name;
            liNameElement.className = "listname";
            liCountElement.textContent = `(${list.items.length})`;
            liCountElement.className = "listitemcount";
            liElement.appendChild(liNameElement);
            liElement.appendChild(liCountElement);

            return liElement;
        });

        // イベントリスナ設定して追加
        const addItemtoList = (product, count, wishlist) => {
            wishlist.addItem(new WishListItem(product, count));

            const buttonWrapperElement = this.document.getElementById("addwrapper");
            const currentState = buttonWrapperElement.getAttribute("data-state");
            buttonWrapperElement.setAttribute("data-state", currentState == "true" ? "false" : "true");

            manager.flush();
        }
        listElements.forEach((listElement) => {
            const id = listElement.getAttribute("data-listid");
            listElement.addEventListener('click', () => { addItemtoList(product, 1, manager.getListByID(id)); });
            wishListDropDownElement.appendChild(listElement);
        });
    }

    /**
     * 「ほしい物リストを確認」ボタンを追加
     * @module injectWishListViewButton
     */
    injectWishListViewButton() {
        // ページ上部のヘッダを取得し
        const headerSelector = "#header > table > tbody > tr:nth-child(2) > td > form";
        const headerElement = this.document.querySelector(headerSelector);

        // ヘッダのchildNodesからinputとそうでないものを抽出して
        const childNodes = Array.from(headerElement.childNodes);
        const inputElements = childNodes.filter((elem) => { return elem.nodeName == "INPUT" });
        const otherElements = childNodes.filter((elem) => { return elem.nodeName != "INPUT" });

        // otherElementsにいくつか追加して
        const viewListhtml = " | <a id=\"openoption\" href=\"javascript:void(0);\">ほしい物リスト</a>　";
        const dummyElement = this.document.createElement("span");
        dummyElement.innerHTML = viewListhtml;
        const viewListElements = dummyElement.childNodes;
        viewListElements.forEach((elem) => { otherElements.push(elem); });

        //戻す
        const children = otherElements.concat(inputElements);
        headerElement.innerHTML = "";
        children.forEach((elem) => { headerElement.appendChild(elem); });

        // イベント設定
        this.document.getElementById("openoption").addEventListener('click', () => {
            const sender = new MessageSender();
            const message = new Message("content", "openoption", [], null, null);
            sender.sendMessage(null, message, () => { });
        });

    }
}
