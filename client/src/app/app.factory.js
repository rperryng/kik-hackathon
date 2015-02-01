(function () {
  'use strict';

  angular
    .module('phonyKik')
    .factory('phonyKikFactory', phonyKikFactory);

  /* @ngInject */
  function phonyKikFactory($http) {
    var factory = {
      api: api
    };

    return factory;

    ////////////////////

    function sendMessage() {
      
    }
  }
})();
    
