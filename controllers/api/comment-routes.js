const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

//  post a comment
router.post('/', withAuth, (req, res) => {
    // check the session to verify user logged in
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    }
})

// delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found under this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;