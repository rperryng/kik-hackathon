(function () {
  'use strict';

  angular
    .module('phonyKik')
    .factory('phonyKikFactory', phonyKikFactory);

  /* @ngInject */
  function phonyKikFactory($http) {

    var factory = {
      sendMessage: sendMessage
    };

    return factory;

    ////////////////////

    function sendMessage(message) {
      return $http.post('/api/chat', {
        body: message,
        from: 'rperryng'
      });
    }
  }
})();
    
