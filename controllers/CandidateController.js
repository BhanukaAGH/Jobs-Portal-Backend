const Job = require("../models/Job");
const Event = require("../models/Event");
const SavedJob = require("../models/SavedJobs");
const SavedEvents = require("../models/SavedEvents");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");

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

//save job
const saveJob = async (req, res) => {
  const { userID, JobID } = req.body;
  try {
    const find = await SavedJob.findOne({ JobID });
    if (find) {
      res.send({ msg: "Job already saved" });
      return;
    }
    const saveJob = await SavedJob.create({
      userID,
      JobID,
    });
    if (saveJob) {
      res.status(StatusCodes.OK).send({ msg: "Saved" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error saving" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error saving" });
    return;
  }
};
//get all saved jobs
const getSavedJobs = async (req, res) => {
  const { userID: userID } = req.params;
  try {
    const find = await SavedJob.find({ userID: userID });
    res.status(StatusCodes.OK).json({
      find,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving saved jobs" });
    throw new Error("eror in retriving saved jobs");
  }
};

//delete saved jobs
const deleteSavedJobs = async (req, res) => {
    const { JobID: JobID } = req.params;
    try {
      const find = await SavedJob.deleteOne({ JobID: JobID });
      if(find){
        res.status(StatusCodes.OK).send({ msg: "Unsaved" });
      }else{
        res.status(StatusCodes.BAD_REQUEST).send({ msg: "error in unsaving" });
        return
      }
    } catch (error) {
      res.status(400).send({ msg: "eror unsaving" });
      throw new Error("eror in unsaving");
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
//save event
const saveEvent = async (req, res) => {
  const { userID, EventID } = req.body;
  try {
    const find = await SavedEvents.findOne({ EventID });
    if (find) {
      res.send({ msg: "Event already saved" });
      return;
    }
    const save = await SavedEvents.create({
      userID,
      EventID,
    });
    if (save) {
      res.status(StatusCodes.OK).send({ msg: "Saved" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error saving" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error saving" });
    return;
  }
};
//get all saved events
const getSavedEvents = async (req, res) => {
  const { userID: userID } = req.params;
  try {
    const find = await SavedEvents.find({ userID: userID });
    res.status(StatusCodes.OK).json({
      find,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving saved jobs" });
    throw new Error("eror in retriving saved jobs");
  }
};

//delete saved events
const deleteSavedEvents = async (req, res) => {
  const { EventID: EventID } = req.params;
  console.log("Event",EventID)
  try {
    const find = await SavedEvents.deleteOne({ EventID: EventID });
    if(find){
      res.status(StatusCodes.OK).send({ msg: "Unsaved" });
    }else{
      res.status(StatusCodes.BAD_REQUEST).send({ msg: "error in unsaving" });
      return
    }
  } catch (error) {
    res.status(400).send({ msg: "eror unsaving" });
    throw new Error("eror in unsaving");
  }
};


module.exports = {
  getAllJobs,
  saveJob,
  getSavedJobs,
  deleteSavedJobs,
  getAllEvents,
  saveEvent,
  getSavedEvents,
  deleteSavedEvents
};
//
