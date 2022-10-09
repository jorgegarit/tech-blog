const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the POst model
class Post extends Model {}

// creating columns and fields for Post model
