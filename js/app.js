// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$( document ).ready(function() {
	//create map
	var map = new google.maps.Map(mapElem, mapOptions);
});

var mapOptions = {
	center: {lat: 47.6, lng: -122.3},
	zoom: 12
}

//adds map to page in "map" div
var mapElem = document.getElementById('map');

//creates an InfoWindow
var infoWin = new google.maps.InfoWindow();
