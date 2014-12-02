var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

app.set('title', 'Pocket Calculator')
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.status(200).sendFile('index.html', { root: __dirname + '/public/'});
});

app.post('/api/calculate', jsonParser, function(req, res) {
  var calculation = req.body.calc;
  var responseBody = {};
  responseBody.result = eval(calculation);
  res.send(responseBody);
})


var server = app.listen(8080);
console.log(app.get('title') + ' now listening on port 8080');
