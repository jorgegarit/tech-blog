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

// find specific user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at'] 
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user was found with this id'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});
