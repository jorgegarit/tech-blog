const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// find all users
router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});
