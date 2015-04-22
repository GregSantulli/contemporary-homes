
var ready;

ready = function() {
  initializeMap()
  startResponsiveSlides()
};


$(document).ready(ready);
$(document).on('page:load', ready);


function startResponsiveSlides(){
  $(".rslides").responsiveSlides();
};


var map;

function initializeMap() {
  var mapOptions = {center: new google.maps.LatLng(41.2258, -73.6650), zoom: 12};
  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
  setMarkers()
}

function setMarkers() {
  $.ajax({
    type: 'GET',
    url: 'api/listings'
  }).done(function(response){
    for (var i = 0; i < response.length; i++) {

      var myinfowindow = new google.maps.InfoWindow({
        content: "<div><a href='/listings/" + response[i].id + "'>" + response[i].address + "</a></div>"
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
        map: map,
        infowindow: myinfowindow,
      });

      google.maps.event.addListener(marker, 'click', function() {
        this.infowindow.open(map,this);
      });
    };
  }).fail(function(){
    console.log("fail")
  })
}



