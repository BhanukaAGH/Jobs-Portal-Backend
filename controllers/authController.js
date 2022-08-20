const User = require('../models/User')
const Company = require('../models/Company')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, createJWT } = require('../utils')

//! REGISTER CONTROLLER
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    companyWebsite,
    companyLocation,
    numberOfEmployees,
    companyDescription,
    userRole,
  } = req.body

  if (!name || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  if (
    userRole === 'company' &&
    (!companyLocation || !numberOfEmployees || !companyDescription)
  ) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments()) === 0
  const role = isFirstAccount && userRole !== 'company' ? 'admin' : userRole

  let user
  if (role === 'admin' || role === 'user' || !role) {
    user = await User.create({
      name,
      email,
      password,
      role,
    })
  } else {
    const company = await Company.create({
      companyWebsite,
      companyLocation,
      numberOfEmployees,
      companyDescription,
    })
    user = await User.create({
      name,
      email,
      password,
      _company: company._id,
      role,
    })
  }

  const tokenUser = createTokenUser(user)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

//! LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const tokenUser = createTokenUser(user)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

module.exports = { login, register }
