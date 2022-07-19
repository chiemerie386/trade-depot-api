const express = require('express');
const router = express.Router();
const verifyToken = require('../auth')

const CommentControllers = require ('../controllers/comment-controllers')

// /* GET home page. */
// router.get('/allproducts', ProductControllers.getProducts);
router.post('/addproduct', verifyToken, CommentControllers.addComment);
router.post('/addreply', verifyToken, CommentControllers.addReply);

// router.post('/login', AuthControllers.login);

module.exports = router;
