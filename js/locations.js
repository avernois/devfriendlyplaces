"use strict";


function extractLocationFromUrl(hostname) {
    var split = hostname.split(".");
    var location = split[0];

    if ((split.length < 3) || (location == "www")) {
        throw "No location in the url";;
    }

    return location;
}


function getJSON(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    return JSON.parse(request.responseText);
}


function slugifyLocation(location) {
    return location.toUpperCase()
        .replace("À", "A")
        .replace(/[È,É]/, "E")
        .replace(" ", "-")
        .toLowerCase();
}


function getLocations() {
  // Possible to get an absolute url : https://raw.githubusercontent.com/...
  return getJSON("https://raw.githubusercontent.com/devfriendlyplaces/data/data/locations/locations.json");
}


function getPlaces(location) {
    return getJSON("https://raw.githubusercontent.com/devfriendlyplaces/data/data/locations/" + location + ".json");
}


function sortKeys(locations) {
    return locations.map(l => l.name).sort()
}


function getLocationInfo(locations, location) {
    return locations.filter(
        l => slugifyLocation(l.name) === location
    )[0]
}
