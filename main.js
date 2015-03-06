

var map;
var infowindow;
var placeInfo;

function initialize() {
  var seattle = new google.maps.LatLng(47.6278645,-122.3158121);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 47.6278645, lng: -122.3158121},
    zoom: 14
  });

  var request = {
    location: seattle,
    radius: 1000,
    types: ['florist']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], results[i].place_id);
    }
  }
}


/** We will need an application API key from Google for this to work as we will be
requesting a JSON file from Google for each marker using the placeId in order to get
more information about each location beyond just the name */
function createMarker(place, placeId) {
  var placeLoc = place.geometry.location;
  var placeAddress;
  var placeRating;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

/**  $.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=OurApiKey", function(data){
    placeAddress = data.results.formatted_address;
    placeRating = data.results.rating;
  });
*/

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


google.maps.event.addDomListener(window, 'load', initialize);




// function initialize() {

//   var markers = [];
//   var map = new google.maps.Map(document.getElementById('map-canvas'), {
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });

//   var defaultBounds = new google.maps.LatLngBounds(
//       new google.maps.LatLng(47.7097, -122.3331),
//       new google.maps.LatLng(47.5097, -122.2331));
//   map.fitBounds(defaultBounds);

//   // Create the search box and link it to the UI element.
//   var input = /** @type {HTMLInputElement} */(
//       document.getElementById('pac-input'));
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//   var searchBox = new google.maps.places.SearchBox(
//     /** @type {HTMLInputElement} */(input));

//   // Listen for the event fired when the user selects an item from the
//   // pick list. Retrieve the matching places for that item.
//   google.maps.event.addListener(searchBox, 'places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }
//     for (var i = 0, marker; marker = markers[i]; i++) {
//       marker.setMap(null);
//     }

//     // For each place, get the icon, place name, and location.
//     markers = [];
//     var bounds = new google.maps.LatLngBounds();
//     for (var i = 0, place; place = places[i]; i++) {
//       var image = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       var marker = new google.maps.Marker({
//         map: map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location
//       });

//       markers.push(marker);

//       bounds.extend(place.geometry.location);
//     }

//     map.fitBounds(bounds);
//   });

//   // Bias the SearchBox results towards places that are within the bounds of the
//   // current map's viewport.
//   google.maps.event.addListener(map, 'bounds_changed', function() {
//     var bounds = map.getBounds();
//     searchBox.setBounds(bounds);
//   });
// }

// google.maps.event.addDomListener(window, 'load', initialize);
