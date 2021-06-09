// @ts-check
//
// ほしい物リスト管理
//

import WishList from "./WishList.js";

export default class WishListManager {

    /**
     * @constructor
     * @param {WishList[]} wishlists
     */
    constructor(wishlists = []) {
        this.wishlists = wishlists;
    }

    /**
     * get all wishlists.
     * @module getLists
     * @returns {WishList[]}
     */
    getLists() {
        return this.wishlists;
    }

    /**
     * add new list.
     * @module addList
     * @param {WishList} list
     */
    addList(list) {
        if(list instanceof WishList){
            this.wishlists.push(list);
        }else{
            console.warn("passed object is not instance of WishList.");
        }
    }

    /**
     * remove list specified by id.
     * @module removeList
     * @param {string} id
     */
    removeList(id) {
        this.wishlists = this.wishlists.filter((list) => { return list.id != id; });
    }

    /**
     * update existing list.
     * @module updateList 
     * @param {WishList} newList 
     */
    updateList(newList) {
        this.wishlists = this.wishlists.map((list) => { return (list.id != newList.id) ? list : newList; });
    }

    /**
     * get existing list specified by id.
     * @module getListByID
     * @param {string} id
     * @returns {WishList|null}
     */
    getListByID(id) {
        const candidates = this.wishlists.filter((wishlist) => { return wishlist.id == id; });
        if (candidates.length == 0) {
            return null;
        }
        return candidates[0];
    }

    /**
     * get stored wishlists.
     * @module restore
     * @returns Promise
     */
    async restore() {
        // こんなアコーディオンみたいになることある?
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (typeof chrome === "undefined") {
                reject("you can't restore list at current environment.");
            }
            // @ts-ignore
            chrome.storage.local.get("wishlists", (listObject) => {
                // @ts-ignore
                if (chrome.runtime.error) {
                    // @ts-ignore
                    console.error(chrome.runtime.error);
                    // @ts-ignore
                    reject(chrome.runtime.error);
                    return;
                }
                this.wishlists = listObject.wishlists.map((wishlist) => {return new WishList(wishlist.name, wishlist.id, wishlist.items, wishlist.siteType ?? null);});
                resolve(listObject.wishlists);
            });
        });
    }

    /**
     * flush current wishlists.
     * @module flush
     * @returns Promise
     */
    async flush() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (typeof chrome === "undefined") {
                reject("you can't flush list at current environment.");
            }
            // @ts-ignore
            chrome.storage.local.set({ "wishlists": this.wishlists }, () => {
                // @ts-ignore
                if (chrome.runtime.error) {
                    // @ts-ignore
                    console.error(chrome.runtime.error);
                    // @ts-ignore
                    reject(chrome.runtime.error);
                    return;
                }
                resolve();
            });
        });
    }

}
