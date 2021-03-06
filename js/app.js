// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(document).ready(function() {
	//adds map to page in "map" div
	var mapElem = document.getElementById('map');

	//creates an InfoWindow
	var infoWin = new google.maps.InfoWindow();

	//set map options
	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	}

	//create map
	var map = new google.maps.Map(mapElem, mapOptions);

	//get JSON for traffic cams
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data) {
		//success
		console.log(data);
		createMarker(data, map);
	})
	.fail(function(error){
		//error contains error info
		console.log(error);
		$("p").append("Failed to load traffic cameras");
	})
	.always(function() {
		//called on either success or error cases
	})

	//for each object in traffic cams, create a marker at location
	function createMarker(trafficCams, mapObj) {
		console.log("going to create a marker");

		var position;

		//go through all of the traffic cams
		$(trafficCams).each(function (i, cam) {
			//console.log("entered for loop");
			//console.log(cam);

			//gets latitude and longitude of camera as numbers
			var longitude = Number(cam.location.longitude);
			var latitude = Number(cam.location.latitude);
			//get new position from camera
			position = {
				lat: latitude,
				lng: longitude
			};
			//console.log(cam.location.longitude);
			//console.log("position:");
			//console.log(position);

			//creates a new marker
			var marker = new google.maps.Marker({
				position: position,
				map: mapObj
			});

			//opens new infoWindow when marker is clicked
			google.maps.event.addListener(marker, 'click', function (evt) {
				console.log("method called!");
				console.log(this);
				//set the info window content
				infoWin.setContent(
					cam.cameralabel
					+ '<br />'
					+ '<img src="'
					+ cam.imageurl.url
					+ '" />'
				);
				map.panTo(this.getPosition());
				infoWin.open(map, this);
			});

			var searchString = ""; //create search string so i can add onto it
			$('#search').bind('search keyup', function (search) {
				console.log("Key pressed:");
				console.log(search.keyCode);
				var searchLength = searchString.length;
				//this is special code to add (or take away) the 
				//correct character to my search string
				if (search.keyCode >= 32 && search.keyCode != 127 && search.keyCode != 173) {
					//adds basic character from key pressed
					searchString = searchString + String.fromCharCode(search.keyCode);
				} else if (search.keyCode == 8 || search.keyCode == 127) {
					console.log("reached backspace");
					//recognizes that the delete/backspace key
					// was pressed and removes last character
					searchString = searchString.substring(0, searchString.length - 1);
				} else if (search.keyCode == 13) {
					console.log("reached enter");
					//adds on empty string to recognize when enter key has been hit
					searchString = searchString + "";
				} else if (search.keyCode == 173) {
					//special case for when keyCode for key pressed does not match ASCII code
					searchString = searchString + "-";
				};
				searchString = searchString.toLowerCase();
				console.log(searchString);
				searchLength = searchString.length;
				var camName = cam.cameralabel.toLowerCase();
				if (searchLength == 0) {
					//resets the map when there's nothing in search string
					marker.setMap(map);
				};
				if (camName.indexOf(searchString) == -1) {
					//remove marker from map if it doesn't contain search string
					marker.setMap(null);
				} else if (marker == null) {
					//read the marker back onto map
					marker.setMap(map);
				};
			}); //end of search event
		}); //end of for each loop
	} //end of createMarker
});

