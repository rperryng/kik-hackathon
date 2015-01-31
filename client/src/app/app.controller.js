(function () {
  'use strict';

  angular
    .module('phonyKik')
    .controller('MainController', MainController);

  /* @ngInject */
  function MainController(fakeMessages) {
    var vm = this;

    vm.messages = [];
    vm.sendMessage = sendMessage;

    activate();

    ////////////////////

    // use hardcoded messages for now.
    function activate() {
      fakeMessages.forEach(function (message) {
        vm.messages.push(message);
      });
    }

    function sendMessage(message) {
      // http ...
      vm.messages.push({
        direction: 'outbound',
        message: message
      });

      vm.inputText = '';
    }
  }
})();
    
