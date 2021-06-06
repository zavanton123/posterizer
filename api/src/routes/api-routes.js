const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../auth/auth');
const {createComment, deleteComment} = require("../controllers/comment-controller");
const {fetchCategories, fetchTags} = require("../controllers/taxonomy-controller");
const {signup, login} = require("../controllers/auth-controller");
const {postValidator} = require("../validators/post-validators");
const {loginValidator, signUpValidator} = require("../validators/auth-validators");
const {commentValidator} = require('../validators/comment-validators');
const {
  fetchPostById,
  fetchPosts,
  createPost,
  updatePostById,
  deletePostById
} = require("../controllers/post-controller");

// Auth endpoints
router.post('/signup', signUpValidator, signup);
router.post('/login', loginValidator, login);

// Post endpoints
router.get('/posts/:postId', fetchPostById);
router.get('/', fetchPosts);
router.post('/posts', isAuthenticated, postValidator, createPost);
router.delete('/posts/:postId', isAuthenticated, deletePostById);
router.patch('/posts/:postId', isAuthenticated, postValidator, updatePostById);

// Taxonomy endpoints
router.get('/categories', fetchCategories);
router.get('/tags', fetchTags);

// Comments endpoints
router.post('/posts/:postId/comments', isAuthenticated, commentValidator, createComment);
router.delete('/posts/:postId/comments/:commentId', isAuthenticated, deleteComment);

module.exports = router;
