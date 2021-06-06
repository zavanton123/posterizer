const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../auth/auth');
const authController = require('../controllers/auth-controller');
const apiController = require('../controllers/post-controller');
const commentController = require('../controllers/comment-controller');
const taxonomyController = require('../controllers/taxonomy-controller');
const {loginValidator, signUpValidator} = require("../validators/validators");

// Auth endpoints
router.post('/signup', signUpValidator, authController.signup);
router.post('/login', loginValidator, authController.login);

// Post endpoints
router.get('/posts/:postId', apiController.fetchPostById);
router.get('/', apiController.fetchPosts);
router.post('/posts', isAuthenticated, apiController.createPost);
router.delete('/posts/:postId', isAuthenticated, apiController.deletePostById);
router.patch('/posts/:postId', isAuthenticated, apiController.updatePostById);

// Taxonomy endpoints
router.get('/categories', taxonomyController.fetchCategories);
router.get('/tags', taxonomyController.fetchTags);

// Comments endpoints
router.post('/posts/:postId/comments', isAuthenticated, commentController.createComment);
router.delete('/posts/:postId/comments/:commentId', isAuthenticated, commentController.deleteComment);

module.exports = router;
