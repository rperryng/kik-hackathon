var express   = require('express');
var chatApp   = module.exports = express();
var response  = require('../utils/response').generate;
var robot     = require('../utils/robot');

chatApp.post('/chat', function (req, res, next) {
  var message = req.body;
  var replyString;

  if (req.session.state === undefined) {
    req.session.state = 0;
    req.session.pizzas = [];
  } else if (req.session.state == 99) {
    session.destroy();
  } else {
    if (!robot(message.body, req.session)) {
      replyString = "Sorry! I'm not too smart yet. English is hard for someone that natively speaks binary.\nPlease try again! :(";
    }
  }

  replyString = replyString || response(req.session);

  res.json({
    type: "text",
    to: message.from,
    body: replyString
  });
});

chatApp.get('/chat', function (req, res) {
  
});
