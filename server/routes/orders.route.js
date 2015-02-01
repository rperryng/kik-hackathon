var express = require('express');
var orderApp = module.exports = express();

var Orders = require('../models/orders.model');

orderApp.get('/orders', function (req, res, next) {
  Orders.find(req.query, function (err, orders) {
    if (err) throw err;
    res.json(orders);
  });
});

orderApp.post('/orders', function (req, res, next) {
  Orders.create(req.body, function (err, result) {
    if (err) throw err;
    res.sendStatus(200);
  });
});

orderApp.get('/orders/:order_id', function (req, res, next) {
  var orderID = req.params.order_id;
  Orders.findById(orderID, function (err, order) {
    if (err) throw err;
    res.json(order);
  });
});
