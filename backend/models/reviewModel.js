const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Please add a review'],
    },
    timePlayed: {
        type: Number ,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      imageURL: {
        type: String,
        required: true, 
      },
      auther: {
        type: String,
        required: false,
      },
      dateOfPlay: {
        type: Number,
        required: false,
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Review', reviewSchema)