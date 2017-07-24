const BASE_URL = "http://" + location.hostname + ":8080/";

// Display all images
function imageList(data) {
  for (var i = 0; i < data.length; i++) {
    document.getElementById('imageGallery')
    .innerHTML += ('<li>' + '<img src="' + BASE_URL + 'capstone/pix2pix-tensorflow/test-output/' + data[i].slice(53) + '" alt="processed_portrait">' + '</li>');
  }
};

function loadGallery() {
  $.ajax({
    url:'/gallery',
    type:'GET',
    dataType:'json',
    success:function(data){
      console.log(data.files_sorted_by_time);
      imageList(data.files_sorted_by_time);
    },
    error:function(data){
      debugger;
    }
  });
};

$(document).on({
  ajaxStart: function() { $('body').addClass('loading');   },
  ajaxStop: function() { $('body').removeClass("loading"); }
});

$(document).ready( function() {

  var canvas = new fabric.Canvas('myCanvas',{
    isDrawingMode: true
  });

  canvas.setHeight(300);
  canvas.setWidth(300);

  // Set background color of canvas to white to prevent transparency
  canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));

  var canvasEl = $('#myCanvas');
  var clearEl = $('#clearCanvas');
  var processEl = $('#processCanvas');

  // Loading image gallery
  loadGallery();

  clearEl.click(function(){
    canvas.clear();
    canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));
    $('#processedImage').hide();
    $('#imageGallery').empty();
    loadGallery();
  });

  processEl.click(function(){
    var canvasURL = canvas.toDataURL();

    canvasURL = canvasURL.replace(/^data:image\/(png|jpg);base64,/, "");

    var style = document.getElementById('styleInput').value;

    $.ajax({
      url:'/process',
      type:'POST',
      dataType:'json',
      data:{
        canvasURL: canvasURL,
        style: style
      },
      success:function(data){
        console.log(data.file_name);

        document.getElementById('imageDiv')
        .innerHTML = ('<img src="' + BASE_URL + 'capstone/pix2pix-tensorflow/test-output/' + data.file_name + '" alt="processed_portrait" id="processedImage">');
      },
      error:function(data){
        debugger;
      }
    });

    // Re-loading image gallery to show newly-processed image
    $('#imageGallery').empty();
    loadGallery();

  });
});
