let {buildParser} = require('./helpers/json_to_parser');
let {buildPrinter} = require('./helpers/json_to_printer');

describe('JSON to parser and printer', () => {

    it('fails when given an unrecognized type', () => {
        expect(() => buildParser({"type": "unknown"}))
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
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("00006")).toBe(6);
            expect(resultParser("00007")).toBe(7);

            expect(resultPrinter(resultParser("00007"))).toBe("00007")
        });

        it('recognizes the number of digits', () => {

            let obj = {
                "type": "integer",
                "maximum": 999,
                "minimum": 0
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("026")).toBe(26);
            expect(resultParser("107")).toBe(107);

            expect(resultPrinter(resultParser("026"))).toBe("026");
        });
    });

    describe('String parser', () => {
        it('creates a string parser', () => {

            let obj = {
                "type": "string",
                "maxLength": 5,
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("Hall ")).toBe("Hall");

            expect(resultPrinter(resultParser("Hall "))).toBe("Hall ");
        });
    });

    describe('Object parser', () => {
        it('creates an object parser for empty objects', () => {

            let obj = {
                "type": "object",
                "properties": {},
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("")).toEqual({});
            expect(resultPrinter(resultParser(""))).toBe("");
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
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("Hallo   001")).toEqual({
                "test_item": "Hallo",
                "test_int": 1
            });

            expect(resultPrinter(resultParser("Hallo   001"))).toBe("Hallo   001");
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
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("Hallo   001007")).toEqual({
                "test_item": "Hallo",
                "test_int": 1,
                "2ndlevel": {
                    "2ndlevel_string": "0",
                    "2ndlevel_int": 7
                }
            });
            expect(resultPrinter(resultParser("Hallo   001007"))).toBe("Hallo   001007");
        });
    });

    describe("Array parser", () => {
        it('creates a parser for an empty array', () => {
            let obj = {
                "type": "array",
                "maxItems": 99,
                "minItems": 0,
                "items": {
                    "type": "string",
                    "maxLength": 5
                }
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("00")).toEqual([]);

            expect(resultPrinter(resultParser("00"))).toBe("00");
        });

        it('creates a parser for an array with one item', () => {
            let obj = {
                "type": "array",
                "maxItems": 99,
                "minItems": 0,
                "items": {
                    "type": "string",
                    "maxLength": 10
                }
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("01redballoon")).toEqual(["redballoon"]);

            expect(resultPrinter(resultParser("01redballoon"))).toBe("01redballoon");
        });
    });

    describe("Crazy Funky Test", () => {
        it('can parse complex items', () => {
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
                    },
                    "randomArray": {
                        "type": "array",
                        "maxItems": 99,
                        "minItems": 0,
                        "items": {
                            "type": "object",
                            "properties": {
                                "3ndlevel_string": {
                                    "type": "string",
                                    "maxLength": 1
                                },
                                "3ndlevel_int": {
                                    "type": "integer",
                                    "maximum": 9,
                                    "minimum": 0
                                },
                                "3thlevel_array": {
                                    "type": "array",
                                    "maxItems": 99,
                                    "minItems": 0,
                                    "items": {
                                        "type": "string",
                                        "maxLength": 1
                                    }
                                }
                            }
                        }
                    }
                }
            };

            let resultParser = buildParser(obj);
            let resultPrinter = buildPrinter(obj);

            expect(resultParser("Hallo   00100703a110abcdefghijb210abcdefghijc310abcdefghij")).toEqual({
                "test_item": "Hallo",
                "test_int": 1,
                "2ndlevel": {
                    "2ndlevel_string": "0",
                    "2ndlevel_int": 7
                },
                "randomArray": [
                    {
                        "3ndlevel_string": "a",
                        "3ndlevel_int": 1,
                        "3thlevel_array": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
                    },
                    {
                        "3ndlevel_string": "b",
                        "3ndlevel_int": 2,
                        "3thlevel_array": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
                    },
                    {
                        "3ndlevel_string": "c",
                        "3ndlevel_int": 3,
                        "3thlevel_array": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
                    }]
            });

            expect(resultPrinter(resultParser("Hallo   00100703a110abcdefghijb210abcdefghijc310abcdefghij")))
                .toBe("Hallo   00100703a110abcdefghijb210abcdefghijc310abcdefghij");
        });
    });
});