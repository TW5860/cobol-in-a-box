let { print9, printX } = require('./helpers/json_to_cobol');

describe('JSON to COBOL converter', () => {
    describe('print9', () => {

        it('prints a single digit number', () => {
            expect(print9(1,1)).toBe('1');
        });

        it('adds zero-padding to numbers', () => {
            expect(print9(4, 3)).toBe('004');
        });

        it('throws an error on incorrect input size', () => {
            expect(() => print9(49123, 4)).toThrow(new Error ("Input number too long for copybook."));
        });

        it('allows only numbers as parameter', () => {
            expect(() => print9('Hubert', 6)).toThrow(new Error("Could not print a value as number that is no number."))
            expect(() => print9(0.1111, 6)).toThrow(new Error("Could not print a value as number that is no number."))
        });
    });

    describe('printX', () => {
        it('prints a single character', () => {
            expect(printX('a', 1)).toBe('a');
        });

        it('prints multiple characters', () => {
            expect(printX('abc', 3)).toBe('abc');
        });

        it('adds spaces to lengthen the input to the specified length', () => {
            expect(printX('abc', 6)).toBe('abc   ');
        });

        it ('throws an error on oversized input', () => {
            expect(() => printX('abcdefg', 3)).toThrow(new Error ("Input string is too long for copybook."));
        });
    });

});