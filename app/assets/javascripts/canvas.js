
$(document).ready( function() {
  var canvas = new fabric.Canvas('myCanvas',{
    isDrawingMode: true
  });

  var canvasEl = document.getElementById('myCanvas');
  var clearEl = document.getElementById('clearCanvas');
  var processEl = document.getElementById('processCanvas');

  clearEl.onclick = function(){ canvas.clear() };

  processEl.onclick = function(){
    var canvasURL = canvas.toDataURL();
    canvasURL = canvasURL.replace(/^data:image\/(png|jpg);base64,/, "");
    console.log(canvasURL);

    canvas.setBackgroundColor('rgba(255,255,255, 0.6)', canvas.renderAll.bind(canvas));

    $.ajax({
      url:'/process',
      type:'POST',
      dataType:'json',
      data:{
        canvasURL: canvasURL,
        style: "insert portrait style",
      },
      success:function(data){
        alert("Processed!");
      },
      error:function(data){
        debugger;
      }
    });


  }
});
