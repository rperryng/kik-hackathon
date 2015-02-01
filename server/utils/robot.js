var robot = module.exports = function (message, session) {

  switch (session.state) {
    case 0: // new order or previous order?
      if (/\bn+e+w/i.test(message)) {
        session.state = 1;
      } else if (/prev|last|redo/i.test(message)) {
        session.state = 5;
      } else {
        return false; // do not understand input
      }
      break;
    case 1: // number of pizzas?
      if (/\b\d+\b/i.test(message)) {
        session.numPizzas = /\b\d+\b/i.exec(message)[0];
        session.state = 2;
      } else {
        return false;
      }
      break;
    case 2: // size of pizza?
      var size;
      if (/\bsmall|^s$|^sm$/i.test(message)) {
        size = 'small';
      } else if (/\bm\b|\bmed/i.test(message)) {
        size = 'medium';
      } else if (/\blarge|^l$|^lg$/i.test(message)) {
        size = 'large';
      }

      if (size === undefined) {
        return false;
      }
      session.state = 3;
      session.pizzas.push({
        size: size
      });
      break;
    case 3: // type of pizza
      if (session.pizzas.length == session.numPizzas) {
        session.state = 6;
      } else if (session.pizzas.length < session.numPizzas) {
        session.state = 2;
      }

      if (/ch/i.test(message)) {
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese'];
      } else if (/pep/i.test(message)) {
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese', 'pepperoni'];
      } else if (/hawa/i.test(message)) {
        session.pizzas[session.pizzas.length - 1].toppings = ['cheese', 'ham', 'pineapple', 'bacon'];
      } else if (/custom/i.test(message)) {
        //custom pizza
        session.state = 4;
      } else {
        return false;
      }
      break;
    case 4: // custom toppings
      if (session.pizzas.length == session.numPizzas) {
        session.state = 6;
      } else if (session.pizzas.length < session.numPizzas) {
        session.state = 2;
      }

      session.pizzas[session.pizzas.length - 1].toppings = ['cheese'];

      var regexpTopics = {
        '\bpepp?ero\b': 'pepperoni',
        '\bbaco': 'bacon',
        '\bbeef': 'beef',
        '\bsteak': 'steak',
        '\bpepp?er': 'peppers',
        '\bolive': 'olive',
        '\bancho': 'anchovies',
        '\bmush': 'mushrooms',
        '\bsaus': 'sausage',
        '\bpinn?(a|e)pele|pinea': 'pineapple',
        '\bchick': 'chicken'
      };

      Object.keys(regexpTopics).forEach(function(key) {
        var regexp = new RegExp(key, 'i');
        if (regexp.test(message)) {
          session.pizzas[session.pizzas.length - 1].toppings.push(regexpTopics[key]);
        }
      });
      break;
    case 5: // choose 1/3 previous or go back to new order
      if (/\bne+w/i.test(message)) {
        session.state = 1;
      } else if (message >= 1 && message <= 3) {
        session.pizzas = session.previousOrders[message - 1].pizzas;
        session.state = 6;
      } else {
        return false;
      }
      break;
    case 6: // pickup (1) or delivery (2)?
      if (/pick|take/i.test(message)) {
        session.orderType = 1;
        session.state = 8;
      } else if (/\bdeliv/i.test(message)) {
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
      if (/\^y$|\by[aeiu]\w{1,4}\b/i.test(message)) {
        session.state = 10;
      } else if (/\^n$|\bno*[aeiou]\w{1,4}\b/i.test(message)) {
        session.state = 99;
      } else {
        return false;
      }
      break;
  }
  return true;
};
