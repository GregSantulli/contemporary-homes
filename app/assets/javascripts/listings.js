

var individualMap;

function initializeIndividualMap(response) {
  var styles = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#76aee3"},{"saturation":38},{"lightness":-11},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#8dc749"},{"saturation":-47},{"lightness":-17},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#c6e3a4"},{"saturation":17},{"lightness":-2},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#cccccc"},{"saturation":-100},{"lightness":13},{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"hue":"#5f5855"},{"saturation":6},{"lightness":-31},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[]}]
  var mapOptions = {
    center: new google.maps.LatLng(response.latitude, response.longitude),
    zoom: 15,
    scrollwheel: false,
    styles: styles,
  };
  individualMap = new google.maps.Map(document.getElementById('listing-map-container'), mapOptions);
}


function getListingData(){
  var listingId = $('.navbar-brand').attr('id')
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
      icon: '/assets/house112.svg'
    });
    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.open(individualMap,this);
    });
  };
};



function handleFileSelect(e) {
  if(!e.target.files) return;
  var selectedFiles = e.target.files
  var filesArray = Array.prototype.slice.call(selectedFiles)
  filesArray.forEach(function (f) {
    if(!f.type.match("image.*")) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var image =  e.target.result
      var context = {file: f, name: f.name, size: ((f.size)/1000).toFixed(2), image: image};
      var html = $('#image_preview_template').html();
      var templatingFunction = Handlebars.compile(html);
      $('.image-uploader').append(templatingFunction(context));
    }
    reader.readAsDataURL(f);
  });
}


function imageListener(){
  $("#imgInp").on('change', handleFileSelect)
}

function fader() {
  dt = $(document).scrollTop()
  $('.navbar-default').css(
    "background-color", "rgba(51,61,71," +  (0.6 + (dt/500)) + ")")
}


var listings;
listings = function() {
  getListingData();
  imageListener();
};



$(document).ready(listings);
$(document).on('page:load', listings);
$(document).on('page:load', handleFileSelect)
