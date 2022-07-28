const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
const {
    getReviews,
    setReview,
    deleteReview,
    updateReview,
    setImg,
  } = require('../controllers/reviewController')
//    '/api/reviews'   <-base
router.route('/img').post(protect,setImg)

router.route('/').get( getReviews).post(protect, setReview)

router.route('/:id').delete(protect, deleteReview).put(protect, updateReview)

module.exports = router