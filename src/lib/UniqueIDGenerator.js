// @ts-check
//
// ユニークID生成
//

export default class UniqueIDGenerator {

    /**
     * ガバUUIDもどきを生成 (もはやユニークかすらわからない)
     * @module getUniqueID
     * @param {number|null} strength - 強さ デフォルトで10000
     * @returns 適当に生成したガバID
     */
    getUniqueID = (strength = null) => {
        const s = strength ?? 10000;

        // DateをUnixtimeに起こしてn倍して、13~14桁のhex文字列を生成
        const primary = (new Date().getTime() * Math.floor(Math.random() * s)).toString(16);

        // 後ろに適当に乱数くっつけて16文字取り出し、全て大文字に
        const sliced = (primary + Math.floor(Math.random() * 0xFFFF).toString(16)).slice(0, 16).toLocaleUpperCase();

        // 4文字ずつ分割してハイフンで結合 頭の悪い実装
        return `${sliced.slice(0, 4)}-${sliced.slice(4, 8)}-${sliced.slice(8, 12)}-${sliced.slice(12, 16)}`

    };
}


