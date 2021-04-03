var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getPostById } = require('../controllers/post')
const { createLike, deleteLike, getLike, getLikeById, getAllLikesByPostId } = require('../controllers/like');

router.param('userId', getUserById);
router.param('postId', getPostById);
router.param('likeId', getLikeById);

router.post('/like/create/:userId', isSignedIn, createLike);

router.get('/like/:likeId', isSignedIn, getLike)
router.get('/like/:postId/:userId', isSignedIn, getAllLikesByPostId);
router.delete('/like/delete/:likeId/:userId', isSignedIn, isAuthenticated, deleteLike)

module.exports = router;