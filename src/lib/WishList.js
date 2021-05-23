// @ts-check
//
// ウィッシュリスト
//
import WishListItem from "./WishListItem.js";

export default class WishList {

    /**
     * @constructor
     * @param {string} id - ウィッシュリストの識別子
     * @param {string} name - 名前
     * @param {WishListItem[]} items - ウィッシュリストの項目
     */
    constructor(id, name, items = []) {
        /** @type {string} id */
        this.id = id;

        /** @type {string} name */
        this.name = name;

        /** @type {WishListItem[]} items */
        this.items = items;
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


