// @ts-check
//
// SSciProuctGenerator - スイッチサイエンス
//
import Product from "./Product.js";
import ProductGenerator from "./ProductGenerator.js";

export default class SSciProuctGenerator extends ProductGenerator {

    /**
     * @module generateFrom
     * @param {Document} document 
     * @returns {Product|null}
     */
    generateFrom(document){
        const element = document.body;
        try {
            /** @type {string} nameSelector - 商品名、通販コードを抽出するセレクタ */
            const nameSelector = "#product > div.data > table > tbody > tr:nth-child(2) > td";
            
            /** @type {string} skuSelector - 商品名、通販コードを抽出するセレクタ */
            const skuSelector = "#product > div.data > table > tbody > tr:nth-child(4) > td";

            /** @type {string} priceSelector - 商品価格を抽出するセレクタ */
            const priceSelector = "#product > div.data > table > tbody > tr:nth-child(6) > td > span.price";

            // 商品名、通販コード、SKU を抽出
            const productName = document.querySelector(nameSelector).textContent;
            const productCode = document.querySelector(skuSelector).textContent;
            const productPrice = Number(document.querySelector(priceSelector).textContent.replace(",", ""));

            // 生成
            return new Product(productCode, productName, productPrice);
        } catch (error) {
            console.log("Couldn't generate Product from document.");
            return null;
        }

    }
}
