var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use('/kik', express.static(__dirname + '/client/kik'));
app.use('/resources', express.static(__dirname + '/client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('>> hacking happens on port', port);
});

// mongoose.connect('mongodb://localhost:27017/pizza');
