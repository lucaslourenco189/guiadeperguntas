const Sequelize = require('sequelize');

const connection = new Sequelize('DatabaseName','User','Pass',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
