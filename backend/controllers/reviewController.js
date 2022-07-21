const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");

// @desc    Get review
// @route   GET /api/reviews
// @access  public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json(reviews);
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

  const review = await Review.create({
    name: req.body.name,
    comment: req.body.comment,
    timePlayed: req.body.timePlayed,
    rating: req.body.rating,
    imageURL: null, //@REMINDER dont forget to add image url to db once we figure out how :)
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

  const updatedReview = await Review.findByIdAndUpdate(
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


  await review.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
};
