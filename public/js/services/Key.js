// Interpret user keyboard input and return object

angular.module('ngCalculator')
.service('Key', function() {

  this.getCharacter = function(e) {
    result = {};
    result.type = '';
    result.char = '';

    var code = e.keyCode;
    var shift = e.shiftKey;

    if ( shift ) {
      if ( code === 56 ) {
        result.type = 'operator';
        result.char = '*';
      } else if ( code === 187 ) {
        result.type = 'operator';
        result.char = '+';
      }
    } else if ( code === 189 ) {
      result.type = 'operator';
      result.char = '-';
    } else if ( code === 191) {
      result.type = 'operator';
      result.char = '/';
    } else if ( code === 187 || code === 13 ) {
      result.type = 'calculate';
    } else if ( code >= 48 && code <= 57 ) {
      result.type = 'number';
      result.char = (code - 48).toString();
    } else if ( code >= 96 && code <= 105 ) {
      result.type = 'number';
      result.char = ( code-96 ).toString();
    } else if ( code === 190 ) {
      result.type = 'decimal';
      result.char = '.';
    } else {
      result.type = null;
    }

    return result;
  }

});
