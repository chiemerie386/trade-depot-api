const User = require('../models/users')
const Product = require('../models/products')
const {uploadFile, getFileStream} = require('../s3')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const jwt = require('jsonwebtoken')
const firestoreUpload = require('../firebase')



// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

const ProductControllers  = {
    async addProduct (req,res) {
        try{
           
            const { address, lat, long, name, price, radius } = req.body
            const file = req.file
            req.body.user = req.userId

            console.log(file, "file")
            const result = await uploadFile(file)
            await unlinkFile(file.path)
            console.log(result, 'res')
            let image = result.key
            req.body.image = image
            console.log(req.body)
            let newProduct = new Product (req.body)
            await newProduct.save()

            firestoreUpload({address, lat, long, name, radius, price, id:newProduct._id.toString()})

            res.status(201).json({message:'Product successfully created', user:newProduct})
        }catch(error){
            console.log(error)
            return res.status(500).json({message:'An error occured', error: error.message})
        }
    },

    async getProducts (req,res) {
        try{
            const {userId} = req
            let user = await User.findById(userId)
           const products = await Product.find().populate({path:'comments',populate:{path:'user'} }).populate('user')

           let filteredProducts = products.filter((data)=>{
               let distance = getDistanceFromLatLonInKm(user.lat, user.long, data.lat, data.long)
               if (distance < data.radius){
                   return data
               }
           })

            res.status(200).json({message:"successful", products: filteredProducts });
        }catch(error){
            return res.status(500).json({message:'An error occured', error:error.message})
        }
    },

    async getOneProducts (req,res) {
        try{
            const {productId} = req.query
           const products = await Product.findById(productId).populate({path:'comments',populate:{path:'user'} }).populate('user')

            res.status(200).json({message:"successful", products });
        }catch(error){
            return res.status(500).json({message:'An error occured', error:error.message})
        }
    }
}

module.exports = ProductControllers