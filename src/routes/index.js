const express = require('express');

const authRouter = require('./auth-routes')
const productRouter = require('./product-routes')
const commentRouter = require('./comment-routes')
const router = express.Router();

/* GET home page. */
router.use('/auth', authRouter )
router.use('/product', productRouter )
router.use('/comment', commentRouter )

module.exports = router;
