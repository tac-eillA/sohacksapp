module.exports = function (sequelize, DataTypes) {
	return sequelize.define('info',   {
    name: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    email: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    phonenum: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    address: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    department: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    message: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    teachemail: {type: DataTypes.STRING, allowNull: false},
    emergencyname: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyemail: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyphonenum: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    allergy: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    codeskill: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    shirtsize: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    firsttime: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}}
  });
};