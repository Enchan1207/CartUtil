// @ts-check
//
// ほしい物リスト
//
import UniqueIDGenerator from "./UniqueIDGenerator.js";
import WishListItem from "./WishListItem.js";
import { SiteType } from "./SiteType.js"; 

export default class WishList {

    /**
     * @constructor
     * @param {string} name - 名前
     * @param {string|null} id - ほしい物リストの識別子
     * @param {WishListItem[]} items - ほしい物リストの項目
     * @param {string|null} siteType - ほしい物リストが管理するサイトのSiteType
     */
    constructor(name, id = null, items = [], siteType = null) {
        /** @type {string} */
        this.id = id ?? UniqueIDGenerator.getUniqueID();

        /** @type {string} name */
        this.name = name;

        /** @type {WishListItem[]} items */
        this.items = items;

        /** @type {string} siteType */
        this.siteType = siteType ?? SiteType.Other;
    }

    /**
     * get all items in wishlist.
     * @module getItems
     * @returns {WishListItem[]}
     */
    getItems() {
        return this.items;
    }

    /**
     * add new item to wishlist.
     * @module addItem
     * @param {WishListItem} item
     */
    addItem(item) {
        this.items.push(item);
    }

    /**
     * remove item specified by id.
     * @module removeItem
     * @param {string} id
     */
    removeItem(id) {
        this.items = this.items.filter((item) => { return item.id != id; });
    }

    /**
     * update existing item.
     * @module updateItem 
     * @param {WishListItem} newItem 
     */
    updateItem(newItem) {
        this.items = this.items.map((item) => { return (item.id != newItem.id) ? item : newItem; });
    }
}


