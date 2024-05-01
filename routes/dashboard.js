const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/post-count', async (req, res) => {
  try {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });
    res.json({ active: activeCount, inactive: inactiveCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
