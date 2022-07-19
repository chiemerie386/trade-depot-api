const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    price: {
      type: String,
      trim: true,
      required: [true, 'Price is required'],
    },
    long: {
      type: String,
      trim: true,
    },
    lat: {
      type: String,
      trim: true,
    },
    radius: {
      type: String,
      trim: true,
    },
    address: {
        type: String,
        trim: true,
        lowercase: true,
    },
    image: {
      type: String,
      trim: true,
      required: [true, 'Image type is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;
