const { Model, DataTypes} = require('sequelize');

// bcrypt to encrypt passwordc hashing
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create the User model
class User extends Model {
    // set up method to check password (per user)
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}