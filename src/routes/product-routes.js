const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const {uploadFile, getFileStream} = require('../s3')
const verifyToken = require('../auth')

const ProductControllers = require ('../controllers/product-controllers')

// /* GET home page. */
router.get('/allproducts', verifyToken, ProductControllers.getProducts);
router.get('/singleproduct', verifyToken, ProductControllers.getOneProducts);
router.post('/addproduct',upload.single('image'), verifyToken, ProductControllers.addProduct);

router.get('/car/images/:key', (req,res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
  })

// router.post('/login', AuthControllers.login);

module.exports = router;
