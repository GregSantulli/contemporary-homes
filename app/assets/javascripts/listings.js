

var individualMap;

function initializeIndividualMap(response) {
  var mapOptions = {
    center: new google.maps.LatLng(response.latitude, response.longitude),
    zoom: 15
  };
  individualMap = new google.maps.Map(document.getElementById('listing-map-container'), mapOptions);
}


function getListingData(){

  var listingId = $('.property-info-containter').attr('id')

  $.ajax({
    type: 'GET',
    url: '/api/listings/' + listingId
  }).done(function(response){
    initializeIndividualMap(response[0])
    setMarker(response)
  }).fail(function(){
    console.log("getListing ajax fail")
  })
}

function setMarker(response){
  for (var i = 0; i < response.length; i++) {
    var myinfowindow = new google.maps.InfoWindow({
      content: "<div>"+ response[i].address + "</div>",
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
      map: individualMap,
      infowindow: myinfowindow,
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.open(individualMap,this);
    });
  };
};




var listings;
listings = function() {
  getListingData();
};

$(document).ready(listings);
$(document).on('page:load', listings);
