const Sequelize = require('sequelize');

const connection = new Sequelize('tecgas78_perguntas','tecgas78_perguntas','93255956as',{
    host: '31.170.163.230',
    dialect: 'mysql'
});

module.exports = connection;