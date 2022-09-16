const AppliedJob = require('../models/AppliedJobs')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! GET ALL JOB APPLICANTS
const getAllJobApplicants = async (req, res) => {
  const { companyId, jobId } = req.params
  const jobApplicants = await AppliedJob.find({
    CompanyID: companyId,
    JobID: jobId,
  }).populate([
    {
      path: 'userID',
      select: 'name photoUrl',
    },
    { path: 'ResumeID', select: 'CV PrimaryRole Statement' },
  ])

  res
    .status(StatusCodes.OK)
    .json({ applicants: jobApplicants, count: jobApplicants?.length })
}

//! UPDATE APPLICANT STATUS
const updateApplicantStatus = async (req, res) => {
  const { appliedJobId } = req.params
  const { applicantStatus } = req.body
  if (!applicantStatus) {
    throw new CustomError.BadRequestError('Please provide Applicant Status')
  }

  const applyJob = await AppliedJob.findOne({ _id: appliedJobId })
  if (!applyJob) {
    throw new CustomError.NotFoundError(
      `No applied job with id ${appliedJobId}`
    )
  }

  applyJob.ApplicationStatus = applicantStatus

  await applyJob.save()
  res.status(StatusCodes.OK).json(applyJob)
}

//! GET ALL COMPANY APPLICANTS
const getAllCompanyApplicants = async (req, res) => {
  const { companyId } = req.params
  const jobApplicants = await AppliedJob.find({
    CompanyID: companyId,
  }).populate([
    {
      path: 'userID',
      select: 'name photoUrl',
    },
    { path: 'ResumeID', select: 'CV PrimaryRole Statement' },
  ])

  res
    .status(StatusCodes.OK)
    .json({ applicants: jobApplicants, count: jobApplicants?.length })
}

module.exports = {
  getAllJobApplicants,
  getAllCompanyApplicants,
  updateApplicantStatus,
}
