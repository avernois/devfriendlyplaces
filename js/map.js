function getCityFromUrl() {
	var hostname = window.location.hostname;
	var split = hostname.split(".");
	var city = split[0]

	if ((split.length < 3) || (city == "www")) {
		return "toulouse";
	}

	return city;
}

function getPlaces(city) {
	var request = new XMLHttpRequest();
	request.open("GET", "/places/" + city + ".json", false);
	request.send(null)

	return JSON.parse(request.responseText) 	
}

function buildMapFor(city) {
	var defaultZoom = 14;
	var places = getPlaces(city);

	var map = L.map('map').setView([places.city.lat, places.city.lon], places.city.defaultZoom);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);

	places.places.forEach(function(place) {
		L.marker([place.lat, place.lon])
		.bindPopup(placeToHtml(place))
		.addTo(map);
	});
}

function placeToHtml(place) {
	return "<b>" + place.name + "</b><br>"
	+ "address: " + place.address + "<br>"
	+ "type: " + place.type + "<br>"
	+ "power: " + optionToHtml(place.power) + "<br>"
	+ "wifi: " + optionToHtml(place.wifi) + "<br>"
};

function optionToHtml(value) {
	if (value !== undefined) {
		return boolToStr(value.available) + optionalComment(value.comment);
	} else {
		return 'undefined';
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
