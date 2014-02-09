function MapMaker(){};

MapMaker.prototype.getCityFromHostname = function(hostname) {
    var split = hostname.split(".");
    var city = split[0];
    if ((split.length < 3) || (city == "www")) {
            return "toulouse";
    }

    return city;
}

MapMaker.prototype.placeToHtml = function(place) {
        
        return "<b>" + place.name + "</b><br>"
        + optionalFieldToHtml("address", place.address)
        + optionalFieldToHtml("open hours", place.openHours)
        + optionalFieldToHtml("type", place.type)
        + optionalUrlToLink("website", place.url)
        + optionToHtml("power", place.power)
        + optionToHtml("wifi", place.wifi);

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

        function boolToStr(value) {
            if (value !== undefined) {
                return value ? "yes" : "no";
            } else {
                return 'undefined';
            }
        }

        function optionalComment(value) {
            return value ? "(" + value + ")" : "";
        }
}

MapMaker.prototype.buildMapFor = function(city, leaf, mapHolder) {
    var self = this; // to access other public functions
    
    var defaultZoom = 14;
    var places = getPlaces(city);

    var map = leaf.map(mapHolder).setView([places.city.lat, places.city.lon], places.city.defaultZoom);

    leaf.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);

    places.places.forEach(function(place) {
        leaf.marker([place.lat, place.lon])
        .bindPopup(self.placeToHtml(place)) // 'this' in this case points to the current place
        .addTo(map);
    });
    
    function getPlaces(city) {
        var request = new XMLHttpRequest();
        request.open("GET", "/places/" + city + ".json", false);
        request.send(null)

        return JSON.parse(request.responseText) 	
    }
}
