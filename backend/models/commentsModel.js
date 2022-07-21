const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    review: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
      },
    text: {
      type: String,
      required: [true, 'Please add a review'],
    },

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comments', commentSchema)