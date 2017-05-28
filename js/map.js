"use strict";

var marker_icons = [];
for (var i = 0; i < 4; i++) {
    marker_icons.push(
        L.icon({
            iconUrl: 'images/marker-icon-' + i + '.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
        })
    );
}


function buildMapFor(location) {
    var defaultZoom = 14;
    var locations = getLocations();
    var locationInfo = getLocationInfo(locations, location);
    var map = L.map('map').setView([locationInfo.lat, locationInfo.lon], locationInfo.defaultZoom);
    map.on('moveend', onMoveEnd(map, locations));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);

    map.isDisplayedLocation = {};

    displayPlacesFromLocation(map, location);
}


function placeToHtml(place) {
    return "<b>" + place.name + "</b><br>" +
        optionalFieldToHtml("address", place.address) +
        optionalFieldToHtml("open hours", place.openHours) +
        optionalFieldToHtml("type", place.type) +
        optionalUrlToLink("website", place.url) +
        optionToHtml("power", place.power) +
        optionToHtml("wifi", place.wifi) +
        optionalFieldToHtml("comment", place.comment);
}


function iconForPlace(place) {
    var weights = { wifi: 1, power: 2 };
    var iconIndex = 0;

    for (var idx in weights) {
        iconIndex += optionValue(place[idx]) * weights[idx];
    }

    return marker_icons[iconIndex];
}


function optionalFieldToHtml(label, value) {
    return value ? label + ": " + value + "<br>" : "";
}


function optionalUrlToLink(label, value) {
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


function boolToInt(value) {
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
    if (isLocationDisplayedOnMap(map, location)) { return; }

    var places = getPlaces(location);

    places.forEach(function(place) {
        L.marker([place.lat, place.lon], { icon: iconForPlace(place) })
            .bindPopup(placeToHtml(place))
            .addTo(map);
    });

    map.isDisplayedLocation[location] = true;
}


function onMoveEnd(map, locations) {
    return function() {
        locations.map(location => {
            if (map.getBounds().contains([location.lat, location.lon])) {
                displayPlacesFromLocation(map, slugifyLocation(location.name));
            }
        });
    }
}


function isLocationDisplayedOnMap(map, location) {
    return map.isDisplayedLocation[location];
}