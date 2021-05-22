//
// スクリプト間通信用のメッセージ
//

export default class Message {

    /**
     * @param {string} source - メッセージ発行元
     * @param {string|null} command - コマンド
     * @param {Array|null} args - コマンド引数
     * @param {Object|null} response - レスポンス
     * @param {Array|null} errors - コマンド実行エラー
     */
    constructor(source, command, args, response, errors){
        this.source = source
        this.command = command
        this.args = args
        this.response = response
        this.errors = errors
    }
}
