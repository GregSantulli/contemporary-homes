

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


//IMAGE SLIDER
$(function() {

    //settings for slider
    var width = 720;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    function pauseSlider() {
        clearInterval(interval);
    }

    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    startSlider();


});


var listings;
listings = function() {
  console.log("in listings")
  getListingData();



};

$(document).ready(listings);
$(document).on('page:load', listings);
