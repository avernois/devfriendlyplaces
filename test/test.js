let should                 = require('chai').should();
let extractLocationFromUrl = require('../js/map').extractLocationFromUrl;
let migrate                = require('../js/migrate'),
    toGeoJSON              = migrate.toGeoJSON,
    toGeoJSONFeature       = migrate.toGeoJSONFeature;

describe('Extract the location from the url', function() {
    it('should return the location from an Url', function () {
        var location = extractLocationFromUrl('cerclon.devfriendlyplaces.net');
        location.should.equal('cerclon');
    })
})

describe('Tranform json structure to the geojson one', function() {
    it('creates a FeatureCollection', function() {
        toGeoJSON({places: []}).should.eql({type: "FeatureCollection", features: []});
    });

    it('iterates overs each place', function() {
        let places = [{}, {}, {name: 'ChezWam'}]
        let result = toGeoJSON({places});
        result.features.length.should.eql(3);
        result.features[2].properties.name.should.eql('ChezWam');
    });

    describe('toGeoJSONFeature', function() {
        it('creates a geo json feature from a place', function() {
            let properties = {
                test1: 'test1',
                test2: 'test2'
            };
            let place = Object.assign({}, properties, {
                lat: 12.5,
                lon: 42.0
            });
            toGeoJSONFeature(place).should.eql({
                type: "Feature",
                geometry: {
                    type: 'Point',
                    coordinates: [42.0, 12.5]
                },
                properties: properties
            });
        });
    });
});
