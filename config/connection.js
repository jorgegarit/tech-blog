// imports constructor for sequelize
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

// if statement for when I deploy to heroku to use heroku jaws database
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exoorts = sequelize;