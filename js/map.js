"use strict";

var isCommonJS = typeof exports == "object" && typeof module == "object";
if (isCommonJS) {
    var L = {icon: function(){}};
}

var marker_icons = [];
for(var i = 0; i < 4; i++) {
    marker_icons.push(
        L.icon({
            iconUrl: 'images/marker-icon-' + i + '.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
        })
    );
}

function extractLocationFromUrl(hostname) {
    var split = hostname.split(".");
    var location = split[0];

    if ((split.length < 3) || (location == "www")) {
        throw "No location in the url";;
    }

    return location;
}

function getLocations() {
    return getJSON("/locations/locations.json");
}

function getPlaces(location) {
    return getJSON("/locations/" + location + ".geojson");
}

function getJSON(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    return JSON.parse(request.responseText);
}

function buildMapFor(location) {
    var defaultZoom = 14;
    var locations = getLocations();
    var map = L.map('map').setView([locations[location].lat, locations[location].lon], locations[location].defaultZoom);
    map.on('moveend', onMoveEnd(map, locations));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);

    map.isDisplayedLocation = {};

    displayPlacesFromLocation(map, location);
}

function placeToHtml(place) {
    return "<b>" + place.properties.name + "</b><br>" +
        optionalFieldToHtml("address", place.properties.address) +
        optionalFieldToHtml("open hours", place.properties.openHours) +
        optionalFieldToHtml("type", place.properties.type) +
        optionalUrlToLink("website", place.properties.url) +
        optionToHtml("power", place.properties.power) +
        optionToHtml("wifi", place.properties.wifi) +
        optionalFieldToHtml("comment", place.properties.comment);
}

function iconForPlace(place) {
    var weights = {wifi: 1, power: 2};
    var iconIndex = 0;

    for(var idx in weights) {
        iconIndex += optionValue(place[idx]) * weights[idx];
    }

    return marker_icons[iconIndex];
}

function optionalFieldToHtml(label, value) {
    return value ? label + ": " + value + "<br>" : "";
}

function optionalUrlToLink(label, value){
    return value ? label + ": " + "<a href='" + value + "'>" + value + "</a>" + "<br>" : "";
}

function optionToHtml(label, value) {
    return label + ": " + optionText(value) + "<br>";
}

function optionText(value) {
    if (value !== undefined) {
        return boolToStr(value.available) + optionalComment(value.comment);
    } else {
        return "undefined";
    }
}

function optionValue(value) {
    if (value !== undefined) {
        return boolToInt(value.available);
    }
    return 0;
}

function boolToStr(value) {
    if (value !== undefined) {
        return value ? "yes" : "no";
    } else {
        return 'undefined';
    }
}

function boolToInt(value){
    if (value !== undefined) {
        return value ? 1 : 0;
    } else {
        return 0;
    }
}

function optionalComment(value) {
    return value ? "(" + value + ")" : "";
}

function displayPlacesFromLocation(map, location) {
    if (isLocationDisplayedOnMap(map, location)) {return;}

    var places = getPlaces(location);

    L.geoJSON(places, {
        pointToLayer: function(point, latlng) {
            return L.marker(latlng, {icon: iconForPlace(point.properties)});
        }
    }).bindPopup(function (layer) {
        return placeToHtml(layer.feature);
    }).addTo(map);

    map.isDisplayedLocation[location] = true;
}

function onMoveEnd(map, locations) {
    return function() {
        for (var key in locations) {
            var location = locations[key];
            if (map.getBounds().contains([location.lat, location.lon])) {
                displayPlacesFromLocation(map, key);
            }
        };
    }
}

function isLocationDisplayedOnMap(map, location) {
    return map.isDisplayedLocation[location];
}

if (isCommonJS) {
    module.exports = { extractLocationFromUrl };
}
