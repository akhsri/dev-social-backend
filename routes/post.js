const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { createPost } = require('../controllers/post');

router.param("userId", getUserById);

router.post('/post/create/:userId', isSignedIn, isAuthenticated, createPost);

module.exports = router;