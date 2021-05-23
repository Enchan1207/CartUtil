// @ts-check
//
// Unit-test: Product
//
import Product from "../src/lib/Product.js";
import TestCase from "./TestCase.js";

export default class ProductTests extends TestCase {
    async test() {
        this.testGenerateProduct();
    }

    testGenerateProduct() {
        // 普通に生成
        const product = new Product("", "", 1000);
        console.log(product);

    }
}
