const User = require('../models/usermodel')


exports.signUp = async (req, res) => {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      })
  
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser
        }
      })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
    }
  }

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
  
      // 1) Check if email and pass exist
      if (!email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Please provide email and password'
        })
      }
      
      // 2) Check if user exists & pass is correct
      const user = await User.findOne({ email }).select('+password')
      console.log(user)
  
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
          status: 'fail',
          message: 'Incorrect email or password'
        })
      }

      res.status(200).json({
        status: 'success',
        user
      })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
    }
  }