// @ts-check
//
// ページタイプ・サイトタイプ生成
//

import { PageType } from "../src/lib/PageType.js";
import { SiteType } from "../src/lib/SiteType.js";
import TabTypeDistinctor from "../src/lib/TabTypeDistinctor.js";
import TestCase from "./TestCase.js";

export default class TabTypeDistinctionTests extends TestCase {
    async test() {
        this.testDistinctionPageURLs();
    }

    testDistinctionPageURLs() {
        const targets = [
            "https://akizukidenshi.com/catalog/top.aspx",
            "https://akizukidenshi.com/catalog/g/gI-16503/",
            "https://akizukidenshi.com/catalog/cart/cart.aspx",
            "https://akizukidenshi.com/catalog/quickorder/quickorder.aspx",
            "https://akizukidenshi.com/catalog/customer/menu.aspx",
            "https://akizukidenshi.com/catalog/goods/search.aspx?search=x&keyword=AVR",
            "https://www.switch-science.com/",
            "https://www.switch-science.com/catalog/list/?keyword=Raspberry%20Pi",
            "https://www.switch-science.com/catalog/5681/",
            "https://www.switch-science.com/cart/",
            "https://www.switch-science.com/info/how/"
        ].map((urlString) => { return new URL(urlString); });

        targets.forEach((target) => {
            const distinctor = new TabTypeDistinctor(target);
            const siteType = distinctor.getSiteType();
            const pageType = distinctor.getPageType();
            console.log(`Target: ${target} Site: ${siteType} Page: ${pageType}`)
        });
    }
}
