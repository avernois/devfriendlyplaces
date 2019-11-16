if ("geolocation" in navigator) {
    document.getElementById('geoloc').style.display = "inline-block";
}

function initGeolocation() {
    var onSuccess = function(geoPosition) {
        var minDistance, nearestLocation, currentDistance, locations = getLocations();
        var lat1 = geoPosition.coords.latitude;
        var lon1 = geoPosition.coords.longitude;
        var squaredDistanceFromCurrent = function(location) {
            return Math.pow(lat1 - location.lat, 2) + Math.pow(lon1 - location.lon, 2);
        };
        for (var locationName in locations) {
            currentDistance = squaredDistanceFromCurrent(locations[locationName]);
            if (minDistance == undefined || currentDistance < minDistance) {
                minDistance = currentDistance;
                nearestLocation = locationName;
            }
        }
        if (nearestLocation) {
            window.location.href = "http://" + nearestLocation + ".devfriendlyplaces.net";
        }
    };
    navigator.geolocation.getCurrentPosition(onSuccess);
}