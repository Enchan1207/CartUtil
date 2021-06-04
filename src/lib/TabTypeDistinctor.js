// @ts-check
//
// HTMLDocumentからPageType, SiteTypeを取得・生成
//

import { PageType } from "./PageType.js";
import { SiteType } from "./SiteType.js";

export default class TabTypeDistinctor {

    /**
     * @constructor
     * @param {URL} href 
     */
    constructor(href) {

        // SiteTypeを特定
        this.siteType = ((url) => {
            switch (url.host) {
                case "akizukidenshi.com":
                    return SiteType.AkizukiDenshi;

                case "www.switch-science.com":
                    return SiteType.SwitchScience;

                default:
                    return SiteType.Other;
            }
        })(href);

        // PageTypeを特定
        this.pageType = ((url, siteType) => {
            switch (siteType) {
                // 秋月電子
                case SiteType.AkizukiDenshi:
                    if (/\/catalog\/top.aspx/.test(url.pathname)) return PageType.Top;
                    if (/\/catalog\/g\/g[MKPBRSICT]-\d{5}\//.test(url.pathname)) return PageType.Product
                    if (/\/catalog\/cart\/cart.aspx/.test(url.pathname)) return PageType.Cart;
                    if (/\/catalog\/goods\/search.aspx/.test(url.pathname)) return PageType.SearchResult;
                    return PageType.Other;

                // スイッチサイエンス
                case SiteType.SwitchScience:
                    if (/^\/$/.test(url.pathname)) return PageType.Top;
                    if (/^\/catalog\/\d+\//.test(url.pathname)) return PageType.Product
                    if (/^\/cart\//.test(url.pathname)) return PageType.Cart;
                    if (/^\/catalog\/list\//.test(url.pathname)) return PageType.SearchResult;
                    return PageType.Other;

                default:
                    return PageType.Other;
            }
        })(href, this.siteType);
    }

    getPageType() {
        return this.pageType;
    }

    getSiteType() {
        return this.siteType;
    }
}
