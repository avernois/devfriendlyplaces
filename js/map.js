function getLocationFromUrl() {
	var hostname = window.location.hostname;
	var split = hostname.split(".");
	var location = split[0]

	if ((split.length < 3) || (location == "www")) {
		return "toulouse";
	}

	return location;
}

function getPlaces(location) {
	var request = new XMLHttpRequest();
	request.open("GET", "/locations/" + location + ".json", false);
	request.send(null)

	return JSON.parse(request.responseText) 	
}

function buildMapFor(location) {
	var defaultZoom = 14;
	var places = getPlaces(location);

	var map = L.map('map').setView([places.location.lat, places.location.lon], places.location.defaultZoom);

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
	+ optionalFieldToHtml("address", place.address)
	+ optionalFieldToHtml("open hours", place.openHours)
	+ optionalFieldToHtml("type", place.type)
	+ optionalUrlToLink("website", place.url)
	+ optionToHtml("power", place.power)
	+ optionToHtml("wifi", place.wifi);
};

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
