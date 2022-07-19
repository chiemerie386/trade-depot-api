const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
    },
    address: {
      type: String,
      trim: true,
      // required: [true, 'location is required'],
    },
    lat: {
      type: String,
      trim: true,
      // required: [true, 'location is required'],
    },
    long: {
      type: String,
      trim: true,
      // required: [true, 'location is required'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, 'phone number type is required'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password type is required'],
    },

  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    const salt = parseInt(process.env.SALT_ROUNDS);
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, salt);
    }
  
    next();
  });


  
  UserSchema.statics.validateCredentials = async (email, password) => {
      console.log(email)
    const user = await User.findOne({ email });

    console.log(user)
    if (!user) throw new Error('Invalid Login Credentials');
    console.log('e')
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid Login Credentials');
  
    return user;
  };

  const User = mongoose.model('Users', UserSchema); 

module.exports = User;
