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

var app = express();
var PORT = process.env.PORT || 3000;
var info = [];
var infoNextID = 1;

var middleware = require('./middleware.js');

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
};

 /*********************************************************
  * 				GET requests
  * ******************************************************/

// GET request /appdata
app.get('/appdata', function (req, res) {
	res.json(info);
});

// GET request /appdata/:id
app.get('/appdata/id/:id', function (req, res) {
	var infoID = parseInt(req.params.id, 10);
	//updated to use underscore
	var matchedID = _.findWhere(info, {id: infoID});

	if (matchedID) {
		res.json(matchedID);
	} else {
		res.status(404).send();
	}
});

// GET request /appdata/lname/:lname
app.get('/appdata/lname/:lname', function (req, res) {
	var infoLastName = req.params.lname
	//updated to use underscore
	var matchedLastName = _.where(info, {lastname: infoLastName});

	if (matchedLastName) {
		res.json(matchedLastName);
	} else {
		res.status(404).send();
	}
});

// GET request /appdata/email/:email
app.get('/appdata/email/:email', function (req, res) {
	var infoEmail = req.params.email
	//updated to use underscore
	var matchedEmail = _.where(info, {email: infoEmail});

	if (matchedEmail) {
		res.json(matchedEmail);
	} else {
		res.status(404).send();
	}
});

// GET request to export file as a CSV
app.get('/appdata/export/csv', function (req, res) {
	converter.json2csv(info, json2csvCallback);
	res.status(200).send();
});

 /*********************************************************
  * 				POST request
  * ******************************************************/

// POST request /appdata
app.post('/appdata', function (req, res) {
	var body = req.body;
	
	body.id = infoNextID;
	info.push(body);

	res.json(body);
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
	var body = _.pick(req.body, 'description', 'grade');
	var validAttributes = {};

	if(body.hasOwnProperty('description')) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		// Things went wrong
		return res.status(400).send();
	} else {
		// Never provided attribute, no problem
	}

});


 /*********************************************************
  * 				Setup port
  * ******************************************************/

app.listen(PORT, function() {
	console.log('Express server started');
	console.log('You are on localhost:' + PORT);
});