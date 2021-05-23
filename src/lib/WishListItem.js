// @ts-check
//
// ウィッシュリスト項目
//
import Product from "./Product.js";

export default class WishListItem {

    /**
     * @constructor
     * @param {string} id
     * @param {Product} product 
     * @param {number} count 
     */
    constructor(id, product, count = 0){
        /** @type {string} */
        this.id = id;

        /** @type {Product} */
        this.product = product;

        /** @type {number} */
        this.count = count;
    }
}
