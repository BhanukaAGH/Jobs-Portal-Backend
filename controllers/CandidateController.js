const Job = require("../models/Job");
const Event = require("../models/Event");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const {getALLSavedEvents,saveEvent,getSavedEvents,deleteSavedEvents}=require("../controllers/CandidateSubcontrollers/EventsController")
const {getALLSavedJobs,saveJob,getSavedJobs,deleteSavedJobs}=require("../controllers/CandidateSubcontrollers/JobsController")

//candidate GET ALL JOB using pagination
const getAllJobs = async (req, res) => {
  const PageSize = 5;
  const page = parseInt(req.query.page || 0);

  try {
    const jobs = await Job.find({})
      .populate("company")
      .limit(PageSize)
      .skip(PageSize * page);

    const JobsCount = await Job.countDocuments({});

    res.status(StatusCodes.OK).json({
      JobsCount,
      totalPages: Math.ceil(JobsCount / PageSize),
      jobs,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving jobs" });
    throw new Error("eror in retriving jobs");
  }
};
//candidate GET ALL Events using pagination
const getAllEvents = async (req, res) => {
  const PageSize = 4;
  const page = parseInt(req.query.page || 0);
  try {
    const events = await Event.find({})
      .populate("company")
      .limit(PageSize)
      .skip(PageSize * page);

    const EvenyCount = await Event.countDocuments({});

    res.status(StatusCodes.OK).json({
      EvenyCount,
      totalPages: Math.ceil(EvenyCount / PageSize),
      events,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving events" });
    throw new Error("eror in retriving events");
  }
};



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
  getALLSavedEvents 
};
//

