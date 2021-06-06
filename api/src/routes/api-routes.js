const {body} = require('express-validator');
const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../auth/auth');
const authController = require('../controllers/auth-controller');
const apiController = require('../controllers/post-controller');
const commentController = require('../controllers/comment-controller');
const taxonomyController = require('../controllers/taxonomy-controller');

// Auth endpoints
router.post('/signup',
  authController.signup);
router.post('/login', [
    body('username').trim().not().isEmpty(),
    body('password').trim().isLength({min: 10})],
  authController.login);

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
