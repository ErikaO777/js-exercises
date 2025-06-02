describe("Emoji's length", () => {
    describe('length check', () => {
        it('100 points symbol', () => {
            expect(('\u{1f4af}').length).toBe(2);
        });

        test('equal check utf-16 & utf-32', () => {
            expect(('\uD83D\uDCAF')).toBe('\u{0001F4AF}');
        });
    }

)
});
