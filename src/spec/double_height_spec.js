let {execTestDriver} = require('./helpers/test_driver_helper');

xdescribe("Double Height", function () {
    it("keeps an empty building list", function (done) {
        let emptyBuildingsList = {
            'buildings': []
        };
        execTestDriver(emptyBuildingsList, (result) => {
            expect(result).toEqual(emptyBuildingsList);
            done();
        });
    });

    it("doubles the height of a single building", function (done) {
        let input = {
            'buildings': [
                {
                    'building_name': 'Nice Building',
                    'building_height': 30
                }
            ]
        };
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

    it("works with multiple buildings", function (done) {
        let input = {
            'buildings': [
                {
                    'building_name': 'Building XYZ',
                    'building_height': 25
                },
                {
                    'building_name': 'Nice Building',
                    'building_height': 30
                }
            ]
        };
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

