"use strict";

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
