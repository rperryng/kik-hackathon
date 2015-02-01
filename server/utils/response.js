module.exports =  {

  generate: function (session) {
    if ([2, 3, 4].indexOf(session.state) != -1) {
      var strings = responses[session.state].split('_');
      var offest = (session.state == 2); 
      return strings[0] + (session.pizzas.length + offest) + strings[1];
    } else if (session.state == 5) {
      // get orders
    } else if (session.state == 9) {
      // summary of order
    }
    return responses[session.state];
  }
}; 

var responses = [
  // State 0
  "Hey there! I'm the Pixel Perfect Pizzabot!\n"
  + "To order a new pizza, reply with 'new'\n"
  + "To place a previous order, reply with 'previous'.",
  // State 1
  "Awesome! How many pizzas would you like?",
  // State 2
  "What size do you want for pizza _? (small|medium|large)",
  // State 3
  "Would you like a cheese, pepperoni, hawaiian or custom pizza for pizza _?",
  // State 4
  "What toppings would you like to add to pizza _? Btw, cheese is already included!",
  // State 5
  "Here is a list of your past 3 orders ",
  // State 6
  "Reply 'pickup' to pick up in store or 'delivery' if you want the pizza delivered to you!",
  // State 7
  "Reply with the full address you would like the pizza delivered to :)",
  // State 8
  "Reply with 'now' if you want the pizza made right away (30 min wait).\n"
  + "Otherwise, reply with a time you would like the pizza delivered/ready by.",
  // State 9
  "Here's the order I've prepared for you! _\nShould I place the order?",
  // State 10
  "Awesome! Master pizza makers are now in the process of making you the perfect pizza!\n"
  + "Your order confirmation number is _."
];
