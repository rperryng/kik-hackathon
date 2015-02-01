(function () {
  'use strict';

  angular
    .module('phonyKik')
    .controller('MainController', MainController);

  /* @ngInject */
  function MainController($scope, $element, $document, $timeout, fakeMessages) {
    var vm = this;

    vm.messages = [];
    vm.sendMessage = sendMessage;
    vm.onKeyDown = onKeyDown;

    var chatContainer = $document[0].getElementById('chatContainer');

    activate();

    ////////////////////

    // use hardcoded messages for now.
    function activate() {
      fakeMessages.forEach(function (message) {
        vm.messages.push(message);
      });
    }

    function sendMessage() {
      // http ...
      vm.messages.push({
        direction: 'outbound',
        message: vm.inputText
      });
      onMessagesChanged();

      vm.inputText = '';
    }

    function onMessagesChanged() {
      console.log('wuddup change');
      $timeout(function () {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }

    function onKeyDown($event) {

      // if enter key code
      if ($event.keyCode === 13) {
        sendMessage();
      }
    }
  }
})();
