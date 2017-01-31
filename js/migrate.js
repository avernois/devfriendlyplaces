let fs = require('fs');

function toGeoJSONFeature(place) {
    let {lat, lon} = place;
    let properties = Object.assign({}, place);
    delete properties.lat;
    delete properties.lon;
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: properties
    };
};

function toGeoJSON(json) {
    return {
        type: 'FeatureCollection',
        features: json.places.map(toGeoJSONFeature)
    };
}

function main() {
    let locations = require('../locations/locations.json');
    for (let location in locations) {
        let result = toGeoJSON(require(`../locations/${location}.json`));
        fs.writeFileSync(`./locations/${location}.geojson`, JSON.stringify(result, false, 4));
    }
}

module.exports = {toGeoJSONFeature, toGeoJSON, main};
