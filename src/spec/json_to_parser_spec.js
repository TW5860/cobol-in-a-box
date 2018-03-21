let {buildParser} = require('./helpers/json_to_parser');

describe('JSON to parser', () => {

    it('fails when given an unrecognized type', () => {
        expect( () => buildParser({"type":"unknown"}))
            .toThrowError(Error);
    });

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

    describe('String parser', () => {
        it('creates a string parser', () => {

            let obj = {
                "type": "string",
                "maxLength": 5,
            };

            let resultParser = buildParser(obj);

            expect(resultParser("Hall ")).toBe("Hall");
        });
    });

    describe('Object parser', () => {
        it('creates an object parser for empty objects', () => {

            let obj = {
                "type": "object",
                "properties": {},
            };

            let resultParser = buildParser(obj);

            expect(resultParser("")).toEqual({});
        });

        it('creates parsers recursively', () => {
            let obj = {
                "type": "object",
                "properties": {
                    "test_item": {
                        "type": "string",
                        "maxLength": 8
                    },
                    "test_int": {
                        "type": "integer",
                        "maximum": 999,
                        "minimum": 0
                    }
                },
            };

            let resultParser = buildParser(obj);

            expect(resultParser("Hallo   001")).toEqual({
                "test_item": "Hallo",
                "test_int": 1
            });
        });

        it('creates parsers recursively 2nd level', () => {
            let obj = {
                "type": "object",
                "properties": {
                    "test_item": {
                        "type": "string",
                        "maxLength": 8
                    },
                    "test_int": {
                        "type": "integer",
                        "maximum": 999,
                        "minimum": 0
                    },
                    "2ndlevel": {
                        "type": "object",
                        "properties": {
                            "2ndlevel_string": {
                                "type": "string",
                                "maxLength": 1
                            },
                            "2ndlevel_int": {
                                "type": "integer",
                                "maximum": 99,
                                "minimum": 0
                            }
                        }
                    }
                }
            };

            let resultParser = buildParser(obj);

            expect(resultParser("Hallo   001007")).toEqual({
                "test_item": "Hallo",
                "test_int": 1,
                "2ndlevel":{
                    "2ndlevel_string": "0",
                    "2ndlevel_int" : 7
                }
            });
        });
    });
});