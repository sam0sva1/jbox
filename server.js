var express = require('express');
var app = new express();
var port = 3000;

app.use(express.static('./src'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s.", port);
  }
});