var express = require('express');
var app = express();

app.use(express.static('src'));
var server = app.listen(5000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('RoomServer started');
}
