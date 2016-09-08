module.exports = function (sequelize, DataTypes) {
	return sequelize.define('info', {
    name: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    email: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    phonenum: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    bday: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    age: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    gender: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    address: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    department: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    affilitation: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    teachemail: {type: DataTypes.STRING, allowNull: false},
    emergencyname: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyemail: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    emergencyphonenum: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    allergy: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    codeskill: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    shirtsize: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    firsttime: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    helpwith: {type: DataTypes.STRING},
    skills: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    token2: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    verify: {type: DataTypes.BOOLEAN, allowNull: false, validate: {notEmpty: true}}
  });
};