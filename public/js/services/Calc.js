angular.module('ngCalculator')
  .service('Calc', function($http) {

  var apiEndpoint = '/api/calculate'

  this.calculate = function(input){
    var apiEndpoint = '/api/calculate'
    var requestBody = {};
    requestBody.calc = input;

    return $http.post(apiEndpoint, requestBody);
  }

});
