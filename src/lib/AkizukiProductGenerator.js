// @ts-check
//
// ProductGenerator - 秋月
//
import Product from "./Product.js";
import ProductGenerator from "./ProductGenerator.js";

export default class AkizukiProductGenerator extends ProductGenerator {

    /**
     * @module generateFrom
     * @param {Document} document 
     * @returns {Product|null}
     */
    generateFrom(document) {
        const element = document.body;
        try {
            /** @type {string} infoSelector - 商品名、通販コードを抽出するセレクタ */
            const infoSelector = "#maincontents > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td";
            const infoElement = element.querySelector(infoSelector);

            /** @type {string} priceSelector - 商品価格を抽出するセレクタ */
            const priceSelector = "#maincontents > div:nth-child(7) > table > tbody > tr > td:nth-child(1) > span:nth-child(2)";
            const priceElement = element.querySelector(priceSelector);

            // 商品名、通販コードを抽出
            const productName = infoElement.querySelector("h6").innerText;
            const productCode = /http.+([MKPBRSICT]-[0-9]+)/.exec(document.location.href)[1];

            // 価格を抽出
            const productPriceString = priceElement.textContent.replace(/(￥|,)/ig, "");
            const productPrice = Number(/([0-9]+)/.exec(productPriceString)[1]);

            // 生成
            return new Product(productCode, productName, productPrice);
        } catch (error) {
            console.log("Couldn't generate Product from document.");
            return null;
        }
    }
}
