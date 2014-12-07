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

	//get JSON for traffic cams
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data) {
		//success
		console.log(data);
		console.log("going to create a marker");
		//go through all of the traffic cams
		for (var i = 0; i < data.length; i++) {
			console.log("entered for loop");
			//get new position from camera
			var position = {
				//console.log(data[i]);
				lng: data[i].xpos,
				lat: data[i].ypos
			};
			console.log(data[i].xpos);
			console.log("postion:");
			console.log(postion);
			//creates a new marker
			var marker = new google.maps.Marker({
				position: position,
				map: map
			});
		};
		//createMarker(data);
	})
	.fail(function(error){
		//error contains error info
		console.log(error);
		$("p").append("Failed to load traffic cameras");
	})
	.always(function() {
		//called on either success or error cases
	})
});

var mapOptions = {
	center: {lat: 47.6, lng: -122.3},
	zoom: 12
}

//adds map to page in "map" div
var mapElem = document.getElementById('map');

//var imgContent;

//creates an InfoWindow
var infoWin = new google.maps.InfoWindow();

//for each object in traffic cams, create a marker at location

function createMarker (trafficCams) {
	console.log("going to create a marker");
	//go through all of the traffic cams
	for (var i = 0; i < trafficCams.length; i++) {
		console.log("entered for loop");
		//get new position from camera
		var position = {
			//console.log(trafficCams[i]);
			lng: trafficCams[i].xpos,
			lat: trafficCams[i].ypos
		};
		console.log(trafficCams[i].xpos);
		console.log("postion:");
		console.log(postion);
		//creates a new marker
		var marker = new google.maps.Marker({
			position: position,
			map: map
		});
	};
}
