var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/database/dev-info-api.sqlite'
});

var db = {};

db.info = sequelize.import(__dirname + '/models/info.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;