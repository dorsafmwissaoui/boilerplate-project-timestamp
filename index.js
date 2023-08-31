// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice Endpoint
app.get("/api/:date", function(req, res) {
  const inputDate = req.params.date;
  let dateObject;
  // Check if the input date is in Unix timestamp format (consisting of digits)
  if (/^\d+$/.test(inputDate)) {
    dateObject = new Date(parseInt(inputDate)); // Convert Unix timestamp to a Date object
  } else {
    dateObject = new Date(inputDate); // Parse the input date using Date constructor
  }

  // Check if the dateObject is a valid Date
  if (isNaN(dateObject.getTime())) {
    res.json({ error: "Invalid date" }); // Return an error JSON response
  } else {
    res.json({
      unix: dateObject.getTime(), // Return the Unix timestamp equivalent of the date
      utc: dateObject.toUTCString() // Return the UTC date string
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
