let {print9, printX, printBuildings} = require('./helpers/json_to_cobol');

describe('JSON to COBOL converter', () => {
    describe('print9', () => {

        it('prints a single digit number', () => {
            expect(print9(1, 1)).toBe('1');
        });

        it('adds zero-padding to numbers', () => {
            expect(print9(4, 3)).toBe('004');
        });

        it('throws an error on incorrect input size', () => {
            expect(() => print9(49123, 4)).toThrow(new Error("Input number too long for copybook."));
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

        it('throws an error on oversized input', () => {
            expect(() => printX('abcdefg', 3)).toThrow(new Error("Input string is too long for copybook."));
        });

        it('throws an error on not a string input', () => {
            expect(() => printX(undefined, 3)).toThrow(new Error("Input is not a string"));
            expect(() => printX(NaN, 3)).toThrow(new Error("Input is not a string"));
            expect(() => printX(true, 3)).toThrow(new Error("Input is not a string"));
            expect(() => printX(9.8, 3)).toThrow(new Error("Input is not a string"));
            expect(() => printX({}, 3)).toThrow(new Error("Input is not a string"));
            expect(() => printX([], 3)).toThrow(new Error("Input is not a string"));
        });
    });

    describe('printBuilding', () => {
        it('prints an empty buildings list', () => {
            let buildings = {'buildings': []};
            expect(printBuildings(buildings)).toBe("00");
        });

        it('prints a single building', () => {
            let buildings = {
                'buildings': [
                    {'building_name': 'Kims Tower', 'building_height': 60}]
            };
            expect(printBuildings(buildings)).toBe("01Kims Tower               00060");
        });

        it('prints multiple buildings', () => {
            let buildings = {
                'buildings': [
                    {'building_name': 'Kims Tower', 'building_height': 60},
                    {'building_name': 'Simons Basement', 'building_height': 2}
                ]
            };
            expect(printBuildings(buildings)).toBe("02Kims Tower               00060Simons Basement          00002");
        });

        it('throws error on misformed parameter', () => {
            let buildings = {
                'buildings': [
                    {'building_name': 'Kims Tower'}]
            };
            expect(() => printBuildings(buildings)).toThrowError(Error);

            buildings = {
                'buildings': [
                    {'building_height': 60}]
            };
            expect(() => printBuildings(buildings)).toThrowError(Error);

            buildings = {'buildings': {}};
            expect(() => printBuildings(buildings)).toThrowError(Error);

            expect(() => printBuildings({})).toThrowError(Error);

            expect(() => printBuildings(undefined)).toThrowError(Error);
            expect(() => printBuildings(9)).toThrowError(Error);
            expect(() => printBuildings("hallo")).toThrowError(Error);
        });
    });

});