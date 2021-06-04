const express = require('express');
const authController = require('../controllers/auth-controller');
const apiController = require('../controllers/api-controller');
const commentController = require('../controllers/comment-controller');
const taxonomyController = require('../controllers/taxonomy-controller');
const {isAuthenticated} = require("../auth/auth");
const router = express.Router();

// Auth endpoints
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Post endpoints
router.get('/posts/:postId', isAuthenticated, apiController.fetchPostById);
router.get('/', isAuthenticated, apiController.fetchPosts);
router.post('/posts', isAuthenticated, apiController.createPost);
router.delete('/posts/:postId', isAuthenticated, apiController.deletePostById);
router.patch('/posts/:postId', isAuthenticated, apiController.updatePostById);

// Categories endpoints
router.get('/categories', isAuthenticated, taxonomyController.fetchCategories);

// Tags endpoints
router.get('/tags', isAuthenticated, taxonomyController.fetchTags);

// Comments endpoints
router.post('/posts/:postId/comments', isAuthenticated, commentController.createComment);
router.delete('/posts/:postId/comments/:commentId', isAuthenticated, commentController.deleteComment);

module.exports = router;
