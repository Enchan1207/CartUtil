//
// content script
//

import AkizukiDOMModifier from "../lib/AkizukiDOMModifier.js";
import AkizukiProductGenerator from "../lib/AkizukiProductGenerator.js";
import SSciDOMModifier from "../lib/SSciDOMModifier.js";
import SSciProuctGenerator from "../lib/SSciProuctGenerator.js";

export function main() {
    // 商品ページか判定
    const href = new URL(location.href);
    const isProductPage = ((href) => {
        switch (href.host) {
            case "akizukidenshi.com":
                return /([MKPBRSICT]-[0-9]+)\/$/.test(href.pathname);

            case "www.switch-science.com":
                return /\/catalog\/([0-9]+)\//.test(href.pathname);
            default:
                return false;
        }
    })(href);

    // 商品ページならProductGeneratorとDOMModifierを持ってきて
    if(isProductPage){
        const productGenerator = ((host) => {
            switch (host) {
                case "akizukidenshi.com":
                    return new AkizukiProductGenerator();
                case "www.switch-science.com":
                    return new SSciProuctGenerator();
                default:
                    return null;
            }
        })(href.host);
        const DOMModifier = ((host)=>{
            switch (host) {
                case "akizukidenshi.com":
                    return new AkizukiDOMModifier(document);
                case "www.switch-science.com":
                    return new SSciDOMModifier(document);
                default:
                    return null;
            }
        })(href.host);

        if(productGenerator === null || DOMModifier === null){
            return;
        }
        
        // modify!
        const product = productGenerator.generateFrom(document);
        DOMModifier.modify(product);
    }
}
