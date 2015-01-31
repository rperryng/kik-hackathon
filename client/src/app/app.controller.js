(function () {
  'use strict';

  angular
    .module('phonyKik')
    .controller('MainController', MainController);

  /* @ngInject */
  function MainController(fakeMessages) {
    var vm = this;

    vm.messages = [];

    activate();

    ////////////////////

    // use hardcoded messages for now.
    function activate() {
      fakeMessages.forEach(function (message) {
        vm.messages.push(message);
      });
    }
  }
})();
    
