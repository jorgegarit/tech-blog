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

// creating columns and fields for User model

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //this means that every user most have a unique email
            validate: {
                isEmail: true //will validate that it is in email format "blank@blank.com"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8] //password must be atleast 8 characters
            }
        }
    },
    {
        hooks: {
            // set up the hook functionality before password is created
            async beforeUserCreated(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },

            async beforeUserUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;