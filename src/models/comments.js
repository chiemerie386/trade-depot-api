const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    reply: [
        {
          text:String,
          name: String,
        }
      ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;
