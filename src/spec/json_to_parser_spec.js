let {buildParser} = require('./helpers/json_to_parser');

describe('JSON to parser', () => {

    describe('Digit parser', () => {
        it('creates an integer parser', () => {

            let obj = {
                "type": "integer",
                "maximum": 99999,
                "minimum": 0
            };

            let resultParser = buildParser(obj);

            expect(resultParser("00006")).toBe(6);
            expect(resultParser("00007")).toBe(7);
        });

        it('recognizes the number of digits', () => {

            let obj = {
                "type": "integer",
                "maximum": 999,
                "minimum": 0
            };

            let resultParser = buildParser(obj);

            expect(resultParser("026")).toBe(26);
            expect(resultParser("107")).toBe(107);
        });
    });
});