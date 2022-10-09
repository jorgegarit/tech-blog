const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all post 
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            // comment model
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                } 
            },
            // user model
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
})

// get post by id
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'post_content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found for this id' });
          return;
        }
        res.json(dbPostData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
  });

// create new post 
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

// update excisting post 
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found under this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

// delete post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found under this id' });
          return;
        }
        res.json(dbPostData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
  });
  

  module.exports = router;
