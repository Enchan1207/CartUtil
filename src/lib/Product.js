// @ts-check
//
// 商品基底クラス
//

export default class Product {

    /**
     * @constructor
     * @param {string} identifier 
     * @param {string} name 
     * @param {number} price 
     */
    constructor(identifier, name, price) {
        /** @type {string} `P-00000`とか`174 (SKU)`とか 商品の識別情報 */
        this.identifier = identifier;

        /** @type {string} */
        this.name = name;
        
        /** @type {number} */
        this.price = price;
    }
}