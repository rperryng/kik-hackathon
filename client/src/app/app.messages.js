(function () {
  'use strict';

  angular
    .module('phonyKik')
    .value('fakeMessages', [{
      direction: 'outbound',
      message: 'Hey PPPP, I really want to eat a pizza.  Can you help a brother out?'
    }, {
      direction: 'inbound',
      message: 'Hello there! I can order a pizza for you.  If you require a list of instructions just ask (type -h for a list of instructions'
    }, {
      direction: 'outbound',
      message: 'fwaehfahiudfhauiwf'
    }, {
      direction: 'outbound',
      message: 'aofweafisdf'
    }, {
      direction: 'inbound',
      message: 'asdfkawehf'
    }]);
})();
