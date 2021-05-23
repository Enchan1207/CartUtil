// @ts-check
//
// 単体テスト実行スクリプト
//
import fs from 'fs';
import path from "path";
import TestCase from './TestCase.js';

// @ts-ignore
const dirname = path.dirname(new URL(import.meta.url).pathname);

const main = async () => {

    // 〇〇tests.jsのみ抜き出す
    /** @type {string[]}*/
    const testScriptPaths = await (() => {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, (error, files) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(files.filter((file) => { return file.endsWith("Tests.js"); }));
            });
        });
    })();

    // それぞれ動的インポートし、
    testScriptPaths.forEach(async (testScriptPath) => {
        const module = await import(`${dirname}/${testScriptPath}`);

        // デフォルトモジュールを取得して
        const defaultModule = module.default;
        if (defaultModule === undefined) {
            console.warn(`[\x1B[33mWARNING\x1B[0m] ${testScriptPath} doesn't have any default modules.`);
            return;
        }

        // インスタンス化して
        const testCase = new defaultModule();
        if (!(testCase instanceof TestCase)) {
            console.error(`[\x1B[31mERROR\x1B[0m] default module of ${testScriptPath} is not instance of TestCase.`);
            return;
        }

        // テスト開始!
        console.log(`[\x1B[34mINFO\x1B[0m] testing ${testScriptPath}...`);
        testCase.test()
            .then(() => {
                console.log(`[\x1B[32mSUCCESS\x1B[0m] ${testScriptPath}`);
            })
            .catch((error) => {
                console.error(`[\x1B[31mFAIRED\x1B[0m] ${testScriptPath} ${error.name}: ${error.message}`);
            });

    });
};
main();
