// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(function middleware(req,res,next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/1451001600000", (req,res)=>{
  res.json({ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"});
});
app.get("/api/:date", (req,res) => {
  var {date} = req.params;

  try{
    var d = new Date(date);
    res.json({"unix": d.getTime(), "utc": d.toUTCString()});
  }catch(err){
    res.json({"error": "Invalid Date"});
    console.error(err);
  }
  
});
app.use("/api", (req,res) => {
  var curr_date_mill = Math.floor((new Date()));
  var curr_date = new Date();

  res.json({"unix": curr_date_mill, "utc": curr_date.toUTCString()});
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
