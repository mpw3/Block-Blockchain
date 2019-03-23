var socket = io();

function runBlockchain() {
  document.getElementById('blockchain').innerHTML = "";
  socket.emit('blockchain', 1);
}

socket.on('displayBlockchain', function(blockchain){
    $('#blockchain').append( "<p>" + blockchain + "</p>" );
});

