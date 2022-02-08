// implement your posts router here
const Post = require('./posts-model');
const router = require('express').Router();

router.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        message: "The posts information could not be retrieved"
      });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "The post information could not be retrieved"
      });
    });
});


router.post('/', (req, res) => {
  const { body } = req;
  if (!body.title || !body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    });
  } else {
    Post.insert(body)
      .then(newPost => {
        res.status(201).json(newPost);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database"
        });
      });
  }
});

module.exports = router;