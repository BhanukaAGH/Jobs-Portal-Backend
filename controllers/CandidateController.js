const Job = require('../models/Job')
const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes')
const Resume = require('../models/UserResume')
const {
  getALLSavedEvents,
  saveEvent,
  getSavedEvents,
  deleteSavedEvents,
} = require('../controllers/CandidateSubcontrollers/EventsController')
const {
  getALLSavedJobs,
  saveJob,
  getSavedJobs,
  deleteSavedJobs,
} = require('../controllers/CandidateSubcontrollers/JobsController')

const {
  apply,
  getUsersAppliedJobs,
} = require('../controllers/CandidateSubcontrollers/ApplyJobs.controller')
const {
  applyForEvent,
} = require('../controllers/CandidateSubcontrollers/ApplyEvents.controller')

//candidate GET ALL JOB using pagination
const getAllJobs = async (req, res) => {
  const PageSize = 5
  const page = parseInt(req.query.page || 0)
  const { Location, keyword } = req.body
  try {
    //for drop down data
    const distincCat = await Job.find({}).distinct('jobCategory')
    const mediality = await Job.find({}).distinct('workType')
    const experience = await Job.find({}).distinct('jobType')
    let filter
    if (!Location && !keyword) {
      filter = {}
    }
    // for search data
    let locationregex = new RegExp(`.*${Location}.*`, 'i')
    let keywordregex = new RegExp(`.*${keyword}.*`, 'i')
    //searching options
    if (keyword && !Location) {
      filter = {
        $or: [
          { jobTitle: { $regex: keywordregex } },
          { jobType: { $regex: keywordregex } },
          { jobCategory: { $regex: keywordregex } },
        ],
      }
    }
    if (Location && !keyword) {
      filter = {
        $or: [{ country: { $regex: locationregex } }],
      }
    }
    if (Location && keyword) {
      filter = {
        $and: [
          { country: { $regex: locationregex } },
          {
            $or: [
              { jobTitle: { $regex: keywordregex } },
              { jobType: { $regex: keywordregex } },
              { jobCategory: { $regex: keywordregex } },
            ],
          },
        ],
      }
    }
    const jobs = await Job.find(filter)
      .populate('company')
      .limit(PageSize)
      .skip(PageSize * page)

    const Count = await Job.find(filter).populate('company')

    const JobsCount = Count.length
    //count number of results found
    const count = await Job.find(filter)
    const ResultsFound = count.length

    res.status(StatusCodes.OK).json({
      JobsCount,
      totalPages: Math.ceil(JobsCount / PageSize),
      jobs,
      distincCat,
      mediality,
      experience,
      ResultsFound,
    })
  } catch (error) {
    res.status(400).send({ msg: 'eror in retriving jobs' })
    throw new Error('eror in retriving jobs')
  }
}
//candidate GET ALL Events using pagination
const getAllEvents = async (req, res) => {
  const PageSize = 4
  const page = parseInt(req.query.page || 0)
  try {
    const events = await Event.find({})
      .populate('company')
      .limit(PageSize)
      .skip(PageSize * page)

    const EvenyCount = await Event.countDocuments({})

    res.status(StatusCodes.OK).json({
      EvenyCount,
      totalPages: Math.ceil(EvenyCount / PageSize),
      events,
    })
  } catch (error) {
    res.status(400).send({ msg: 'eror in retriving events' })
    throw new Error('eror in retriving events')
  }
}

const AddResume = async (req, res) => {
  const { userID, CV, skills, Location, PrimaryRole, Statement } = req.body
  try {
    const find = await Resume.findOne({ userID })
    if (find) {
      const add = await Resume.updateOne(
        { userID: userID },
        {
          userID,
          skills,
          Location,
          PrimaryRole,
          Statement,
          CV,
        }
      )
      if (add) {
        res.status(StatusCodes.OK).send({ msg: 'Added' })
      } else {
        res.status(StatusCodes.OK).send({ msg: 'Error Adding' })
        return
      }
    } else {
      const add = await Resume.create({
        userID,
        skills,
        Location,
        PrimaryRole,
        Statement,
        CV,
      })
      if (add) {
        res.status(StatusCodes.OK).send({ msg: 'Created' })
      } else {
        res.status(StatusCodes.OK).send({ msg: 'Error Created' })
        return
      }
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.OK).send({ msg: 'Error ' })
    return
  }
}
const getUserResume = async (req, res) => {
  const { userID: userID } = req.params

  try {
    const find = await Resume.findOne({ userID })
    res.status(StatusCodes.OK).json({
      find,
    })
  } catch (error) {
    res.status(400).send({ msg: 'eror in retriving resume' })
    throw new Error('eror in retriving resume')
  }
}
const UpdateResume = async (req, res) => {
  const { userID, skills, Location, PrimaryRole, Statement, CV } = req.body
  const filter = { userID: userID }
  try {
    const add = await Resume.updateOne(filter, {
      userID,
      skills,
      Location,
      PrimaryRole,
      Statement,
      CV,
    })
    if (add) {
      res.status(StatusCodes.OK).send({ msg: 'updated' })
    } else {
      res.status(StatusCodes.OK).send({ msg: 'Error updated' })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.OK).send({ msg: 'Error updated' })
    return
  }
}
//reset resume
const RemoveResume = async (req, res) => {
  const { userID: userID } = req.params
  try {
    ///const remove = await Resume.deleteOne({ userID: userID });
    const reset = await Resume.updateOne(
      { userID: userID },
      {
        skills: '',
        CV: '',
        Location: '',
        PrimaryRole: '',
        Statement: '',
      }
    )

    if (reset) {
      res.status(StatusCodes.OK).send({ msg: 'removed' })
    } else {
      res.status(StatusCodes.OK).send({ msg: 'Error removing' })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.OK).send({ msg: 'Error removing' })
    return
  }
}
module.exports = {
  getAllJobs,
  getAllEvents,
  saveJob,
  getSavedJobs,
  deleteSavedJobs,
  saveEvent,
  getSavedEvents,
  deleteSavedEvents,
  getALLSavedJobs,
  getALLSavedEvents,
  AddResume,
  getUserResume,
  UpdateResume,
  RemoveResume,
  apply,
  applyForEvent,
  getUsersAppliedJobs,
}
