// @ts-check
//
// Unittest - UniqueIDGenerator
//
import UniqueIDGenerator from "../src/lib/UniqueIDGenerator.js";
import TestCase from "./TestCase.js";

export default class UniqueIDGeneratorTests extends TestCase {
    async test() {
        const sampleCount = 10000;
        const samples = Array(sampleCount).fill(null).map(() => { return UniqueIDGenerator.getUniqueID() });
        console.log(`${sampleCount} samples generated.`);

        const result = samples.filter((sample) => {
            return samples.filter((_sample) => {
                return sample === _sample;
            }).length > 2;
        }).length == 0;

        if (!result) {
            throw new Error("\x1B[31mFAILED\x1B[0m ID conflicted!");
        }
    }
}
