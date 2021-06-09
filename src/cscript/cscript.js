//
// content script
//

import AkizukiDOMModifier from "../lib/AkizukiDOMModifier.js";
import AkizukiProductGenerator from "../lib/AkizukiProductGenerator.js";
import DOMModifier from "../lib/DOMModifier.js";
import { PageType } from "../lib/PageType.js";
import ProductGenerator from "../lib/ProductGenerator.js";
import { SiteType } from "../lib/SiteType.js";
import SSciDOMModifier from "../lib/SSciDOMModifier.js";
import SSciProuctGenerator from "../lib/SSciProuctGenerator.js";
import TabTypeDistinctor from "../lib/TabTypeDistinctor.js";

export function main() {
    // Distinctorに通す
    const distinctor = new TabTypeDistinctor(new URL(location.href));
    const siteType = distinctor.getSiteType();
    const pageType = distinctor.getPageType();
    console.log(`site: ${siteType} page: ${pageType}`);

    // manifestと言ってることちげーぞ!
    if (siteType == SiteType.Other) {
        console.error("manifest.jsonとSiteTypeが一致しません。src/lib/SiteType, src/lib/TabTypeDistinctor.jsを確認してください。");
        return;
    }

    // Productインスタンスを生成
    const product = ((pagetype, sitetype) => {
        if (pagetype == PageType.Product) {
            const productGenerator = getProductGenerator(sitetype);
            return productGenerator.generateFrom(document);
        }
        return null;
    })(pageType, siteType);
    console.log(product);

    // Modifierに通す(Productが生成できなくてもModifyできる場合はあるので、Modifierを軽量化すべき)
    if(product !== null){
        const modifier = getDOMModifier(siteType);
        modifier.modify(product);
    }
}

/**
 * @module getProductGenerator
 * @param {SiteType} siteType 
 * @returns {ProductGenerator|null}
 */
function getProductGenerator(siteType) {
    switch (siteType) {
        case SiteType.AkizukiDenshi:
            return new AkizukiProductGenerator();
        case SiteType.SwitchScience:
            return new SSciProuctGenerator();
        default:
            return null;
    }
}

/**
 * @module getDOMModifier
 * @param {SiteType} siteType 
 * @param {HTMLDocument|null} doc 
 * @returns {DOMModifier|null}
 */
function getDOMModifier(siteType, doc = document){
    switch (siteType) {
        case SiteType.AkizukiDenshi:
            return new AkizukiDOMModifier(doc);
        case SiteType.SwitchScience:
            return new SSciDOMModifier(doc);
        default:
            return null;
    }
}
