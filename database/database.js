const Sequelize = require('sequelize');

const connection = new Sequelize('spr','root','',{
    host: 'localhost',
    dialect:'mysql'
});

module.exports = connection;