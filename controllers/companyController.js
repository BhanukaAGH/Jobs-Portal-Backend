const User = require('../models/User')
const Company = require('../models/Company')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions, createTokenUser, createJWT } = require('../utils')

//! GET COMPANY
const getCompany = async (req, res) => {
  const { id: companyId } = req.params
  const company = await User.findOne({ _id: companyId })
    .populate('_company')
    .select('-password -role')

  if (!company) {
    throw new CustomError.NotFoundError(`No company with id : ${companyId}`)
  }

  res.status(StatusCodes.OK).json(company)
}

//! GET ALL COMPANY
const getAllCompany = async (req, res) => {
  const companies = await User.find({ role: 'company' })
    .populate('_company')
    .select('-password -role')

  res.status(StatusCodes.OK).json({ companies, count: companies.length })
}

//! UPDATE COMPANY
const updateCompany = async (req, res) => {
  const { id: companyId } = req.params
  const { name, email, _company, photoUrl } = req.body
  const company = await User.findOne({ _id: companyId })

  if (!company) {
    throw new CustomError.NotFoundError(`No company with id : ${companyId}`)
  }

  checkPermissions(req.user, company._id)

  await Company.findOneAndUpdate({ _id: company._company }, _company, {
    new: true,
    runValidators: true,
  })

  company.name = name
  company.email = email
  company.photoUrl = photoUrl

  await company.save()

  const tokenUser = createTokenUser(company)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

module.exports = {
  getCompany,
  getAllCompany,
  updateCompany,
}
