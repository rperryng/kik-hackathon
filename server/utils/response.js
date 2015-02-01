module.exports =  {

  generate: function (session) {
    if ([2, 3, 4].indexOf(session.state) != -1) {
      var strings = responses[session.state].split('_');
      var offest = (session.state == 2); 
      return strings[0] + (session.pizzas.length + offest) + strings[1];
    } else if (session.state == 5) {
      // get orders
    } else if (session.state == 9) {
      var strings =responses[session.state].split('_');
      return strings[0] + '\n'
        + "Type: " + (session.orderType - 1 ? "Delivery": "Pickup")  + '.\n'
        + listPizzas(session)
        + listAddress(session)
        + strings[1];
    }
    return responses[session.state];
  }
}; 

function listPizzas (session) {
  var pizzaList = "";
  for ( var i = 0; i < session.pizzas.length; i++){
    pizzaList += i+1 +". " + session.pizzas[i].size + " (" + session.pizzas[i].toppings.join(', ') + ").\n"
  }
  return pizzaList;
}

function listAddress (session) {
  return (session.orderType == 2) ? "Address: " + session.address + '.\n': "";
}

var responses = [
  // State 0
  "Hey there! I'm the Pixel Perfect Pizzabot!\n"
  + "You can create a new order, or see a list of your previous orders!",
  // State 1
  "Awesome! How many pizzas would you like?",
  // State 2
  "Got it! What size do you want pizza _ to be?",
  // State 3
  "Okay, would you like a cheese, pepperoni, hawaiian or custom pizza for pizza _?",
  // State 4
  "What toppings would you like to add to pizza _? Btw, cheese is already included!",
  // State 5
  "Here is a list of your past 3 orders ",
  // State 6
  "Do you want to pickup the pizza or have it delivered?",
  // State 7
  "Reply with the full address you would like the pizza delivered to :)",
  // State 8
  "Reply with 'now' if you want the pizza made right away (30 min wait).\n"
  + "Otherwise, reply with a time you would like the pizza delivered/ready by.",
  // State 9
  "Here's the order I've prepared for you! _\nShould I place the order?",
  // State 10
  "Awesome! Master pizza makers are now in the process of making you the perfect pizza!\n"
];
