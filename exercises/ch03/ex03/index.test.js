import { equalCheckNum } from "./index.js";

describe('equalCheckNum', () => {
    describe('equalCheckNum func', () => {
        test('同値の時', () => {
            expect(equalCheckNum(1,1)).toBe(true);
            expect(equalCheckNum(0.3 - 0.2, 0.1)).toBe(true);
            expect(equalCheckNum(0.2 - 0.1, 0.1)).toBe(true);
        });
    }
)
});
