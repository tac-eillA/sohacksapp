//
//  SoHacks App v1.0.0
//  server.js
//
//  Created by Trevor Snodgrass on 8/29/16.
//  Copyright © 2016 Trevor Snodgrass. All rights reserved.
//	Licensed under the General Public License v2 (GPLv2)
//

/**********************************************************
 * 
 * 	SoHack Application
 * 		-- Application web server to handle all data
 * 	processing as well as make database searchable using
 * 	postman
 * ********************************************************/


  /*********************************************************
  * 				Setup
  * ******************************************************/

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var converter = require('json-2-csv');
const crypto = require('crypto');

var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var info = [];
var infoNextID = 1;

var middleware = require('./middleware.js');

var csvtopost = '';

 /*********************************************************
  * 				INITALISATION
  * ******************************************************/

app.use(middleware.logger);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

 /*********************************************************
  * 			JSON TO CSV Conversion Setup
  * ******************************************************/

var json2csvCallback = function (err, csv) {
    if (err) throw err;
    console.log(csv);
    csvtopost = csv;

};

 /*********************************************************
  * 				GET requests
  * ******************************************************/

// GET request /appdata
app.get('/appdata/get/userdata', function (req, res) {
	res.json(info);
});

// GET request /appdata/:id
app.get('/appdata/id/:id', function (req, res) {
	var infoID = parseInt(req.params.id, 10);
	//updated to use underscore
	db.info.findById(infoID).then(function(info) {
		if (!!info) {
			res.json(info.toJSON());
		} else {
			console.log('No entry found');
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).send();
	});

});

// GET request /appdata/lname/:lname
app.get('/appdata/lname/:lname', function (req, res) {
	var infoLastName = req.params.lname
	//updated to use underscore
	
});

// GET request /appdata/email/:email
app.get('/appdata/email/:email', function (req, res) {
	var infoEmail = req.params.email
	//updated to use underscore
	
});

// GET request /appdata/verify/token/:token
app.get('/appdata/verify/token/:token', function (req, res) {
	var infoToken = req.params.token
	//updated to use underscore
	var matchedToken = _.where(info, {token: infoToken});

	if (matchedToken) {
		res.json(matchedToken);
		var index = _.findIndex(info, {token: infoToken});
		if(info[index].verify === false) {
			info[index].verify = true;
			console.log('User: ' + info[index].name + ' has been verified!');
			setTimeout(function () {
				res.json(info[index]);
			}, 1500);
		} else {
			console.log('User already verified');
		}

	} else {
		res.status(404).send();
	}
});

// GET request to export file as a CSV
app.get('/appdata/export/csv', function (req, res) {
	converter.json2csv(info, json2csvCallback);
	res.send(csvtopost);
	res.status(200).send();
});

 /*********************************************************
  * 				POST request
  * ******************************************************/

// POST request /appdata
app.post('/appdata/post', function (req, res) {
	var body = req.body;

	crypto.randomBytes(256, (err, buf) => {
  		if (err) throw err;
  		//console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
  		body.token = buf.toString('hex');
  		body.verify = false;
	});
	
	body.id = infoNextID;
	


	// post to database
	setTimeout(function () {
	db.info.create(body).then(function(info) {
        res.status(200).json(info.toJSON());
    }, function(e) {
    	res.status(400).json(e);
    });
	}, 1000);

	infoNextID++;
});



 /*********************************************************
  * 				DELETE request
  * ******************************************************/

// DELETE request /appdata/id/:id
app.delete('/appdata/id/:id', function (req, res) {
	var infoID = parseInt(req.params.id, 10);
	var matchedID = _.findWhere(info, {id: infoID});

	info = _.without(info, matchedID);
	res.status(200).send();

});

 /*********************************************************
  * 				PUT request
  * ******************************************************/

// PUT request /appdata/id/:id
app.put('/appdata/id/:id', function (res, req) {


});


 /*********************************************************
  * 				Setup port
  * ******************************************************/

  db.sequelize.sync({force: true}).then(function () {
  	app.listen(PORT, function() {
	console.log('Express server started');
	console.log('You are on localhost:' + PORT);
	});
 });

  








