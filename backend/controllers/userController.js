const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

 
//d
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginSuperUser = asyncHandler(async (req, res) => {


  const { password } = req.body

  const salt =await  bcrypt.genSalt(10)
  const hashedPassword =  await bcrypt.hash('moolan', salt)


  // Create user
  const user = {id:"dark",name:"dark",password:'moolan',_id:"dark"}

  console.log()
  if ( await bcrypt.compare(password, hashedPassword)) {
        console.log('compare success')
    res.json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    posting page for new game reviews
// @route   post /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '365d',
  })
}

module.exports = {
  loginSuperUser,
  getMe,
}