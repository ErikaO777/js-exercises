import { Point } from "./index.js";


describe('Point class', () => {
    describe('add method', () => {
        test('return a new Point with summed my coordinates', () => {
            const p1 = new Point(1, 2);
            const p2 = new Point(3, 4);
            const result = p1.add(p2);

            expect(result.x).toBe(4);
            expect(result.y).toBe(6);
        });
    }
)
});
