const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { createPost, photo, deletePost, updatePost, getAllPosts } = require('../controllers/post');

router.param("userId", getUserById);

router.post('/post/create/:userId', isSignedIn, isAuthenticated, createPost);
router.get("/post/photo/:postId", photo)

router.delete("/post/:postId/:userId", isSignedIn, isAuthenticated, deletePost)

router.put("/post/:postId/:userId", isSignedIn, isAuthenticated, updatePost)

router.get("/posts", getAllPosts);




module.exports = router;