let {parse9, parseX, parseBuildings} = require('./helpers/cobol_to_json');

describe('COBOL to JSON converter', () => {

    describe('parse9', () => {
        it('parses a single digit number', () => {
            let result = parse9('6', 1);

            expect(result).toBe(6);
        });

        it('parses number with multiple digits', () => {
            let result = parse9('77', 2);

            expect(result).toBe(77);
        });

        it('does not parse numbers with wrong digit count', () => {
            expect(() => parse9('777', 2)).toThrow(new Error("Parsing is not possible. Wrong digit count."));

            expect(() => parse9('77', 3)).toThrow(new Error("Parsing is not possible. Wrong digit count."));
        });

        it('parses numbers with leading zeros', () => {
            expect(parse9('0123', 4)).toBe(123);
        });

        it('does not parse digits with leading whitespaces', () => {
            expect(() => parse9(' 77', 3)).toThrow(new Error("Parsing is not possible. Expected digit but found a different symbol."));
        });

        it('does not parse non digits', () => {
            expect(() => {
                parse9('h', 1)
            }).toThrow(new Error("Parsing is not possible. Expected digit but found a different symbol."));
        });
    });

    describe('parseX', () => {
        it('parses a simple string', () => {
            let result = parseX('Trump Tower', 11);

            expect(result).toBe('Trump Tower');
        });

        it('parses a string with trailing spaces and truncates them', () => {
            let result = parseX('Turm von Pisa            ', 25);

            expect(result).toBe('Turm von Pisa');
        });

        it('does not trim leading spaces', () => {
            let result = parseX('      Space Tower', 17);

            expect(result).toBe('      Space Tower');
        });

        it('does not parse string with wrong character count', () => {
            expect(() => parseX('too short', 25)).toThrow(new Error("Parsing is not possible. Wrong character count."));
            expect(() => parseX('too long', 3)).toThrow(new Error("Parsing is not possible. Wrong character count."));
        });
    });

    describe('parseBuildings', () => {
        it('parses an empty building list', () => {
            expect(parseBuildings('00')).toEqual({
                'buildings': []
            });
        });

        it('parses a single building', () => {
            expect(parseBuildings('01Kims House               00020')).toEqual({
                'buildings': [{'building_name': 'Kims House', 'building_height': 20}]
            });
        });

        it('parses multiple buildings', () => {
            expect(parseBuildings('02Kims House               00020Simon Castle             90000')).toEqual({
                'buildings': [{'building_name': 'Kims House', 'building_height': 20},
                    {'building_name': 'Simon Castle', 'building_height': 90000}]
            });
        });

        it('throws an error on incorrect array size', () => {
            expect(() => {
                parseBuildings('01Kims House               00020Simon Castle             90000')
            })
                .toThrow(new Error("Parsing is not possible. There are too many buildings in the array."));
        });
    });

});