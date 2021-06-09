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
            const pageTypeRules = [
                {
                    site_type: SiteType.AkizukiDenshi,
                    validation_pattern: /^\/catalog\/top.aspx/,
                    page_type: PageType.Top
                },
                {
                    site_type: SiteType.AkizukiDenshi,
                    validation_pattern: /^\/catalog\/g\/g[MKPBRSICT]-\d{5}\//,
                    page_type: PageType.Product
                },
                {
                    site_type: SiteType.AkizukiDenshi,
                    validation_pattern: /^\/catalog\/cart\/cart.aspx/,
                    page_type: PageType.Cart
                },
                {
                    site_type: SiteType.AkizukiDenshi,
                    validation_pattern: /^\/catalog\/goods\/search.aspx/,
                    page_type: PageType.SearchResult
                },
                {
                    site_type: SiteType.SwitchScience,
                    validation_pattern: /^\/$/,
                    page_type: PageType.Top
                },
                {
                    site_type: SiteType.SwitchScience,
                    validation_pattern: /^\/catalog\/\d+\//,
                    page_type: PageType.Product
                },
                {
                    site_type: SiteType.SwitchScience,
                    validation_pattern: /^\/cart\//,
                    page_type: PageType.Cart
                },
                {
                    site_type: SiteType.SwitchScience,
                    validation_pattern: /^\/catalog\/list\//,
                    page_type: PageType.SearchResult
                },
            ];

            const pageTypeCandidates = pageTypeRules.filter((rule) => {
                const isSiteTypeEqual = siteType == rule.site_type;
                const isValidPatternEqual = rule.validation_pattern.test(url.pathname);
                return isSiteTypeEqual && isValidPatternEqual;
            }).map((rule) => { return rule.page_type });

            if (pageTypeCandidates.length == 0) {
                return PageType.Other;
            }
            return pageTypeCandidates[0];
        })(href, this.siteType);
    }

    getPageType() {
        return this.pageType;
    }

    getSiteType() {
        return this.siteType;
    }
}
