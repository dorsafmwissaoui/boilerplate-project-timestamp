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


// New route to handle timestamp requests
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // If date is empty or undefined, use the current time
  if (!date) {
    date = new Date();
  } else {
    // Check if the input date is a valid timestamp (numeric)
    //isNaN(date): This function checks if the date variable is not a numeric value. If it returns true, it means date is not a valid numeric value, suggesting that it might be a date string.
    //In this case, the code attempts to create a JavaScript Date object from the date string using new Date(date).
    //However, there's another check involved here. Before creating the Date object, it converts the date string into a numeric timestamp by using parseInt(date). This step is essential because sometimes the date might be provided as a string that can be parsed into a numeric timestamp.
    if (!isNaN(date)) {
      date = new Date(parseInt(date));
    } else {
      // Attempt to parse the input date as a date string
      date = new Date(date);
    }
  }

  // Check if the input date is valid
  //date.getTime(): This method is called on the date object to retrieve the timestamp in milliseconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). If date is a valid Date object, this will return a numeric timestamp.isNaN(date.getTime()): This checks if the timestamp obtained from date is not a valid numeric value. If date is a valid Date object, date.getTime() will return a numeric timestamp, and isNaN will return false, indicating that the timestamp is valid.If isNaN(date.getTime()) returns false, it means that date is a valid Date object, and its timestamp is also valid. Therefore, the code inside the if block is executed.
  if (!isNaN(date.getTime())) {
    // Format the output in the specified format
    const response = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
    res.json(response);
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});