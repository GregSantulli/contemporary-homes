

var individualMap;

function initializeIndividualMap(response) {



  var mapOptions = {
    center: new google.maps.LatLng(response.latitude, response.longitude),
    zoom: 15,
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



// function createButtonListener(){
//   $('.form-horizontal').on('submit', function(e){
//     e.preventDefault()
//     var formData = $(this).serialize()
//     $.ajax({
//       type:'POST',
//       url: '/listings',
//       data: formData
//       }).done(function(response){
//         var context = {error: response[0]};
//         var html = $('#error_template').html();
//         var templatingFunction = Handlebars.compile(html);
//         $('.errors').html(templatingFunction(context))
//       })
//   })
// };




function imageListener(){
  $("#imgInp").on('change', handleFileSelect)
}

var listings;
listings = function() {
  getListingData();
  imageListener();

};

$(document).ready(listings);
$(document).on('page:load', listings);
$(document).on('page:load', handleFileSelect)

