const express = require('express');
const apiController = require('../controllers/api-controller');
const router = express.Router();

router.get('/posts/:postId', apiController.fetchPostById);
router.get('/', apiController.fetchPosts);
router.post('/posts', apiController.createPost);

module.exports = router;
