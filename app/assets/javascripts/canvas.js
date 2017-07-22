const BASE_URL = "http://" + location.hostname + ":8080/";

function loadGallery() {
  $.ajax({
    url:'/gallery',
    type:'GET',
    dataType:'json',
    success:function(data){
      console.log(data.files_sorted_by_time);

      // Display all images
      for (var i = 0; i < data.length; i++) {
        document.getElementById('imageGallery')
        .innerHTML = ('<img src="' + BASE_URL + 'capstone/pix2pix-tensorflow/test-output/' + data[i] + '" alt="processed_portrait">');
      }

    },
    error:function(data){
      debugger;
    }
  });
}

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

  // AJAX call
  // $.ajax({
  //   //This will retrieve the contents of the folder if the folder is configured as 'browsable'
  //   url: '/gallery',
  //   success: function (data) {
  //     //List all .png file names in the page
  //     $(data).find("a:contains(" + fileextension + ")").each(function () {
  //       var filename = this.href.replace(window.location.host, "").replace("http://", "");
  //       $("body").append("<img src='" + BASE_URL + 'capstone/pix2pix-tensorflow/test-output/' + filename + "'>");
  //     });
  //
  //     // console.log(data);
  //   }
  // });

  clearEl.click(function(){
    canvas.clear();
    canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));
    $('img').hide();
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
        .innerHTML = ('<img src="' + BASE_URL + 'capstone/pix2pix-tensorflow/test-output/' + data.file_name + '" alt="processed_portrait">');
      },
      error:function(data){
        debugger;
      }
    });


  });
});
