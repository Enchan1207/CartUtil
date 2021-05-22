//
// 商品基底クラス
//

class Product {

    /**
     * @constructor
     * @param {string} identifier 
     * @param {string} name 
     * @param {number} price 
     */
    constructor(identifier, name, price) {
        // idはインスタンスの識別情報
        // identifierは`P-00000`とか`174 (SKU)`とか 商品の識別情報
        // this.id = NSUUID()
        this.identifier = identifier;
        this.name = name;
        this.price = price;
    }
}