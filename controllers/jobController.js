const Job = require('../models/Job')
const AppliedJobs = require('../models/AppliedJobs')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! POST JOB
const createJob = async (req, res) => {
  req.body.company = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
}

//! GET JOB
const getJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId }).populate({
    path: 'company',
    select: '-password -email',
  })

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`)
  }
  res.status(StatusCodes.OK).json(job)
}

//! GET ALL JOB
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ company: req.user.userId })
  res.status(StatusCodes.OK).json({ jobs, count: jobs?.length })
}

//! UPDATE JOB
const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`)
  }
  res.status(StatusCodes.OK).json(job)
}

//! DELETE JOB
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`)
  }

  await AppliedJobs.findOneAndRemove({ JobID: jobId })
  await job.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed.' })
}

module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
}
