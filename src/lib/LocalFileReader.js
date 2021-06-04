// @ts-check
// 
// ローカルファイル読み込みクラス
//

export default class LocalFileReader {

    /**
     * @module loadfile
     * @param {string} path 
     */
    static async loadfile(path) {
        // @ts-ignore Chrome拡張でなければreturn
        if (typeof chrome === "undefined") {
            throw new Error("Current environment is not supported chrome.runtime!");
        }

        return new Promise((resolve, reject) => {
            // @ts-ignore ファイルパスを生成
            const fileURL = chrome.runtime.getURL(path);

            const xhr = new XMLHttpRequest();
            xhr.open("GET", fileURL);
            xhr.addEventListener('load', () => {
                resolve(xhr.response);
            });
            xhr.addEventListener('error', (event) => {
                reject(event);
            });
            xhr.send();
        });
    }

}
