const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');

// Create a post
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      createdBy: req.user._id,
      location: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] }
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/nearby', async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const posts = await Post.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: 10000
          }
        }
      });
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
