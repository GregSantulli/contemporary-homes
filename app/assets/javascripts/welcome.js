
function startResponsiveSlides(){
  $(".rslides").responsiveSlides({
  auto: true,
  speed: 1500,
  timeout: 4000,
  pause: false,
  pauseControls: false,
  random: true,
});
};


var map;

function initializeMap() {
  var styles = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#76aee3"},{"saturation":38},{"lightness":-11},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#8dc749"},{"saturation":-47},{"lightness":-17},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#c6e3a4"},{"saturation":17},{"lightness":-2},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#cccccc"},{"saturation":-100},{"lightness":13},{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"hue":"#5f5855"},{"saturation":6},{"lightness":-31},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[]}]
  var mapOptions = {
    center: new google.maps.LatLng(41.2173979,-73.5517066),
    zoom: 12,
    scrollwheel: false,
    styles: styles
  };
  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
  setMarkers()
}

function getListingPhoto(id){
  $.ajax({
    type: 'GET',
    url: 'api/photo/' + id
  }).done(function(response){
    // console.log(response)
    return response
  })

};


function setMarkers() {
  $.ajax({
    type: 'GET',
    url: 'api/listings'
  }).done(function(response){
    for (var i = 0; i < response.length; i++) {
      var id = response[i].id
      var myinfowindow = new google.maps.InfoWindow({
        content: "<div><a href='/listings/" + response[i].id + "'>" + response[i].address + "</a></div>"
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
        map: map,
        infowindow: myinfowindow,
        icon: 'assets/house112.svg'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.infowindow.open(map,this);
      });
    };
  }).fail(function(){
    console.log("fail")
  })
}


function fader() {
  dt = $(document).scrollTop()
  $('.navbar-default').css(
    "background-color", "rgba(51,61,71," +  (0.6 + (dt/500)) + ")")
}



function miniMenuButtonListener(){
  var miniButton = $('.nav-mini-button')
  var buttonContainer = $('.button-container')
  miniButton.on('click', function(){
    if (buttonContainer.hasClass('active')){
      buttonContainer.hide().removeClass('active')
      miniButton.css('box-shadow', '')
    }else{
      buttonContainer.show().addClass('active')
      miniButton.css('box-shadow', '0px 0px 10px white')
    }
  })
};


var ready = function() {
  initializeMap()
  startResponsiveSlides()
  $(document).bind('scroll', fader);
};


$(document).ready(ready);
$(window).load(ready)