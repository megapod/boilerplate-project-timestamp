// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res, next) {
  // let dateString = req.params.date
  // console.log(req.params.date)
    // internal var for tests on time recived
  let timeRecived = req.params.date
  
  if (req.params.date == undefined) {
    // console.log('yes')
    const time =  new Date()
    const utcTime = time.toUTCString()
    const unixTime = Date.parse(utcTime)
    // console.log({unix: unixTime, utc: utcTime})
    res.json({unix: unixTime, utc: utcTime})   
    next()
  }
  
  // check if we got a string or a 13 digits number string
  else if (req.params.date.length == 13) {
    timeRecived = +req.params.date
  }
  
  // time string to time object
  const timeRecivedAsTimeObject = new Date(timeRecived)
  
  // if not a valid date return { error : "Invalid Date" }
  if (new Date(timeRecived).toString() === "Invalid Date") {
    res.json({ error : "Invalid Date" });
  } else {
    // get utc time
    const utcTime = timeRecivedAsTimeObject.toUTCString()
    
    // get unix time stamps format
    const unixTime = Date.parse(timeRecivedAsTimeObject)
  
    // return output
    res.json({"unix": unixTime, "utc": utcTime})
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
