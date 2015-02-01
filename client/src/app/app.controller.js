(function () {
  'use strict';

  angular
    .module('phonyKik')
    .controller('MainController', MainController);

  /* @ngInject */
  function MainController($scope, $element, $document, $timeout, phonyKikFactory) {
    var vm = this;

    vm.messages = [];
    vm.botIsTyping = false;
    vm.sendMessage = sendMessage;
    vm.onKeyDown = onKeyDown;

    var chatContainer = $document[0].getElementById('chatContainer');

    var DELAY_TIME = 800;

    ////////////////////

    function updateMessages(message) {
      vm.messages.push(message);

      $timeout(function () {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }

    function sendMessage() {
      var message = vm.inputText;

      // http ...
      updateMessages({
        direction: 'outbound',
        message: message
      });

      phonyKikFactory.sendMessage(message)
        .then(function (response) {
          $timeout(pretendBotIsTyping, DELAY_TIME);

          function pretendBotIsTyping() {
            vm.botIsTyping = true;
            $timeout(printMessage, DELAY_TIME);
          }

          function printMessage() {
            vm.botIsTyping = false;
            updateMessages({
              message: response.data.body,
              direction: 'inbound'
            });
          }
        });

      vm.inputText = '';
    }

    function onKeyDown($event) {

      // if enter pressed
      if ($event.keyCode === 13 && vm.inputText.length > 0) {
        sendMessage();
      }
    }
  }
})();
