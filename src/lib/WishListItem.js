// @ts-check
//
// ウィッシュリスト項目
//
import Product from "./Product.js";
import UniqueIDGenerator from "./UniqueIDGenerator.js";
export default class WishListItem {

    /**
     * @constructor
     * @param {Product} product 
     * @param {number} count 
     * @param {string|null} id
     */
    constructor(product, count = 0, id = null){
        /** @type {string} */
        this.id = id ?? UniqueIDGenerator.getUniqueID();

        /** @type {Product} */
        this.product = product;

        /** @type {number} */
        this.count = count;
    }
}
