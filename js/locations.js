"use strict";

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
  return getJSON("/locations/locations.json");
}

function sortKeys(locations) {
    return locations.map(l => l.name).sort()
}

function buildLocations() {
  var locations = getLocations();
  var listContainer = document.createElement("div");
  var listElement = document.createElement("ul");
  document.getElementById("locations").appendChild(listContainer);
  listContainer.appendChild(listElement);
  sortKeys(locations).map(location => {
        var listItem = document.createElement("li");
        listItem.innerHTML = "<a href=\"https://" + slugifyLocation(location) + ".devfriendlyplaces.net\">" + location + "</a>";
        listElement.appendChild(listItem);
    });
}
