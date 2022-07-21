const express = require('express')
const router = express.Router()

const {
  loginSuperUser,
  getMe,
} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginSuperUser)
router.post('/me', protect, getMe)

module.exports = router