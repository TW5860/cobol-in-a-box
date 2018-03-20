let { execTestDriver } = require('./helpers/test_driver_helper');

describe("Double Height", function() {
    it("keeps an empty building list", function(done) {
        let input = '00';
        execTestDriver(input, (result) => {
            expect(result).toEqual({'buildings':[]});
            done();
        });
    });

    it("doubles the height of a single building", function(done) {
        let input = '01Nice Building            00030';
        execTestDriver(input, (result) => {
            expect(result).toEqual({
                'buildings': [
                    {
                        'building_name': 'Nice Building',
                        'building_height': 60
                    }
                ]
            });
            done();
        });
    });

    it("works with multiple buildings", function(done) {
        let input = '02Building XYZ             00025Nice Building            00030';
        execTestDriver(input, (result) => {
            expect(result).toEqual({
                'buildings': [
                    {
                        'building_name': 'Building XYZ',
                        'building_height': 50
                    },
                    {
                        'building_name': 'Nice Building',
                        'building_height': 60
                    }
                ]
            });
            done();
        });
    });
});

