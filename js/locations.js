"use strict";

function getJSON(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    return JSON.parse(request.responseText);
}

function getLocations() {
  return getJSON("/locations/locations.json");
}

function sortKeys(locations) {
    var keys = [];

    for (var key in locations) {
        keys.push(key);
    }

    return keys.sort();
}

function buildSubdomainLocation(url, listElement, location, name) {
    var listItem = document.createElement("li");
    var topDomain = url.host.split(".").slice(-2).join(".");
    var locationUrl = location + "." + topDomain;

    listItem.innerHTML = "<a href=\"" + locationUrl + "\">" + name + "</a>";
    listElement.appendChild(listItem);
}

function buildQueryLocation(url, listElement, location, name) {
    var listItem = document.createElement("li");
    var locationUrl = url.href.replace(url.pathname, "/?location=" + location);

    listItem.innerHTML = "<a href=\"" + locationUrl + "\">" + name + "</a>";
    listElement.appendChild(listItem);
}

function getLocationBuilderFromUrl(url) {
    if (url.hostname === 'localhost') return buildQueryLocation;
    if (url.hostname === '127.0.0.1') return buildQueryLocation;
    return buildSubdomainLocation;
}

function buildLocations(url) {
    var locations = getLocations();

    var listContainer = document.createElement("div");
    document.getElementById("locations").appendChild(listContainer);
    var listElement = document.createElement("ul");

    listContainer.appendChild(listElement);

    var buildLocation = getLocationBuilderFromUrl(url);
    sortKeys(locations).map(function(location) {
        buildLocation(url, listElement, location, locations[location].name);
    });
}
