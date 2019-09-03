//  TechiePoint 2.0 - OpenShift - Ejemplo 1 - Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var ipadd   = require('ip');
 
app.set('view engine', 'ejs');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip    = ipadd.address();
var name = process.env.MYNAME;

app.get('/', function (req, res) {
  res.status(200).send("Success!");
});

app.get('/home', function (req, res) {
  res.render('index', {port: port, ip: ip});
});

app.get('/name', function(req, res) {
  res.send('{ Hola: ' + name + ' }');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Opppppsss.... parece que ha pasado algo!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
