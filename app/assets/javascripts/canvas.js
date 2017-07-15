const BASE_URL = "http://ec2-52-37-46-181.us-west-2.compute.amazonaws.com:8080/";


$(document).ready( function() {
  var canvas = new fabric.Canvas('myCanvas',{
    isDrawingMode: true
  });

  canvas.setHeight(300);
  canvas.setWidth(300);

  // Set background color of canvas to white to prevent transparency
  canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));

  var canvasEl = document.getElementById('myCanvas');
  var clearEl = document.getElementById('clearCanvas');
  var processEl = document.getElementById('processCanvas');

  clearEl.onclick = function(){ canvas.clear() };

  processEl.onclick = function(){
    var canvasURL = canvas.toDataURL();

    canvasURL = canvasURL.replace(/^data:image\/(png|jpg);base64,/, "");

    $.ajax({
      url:'/process',
      type:'POST',
      dataType:'json',
      data:{
        canvasURL: canvasURL,
        style: "insert style"
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


  }
});
