
var ready;

ready = function() {
  initializeMap()
  startResponsiveSlides()
   $(document).bind('scroll', fader);
   miniMenuButtonListener()
};


$(document).ready(ready);
$(document).on('page:load', ready);


function startResponsiveSlides(){
  $(".rslides").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 1500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pause: true,           // Boolean: Pause on hover, true or false
  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
});
};


var map;

function initializeMap() {

  var mapOptions = {
    center: new google.maps.LatLng(41.2032948,-73.6428233),
    zoom: 12,
    scrollwheel: false,
  };

  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
  setMarkers()
}

function getListingPhoto(id){
  $.ajax({
    type: 'GET',
    url: 'api/photo/' + id
  }).done(function(response){
    console.log(response)
    return response
  })

};


function setMarkers() {
  $.ajax({
    type: 'GET',
    url: 'api/listings'
  }).done(function(response){
    // console.log(response)
    for (var i = 0; i < response.length; i++) {
      var id = response[i].id

      console.log("listing photo: ", getListingPhoto(id))

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





function fader() {
  var navBar = $('.navigation_container')
  dt = $(document).scrollTop()
  $('.navigation_container').css(
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