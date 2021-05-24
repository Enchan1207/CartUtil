//
// content script
//

import AkizukiProductGenerator from "../lib/AkizukiProductGenerator.js";
import SSciProuctGenerator from "../lib/SSciProuctGenerator.js";

export function main() {
    // ホスト分岐
    const href = new URL(location.href);
    switch (href.host) {
        case "akizukidenshi.com":
            if (/([MKPBRSICT]-[0-9]+)\/$/.test(href.pathname)) {
                const generator = new AkizukiProductGenerator();
                console.log(generator.generateFrom(document));
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
