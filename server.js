var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');

var app = express();

app.use('/kik', express.static(__dirname + '/client/kik'));
app.use('/resources', express.static(__dirname + '/client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the mongodb 
// mongoose.connect('mongodb://localhost:27017/pizza_bot');
// initialize session storage
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api', require('./server/routes'));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('>> hacking happens on port', port);
});
