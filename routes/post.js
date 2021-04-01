const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param("userId", getUserById);

router.post('/post/create/:userId', isSignedIn, isAuthenticated, createPost);