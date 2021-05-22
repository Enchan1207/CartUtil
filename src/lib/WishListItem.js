//
// ウィッシュリスト項目
//

class WishListItem {

    /**
     * 
     * @param {Product|null} product 
     * @param {number} count 
     */
    constructor(product = null, count = 0){
        this.product = product;
        this.count = count;
    }
}
