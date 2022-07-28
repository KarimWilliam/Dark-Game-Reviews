const asyncHandler = require("express-async-handler");
const Review = require('../models/reviewModel')
const path = require('path')
const fs = require('fs')


// @desc    Set img
// @route   POST /api/reviews/img
// @access  Private
const setImg = asyncHandler(async (req, res) => {

  if(req.files===null){
    return res.states(400).json({msg: 'no file uploaded'})
  }
  const file = req.files.image;
  file.mv(`${__dirname}/../images/${file.name}`,err =>{
    if(err){
      console.error(err);
      return res.states(500).send(err)
    }
    res.status(200).json({fileName: file.name,filePath:`images/${file.name}`});
  })

  });


// @desc    Get review
// @route   GET /api/reviews
// @access  public
const getReviews = asyncHandler(async (req, res) => {
//filter
  if(req.query.Rating){
    console.log("rating query")
    const review = await Review.find({rating:{$gte: req.query.Rating}});
    res.status(200).json(review);
  }
  else if(req.query.timePlayed){
    const review = await Review.find({timePlayed:{$gte: req.query.timePlayed}});
    res.status(200).json(review);
  } else {

    const reviews = await Review.find();

    res.status(200).json(reviews);
  }

});

// @desc    Set review
// @route   POST /api/reviews
// @access  Private
const setReview = asyncHandler(async (req, res) => {
  if ( !req.body.name || !req.body.comment || !req.body.timePlayed || !req.body.rating ) { //@REMINDER image url
    res.status(400);
    throw new Error("Please add all fields");
  }

  const reviews = await Review.findOne({"name":req.body.name})
  if(reviews){
    res.status(400);
    throw new Error("Please enter unique game");
  }
  console.log("writing img to file " + req.body.imageURL)
  const review = await Review.create({
    name: req.body.name,
    comment: req.body.comment,
    timePlayed: req.body.timePlayed,
    rating: req.body.rating,
    auther: req.body.auther,
    imageURL: req.body.imageURL, 
    dateOfPlay: req.body.dateOfPlay
  });


  res.status(200).json(review);
});

// @desc    Update review
// @route   PUT /api/review/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400);
    throw new Error("review not found");
  }

  const updatedReview = await Review.findByIdAndUpdate(  //out of action
    req.params.id,
    {
      name: req.body.name,
      comment: req.body.comment,
      timePlayed: req.body.timePlayed,
      rating: req.body.rating,
      imageURL: null,   //@REMINDER HERE TOO
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedReview);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400);
    throw new Error("Goal not found");
  }

  try {
    const link= path.join(__dirname,"../images/"+review.imageURL)
    fs.unlinkSync(link)
  } catch(err) {
    console.error(err)
  }
  await review.remove();

  res.status(200).json({ id: req.params.id });
});







module.exports = {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
  setImg,
};
