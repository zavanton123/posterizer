const express = require('express');
const authController = require('../controllers/auth-controller');
const apiController = require('../controllers/api-controller');
const commentController = require('../controllers/comment-controller');
const taxonomyController = require('../controllers/taxonomy-controller');
const router = express.Router();

// Auth endpoints
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Post endpoints
router.get('/posts/:postId', apiController.fetchPostById);
router.get('/', apiController.fetchPosts);
router.post('/posts', apiController.createPost);
router.delete('/posts/:postId', apiController.deletePostById);
router.patch('/posts/:postId', apiController.updatePostById);

// Categories endpoints
router.get('/categories', taxonomyController.fetchCategories);

// Tags endpoints
router.get('/tags', taxonomyController.fetchTags);

// Comments endpoints
router.post('/posts/:postId/comments', commentController.createComment);
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;
