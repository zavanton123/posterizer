const {body} = require('express-validator');
const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../auth/auth');
const authController = require('../controllers/auth-controller');
const apiController = require('../controllers/post-controller');
const commentController = require('../controllers/comment-controller');
const taxonomyController = require('../controllers/taxonomy-controller');
const {PASSWORD_MIN_LENGTH} = require('../utils/constants');
const {User} = require('../models/models');

// Auth endpoints
router.post('/signup',
  [
    body('username')
      .trim()
      .custom((value, {req}) => {
          return User.findOne({username: value})
            .then(user => {
                if (user) {
                  return Promise.reject(`A user with the username ${value} already exists!`)
                }
              }
            );
        }
      ),
    body('email').trim().isEmail().withMessage('Enter valid email!')
      .custom((value, {req}) => {
          return User.findOne({email: value})
            .then(user => {
                if (user) {
                  return Promise.reject(`A user with the email ${value} already exists!`)
                }
              }
            );
        }
      ),
    body('password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
    body('confirm-password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
  ],
  authController.signup);
router.post('/login',
  [
    body('username').trim().not().isEmpty(),
    body('password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
  ],
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
