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
        let locationPath = `../locations/${location}.json`;
        if (fs.existsSync(locationPath)) {
            let result = toGeoJSON(require(locationPath));
            fs.writeFileSync(`./locations/${location}.geojson`, JSON.stringify(result, false, 4));
        } else {
            console.warn(`No json file found for ${location}.`)
        }
    }
}

module.exports = {toGeoJSONFeature, toGeoJSON, main};
