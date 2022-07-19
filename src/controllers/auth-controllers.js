const User = require('../models/users')
const jwt = require('jsonwebtoken')


const AuthControllers  = {
    async register (req,res) {
        try{
            console.log(req.body)
            const {location, email, address, password, state } = req.body
            const user = await User.findOne({email})
            if(user){
                return res.status(400).json({message:'User alredy exists'})
            }

            let newUser = new User (req.body)
            await newUser.save()

            res.status(201).json({message:'user successfully Created', user:newUser})
        }catch(error){
            console.log(error)
            return res.status(500).json({message:'An error occured', error: error.message})
        }
        
    },

    async login (req,res) {
        try{
            const {email, password} = req.body
            const user = await User.validateCredentials(email, password);
            const token = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.BCRYPT_SECRET_KEY, {expiresIn:'1d'});

            res.cookie('tko', token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: false,
            });

            res.status(200).json({ user, token });
        }catch(error){
            console.log(error)
            return res.status(500).json({message:'An error occured', error:error.message})
        }
    }
}

module.exports = AuthControllers