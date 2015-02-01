var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({

  kikUsername: String,
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

orderSchema.statics.create = function (body, callback) {
  var order = new this(body);
  order.save(callback);
  return this;
};

// registered under 'orders' collection in db
module.exports = mongoose.model('Order', orderSchema);
