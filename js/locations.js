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

function buildLocations() {
  var locations = getLocations();

  var listContainer = document.createElement("div");
    document.getElementById("locations").appendChild(listContainer);
    var listElement = document.createElement("ul");

    listContainer.appendChild(listElement);

  sortKeys(locations).map(function(location) {
        var listItem = document.createElement("li");

        listItem.innerHTML = "<a href=\"http://" + location + ".devfriendlyplaces.net\">" + locations[location].name + "</a>";
        listElement.appendChild(listItem);
    });
}
