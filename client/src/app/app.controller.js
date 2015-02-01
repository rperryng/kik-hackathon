(function () {
  'use strict';

  angular
    .module('phonyKik')
    .controller('MainController', MainController);

  /* @ngInject */
  function MainController($scope, $element, $document, $timeout, phonyKikFactory) {
    var vm = this;

    vm.messages = [];
    vm.sendMessage = sendMessage;
    vm.onKeyDown = onKeyDown;

    var chatContainer = $document[0].getElementById('chatContainer');

    ////////////////////

    function sendMessage() {
      var message = vm.inputText;

      // http ...
      vm.messages.push({
        direction: 'outbound',
        message: message
      });
      onMessagesChanged();

      phonyKikFactory.sendMessage(message)
        .then(function (response) {
          vm.messages.push({
            message: response.data.body,
            direction: 'inbound'
          });
        });

      vm.inputText = '';
    }

    function onMessagesChanged() {
      $timeout(function () {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }

    function onKeyDown($event) {

      // if enter pressed
      if ($event.keyCode === 13) {
        sendMessage();
      }
    }
  }
})();
