const express = require('express');
const apiController = require('../controllers/api-controller');
const commentController = require('../controllers/comment-controller');
const router = express.Router();

// Post endpoints
router.get('/posts/:postId', apiController.fetchPostById);
router.get('/', apiController.fetchPosts);
router.post('/posts', apiController.createPost);
router.delete('/posts/:postId', apiController.deletePostById);
router.patch('/posts/:postId', apiController.updatePostById);

// Categories endpoints
router.get('/categories', apiController.fetchCategories);

// Tags endpoints
router.get('/tags', apiController.fetchTags);

// Comments endpoints
router.post('/posts/:postId/comments', commentController.createComment);
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;
