//  TechiePoint 2.0 - OpenShift - Ejemplo 2 - Node application
var express = require('express');
	app     = express(),
	mongoose = require('mongoose'),
	requests = require('./models/requests'),
	origin = process.env.MYORIGIN || 'TechiePoint',
	userDB = process.env.MONGODB_USER
	passDB = process.env.MONGODB_PASSWORD
	ipDB = process.env.MONGODB_SERVICE
	portDB = process.env.MONGODB_PORT
	nameDB = process.env.MONGODB_DATABASE
	connectionString = 'mongodb://' + userDB + ':' + passDB + '@' + ipDB + ':' + portDB + '/' + nameDB;

mongoose.connect(connectionString, function (error) {
  if (error) {
    console.log(error);
  }
  else {
    app.listen(8080, () => {
      console.log('listening on 8080')
    })
  }
});

app.get('/', function (req, res) {
	data = { "origin" : origin, "fecha" : Date.now() };
	var rqst = new requests(data);
	rqst.save(function (err, data){
		if (err) throw err;
          res.json(data);
    });
});

app.get('/count', function(req, res) {
  requests.count({}, function(err, count) {
    if (err) throw err;
    res.json({"Cantidad: ": count});
  });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Opppppsss.... parece que ha pasado algo!');
});

