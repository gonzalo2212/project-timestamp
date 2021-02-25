// server.js
// where your node app starts

// init project

var express = require('express');

var app = express();

require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp endopoints
app.get("/api/timestamp/:time?", getFormatedTime, function (req, res) {
  // Date Validation
  if (req.time != "Invalid Date") {
    var resp = { unix: req.ms, utc: req.time };
  } else {
    var resp = { error: req.time };
  }
  res.json(resp);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Format time passed in the request
function getFormatedTime(req, res, next) {
  let time = new Date();
  if (/^\d+$/.test(req.params.time)) {
    time = new Date(Number.parseInt(req.params.time));
  } else if (req.params.time) {
    time = new Date(Date.parse(req.params.time));
  }
  req.time = time.toGMTString();
  req.ms = Date.parse(time);
  next();
}