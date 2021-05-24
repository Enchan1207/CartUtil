//
// content script
//

import AkizukiDOMModifier from "../lib/AkizukiDOMModifier.js";
import AkizukiProductGenerator from "../lib/AkizukiProductGenerator.js";
import SSciProuctGenerator from "../lib/SSciProuctGenerator.js";

export function main() {
    // ホスト分岐
    const href = new URL(location.href);
    switch (href.host) {
        case "akizukidenshi.com":
            if (/([MKPBRSICT]-[0-9]+)\/$/.test(href.pathname)) {
                const generator = new AkizukiProductGenerator();
                const product = generator.generateFrom(document);
                console.log(product);

                const modifier = new AkizukiDOMModifier(document);
                modifier.modify(product);
            }
            break;

        case "www.switch-science.com":
            if (/\/catalog\/([0-9]+)\//.test(href.pathname)) {
                const generator = new SSciProuctGenerator();
                console.log(generator.generateFrom(document));
            }
            break;

        default:
            break;
    }


}
