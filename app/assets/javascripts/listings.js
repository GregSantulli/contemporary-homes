

var individualMap;

function initializeIndividualMap(response) {
  console.log(response)
  var mapOptions = {
    center: new google.maps.LatLng(response.latitude, response.longitude),
    zoom: 15
  };
  individualMap = new google.maps.Map(document.getElementById('listing-map-container'), mapOptions);
}


function getListingData(){

  var listingId = $('.property-info-containter').attr('id')
  console.log(listingId)

  $.ajax({
    type: 'GET',
    url: '/api/listings/' + listingId
  }).done(function(response){
    console.log(response)
    initializeIndividualMap(response[0])
    setMarker(response)
  }).fail(function(){
    console.log("fail")
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
  getListingData()
  console.log("in listings")
};

$(document).ready(listings);
$(document).on('page:load', listings);
