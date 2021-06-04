// @ts-check
//
// ページタイプ・サイトタイプ生成
//

import { PageType } from "../src/lib/PageType.js";
import { SiteType } from "../src/lib/SiteType.js";
import TestCase from "./TestCase.js";

export default class PageTypeTests extends TestCase {
    async test() {
        this.testPageType();
    }

    testPageType(){
        const pageType = PageType.Cart;
        const siteType = SiteType.AkizukiDenshi;

        console.log(`pageType: ${pageType}`);
        console.log(`siteType: ${siteType}`);

        if(pageType===undefined || siteType===undefined){
            throw new Error("\x1B[31mFAILED\x1B[0m pageType or siteType is undefined!");
        }
    }
}
