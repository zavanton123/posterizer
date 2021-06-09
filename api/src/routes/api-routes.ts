import express from "express";
import {createComment, deleteComment} from "../controllers/comment-controller";
import {fetchCategories, fetchTags} from "../controllers/taxonomy-controller";
import {login, signup} from "../controllers/auth-controller";
import {createPost, deletePostById, fetchPostById, fetchPosts, updatePostById} from "../controllers/post-controller";
import {postValidator} from "../validators/post-validators";
import {loginValidator, signUpValidator} from "../validators/auth-validators";
import {commentValidator} from "../validators/comment-validators";
import {isAuthenticated} from "../auth/auth-middleware";

const router = express.Router();


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

export default router;
