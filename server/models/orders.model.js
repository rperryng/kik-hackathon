var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({

  kikUsername: String,
  fullName: String,
  orderType: Number,
  pizzas: [{
    size: String,
    toppings: [String],
    price: Number
  }],
  created: {
    type: Date,
    default: Date.now
  },
  dueTime: {
    type: Date,
    default: Date.now
  },
  address: String,
  confirmationNum: Number,
  
});

module.exports = mongoose.model('Order', orderSchema);
