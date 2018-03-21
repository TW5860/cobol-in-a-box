let { buildParser } = require('./helpers/json_to_parser');

describe('JSON to parser', () => {

    describe('Digit parser', () => {
        it('creates a single digit parser', () => {

            let obj = {
               "type": "integer",
               "maximum": 99999,
               "minimum": 0
            };

            let resultParser = buildParser(obj);

            expect(resultParser("00006")).toBe(6);
        });
    });
});