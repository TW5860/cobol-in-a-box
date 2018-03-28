let {buildPrinter} = require('./helpers/json_to_printer');

describe('JSON to printer', () => {

    it('prints a json object with copybook information', () => {
        let jsonObj = {};
        let objSpec = {
            "type": "object",
            "properties":{}
        };
        let printer = buildPrinter(objSpec);
        expect(printer(jsonObj)).toBe("");
    });

    it('prints an integer', () => {
        let objSpec = {
            "type": "integer",
            "maximum": 9999,
            "minimum": 0
        };
        let printer = buildPrinter(objSpec);
        expect(printer(44)).toBe("0044");
    });

});