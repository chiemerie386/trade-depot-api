const User = require('../models/users')
const Product = require('../models/products')
const Comment = require('../models/comments')
const sendMail = require('../nodemailer')
const jwt = require('jsonwebtoken')


const CommentControllers  = {
    async addComment (req,res) {
        try{
            const {text, productId, user } = req.body

            let userDetails = await User.findById(user)

           


            let product = await Product.findById(productId).populate('user')
            console.log(product)
            console.log(req.body)
            let newComment = new Comment (req.body)

            await newComment.save()
            
            await product.comments.push(newComment)
            await product.save()

            let mailDetails = {
                to:product.user.email,
                subject: 'You recieved a new Comment on your Product',
                body:`  Hi ${product.user.name}, Someone just made a comment on your product ${product.name}, you can check it out.
                    `,
            }

            sendMail(mailDetails.to,  mailDetails.body, mailDetails.subject,)

            res.status(201).json({message:'newComment successfully added', data:product})
        }catch(error){
            console.log(error)
            return res.status(500).json({message:'An error occured', error: error.message})
        } 
    },

    async addReply (req, res) {
        try{
            const { name, commentId, text}= req.body

            const comment = await Comment.findById(commentId)
            comment.reply.push({name, text})
            await comment.save()

            return res.status(200).json({message:"Comment replied successfully", data:comment})

        }catch(error){
            return res.status(500).json({message:'An error occured', error: error.message})
        }
    },

    async getProducts (req,res) {
        try{
            const {state} = req.query
           const products = await Product.find({state})

            res.status(200).json({message:"successful", products });
        }catch(error){
            return res.status(500).json({message:'An error occured', error:error.message})
        }
    }
}

module.exports = CommentControllers