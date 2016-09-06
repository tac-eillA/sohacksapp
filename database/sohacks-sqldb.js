var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/sohacks-sqldb.sqlite'
});

var Info = sequelize.define('info',   {
    name: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    email: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    phonenum: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    address: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    department: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    message: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    teachemail: {type: Sequelize.STRING, allowNull: false},
    emergencyname: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyemail: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyphonenum: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    allergy: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    codeskill: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    shirtsize: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    firsttime: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}}
  });

sequelize.sync().then(function () {
	console.log("Everything is synced!");

    Info.create({

    }).then(function(info) {
        console.log('Added item to database!');
        console.log(info);
    });
});