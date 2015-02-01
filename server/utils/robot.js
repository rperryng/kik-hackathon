var robot = module.exports = function (message, session) {
  
  switch(session.state){
    case 0: // new order or previous order?
      if (message == 'new'){
        session.state = 1;
      } else if (message == 'previous'){
        session.state = 5;
      } else {
        return false; // do not understand input
      }
    break;
    case 1: // number of pizzas?
      if (Number(message) >= 1){
        session.numPizzas = message;
        session.state = 2;
      } else {
        return false;
      }
    break;
    case 2: // size of pizza?
      if (message == 'small' || message == 'medium' || message == 'large'){
        session.pizzas.push({size: message});
        session.state = 3;
      } else {
        return false;
      }
    break;
    case 3: // type of pizza
      if(session.pizzas.length == session.numPizzas){
        session.state = 6;
      } else if (session.pizzas.length < session.numPizzas){
        session.state = 2;
      }

      if (message == 'cheese'){
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese'];
      } else if (message == 'pepperoni'){
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese', 'pepperoni'];
      }
      else if (message == 'hawaiian'){
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese', 'ham', 'pineapple', 'bacon'];
      }
      else if (message == 'custom'){
        //custom pizza
        session.state = 4;
      } else {
        return false;
      }
    break;
    case 4: // custom toppings
      if(session.pizzas.length == session.numPizzas){
        session.state = 6;
      } else if (session.pizzas.length < session.numPizzas){
        session.state = 2;
      }

      session.pizzas[session.pizzas.length-1].toppings = message.split(',');
      session.pizzas[session.pizzas.length-1].toppings.push('cheese');
      break;
    case 5: // choose 1/3 previous or go back to new order
      if (message == 'new'){
        session.state = 1;
      } else if (message >= 1 && message <= 3) { 
        session.pizzas = session.previousOrders[message - 1].pizzas;
        session.state = 6; 
      } else {
        return false;
      }
    break;
    case 6: // pickup (1) or delivery (2)?
      if (message == 'pickup') {
        session.orderType = 1;
        session.state = 8; 
      } else if(message == 'delivery') {
        session.orderType = 2;
        session.state = 7;
      } else {
        return false;
      }
    break;
    case 7: // address
      session.address = message;
      session.state = 8;
    break;
    case 8: // time?
      session.dueTime = message;
      session.state = 9;
    break;
    case 9: //summary and confirm
      if(message == 'yes') {
        session.state = 10;
      } else if (message == 'no') {
        session.state = 99;
      } else {
        return false;
      }
    break;
  }
  return true;
};
