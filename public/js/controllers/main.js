var app = angular.module('ngCalculator');

app.controller('mainCtrl', function($scope, $http, $timeout, Key, Calc){

  $scope.inputString = '0';// Current user input
  $scope.currentOperator = ''; // Current operator
  var calculationString = ''; // String of numbers and operators to be calculated
  var currentInput = false;
  var currentDecimal = false;

  // Input from on-screen keys
  $scope.buttonPress = function(input, type) {
    type = type || 'number';
    updateCurrentInput({type: type, char: input});
  }

  // Input from keyboard
  $scope.keyPress = function(e) {

    var userInput = Key.getCharacter(e);

    if ( !userInput.type ) { return; }

      if ( userInput.type === 'calculate' ) {
        $scope.calculate();
      } else {
        updateCurrentInput(userInput);
      }
    }


    var updateCurrentInput = function(input) {

      if ( input.type === 'operator' ) {
        $scope.inputString += input.char;
        calculationString += $scope.inputString;
        $scope.currentOperator = input.char;
        resetInput();
      } else if ( input.type === 'decimal' ) {
        if ( !currentDecimal ) {
          $scope.inputString += input.char;
          currentDecimal = true;
          currentInput = true;
        }
      } else {
        if ( !currentInput ) {
          if ( input.char !== '0' ) {
            $scope.inputString = input.char;
            currentInput = true;
          }
        } else {
          $scope.inputString += input.char;
        }
      }
    }

    $scope.clear = function() {
      resetInput();
      resetOperator();
      calculationString = '';
    }

    function resetInput() {
      $scope.inputString = '0';
      currentInput = false;
      currentDecimal = false;
    }

    function resetOperator(){
      $scope.currentOperator = '';
    }

    function showResult(result) {
      $scope.inputString = result;
      calculationString = '';
      $scope.currentOperator = '';
      currentDecimal = false;
    }


    $scope.calculate = function() {

      if ( !currentInput ) { return; }

        calculationString += $scope.inputString;

        Calc.calculate(calculationString).
        success(function(data){
          result = data.result;
          showResult(result);
        }).
        error(function(data) {
          console.log('Error: ' + data);
          displayError();
        })
      }

      function displayError(){
        $scope.inputString = 'Error';

        $timeout(function(){
          $scope.inputString = 0;
        }, 500)
      }

    });
