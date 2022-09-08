const Job = require("../models/Job");
const Event = require("../models/Event");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Resume=require("../models/UserResume")
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

const AddResume = async (req, res) => {
  const { userID, skills,Location,PrimaryRole,Statement } = req.body;
  try {
    const find = await Resume.findOne({ userID });
    if(find){
      res.send({ msg: "Resume already Added" });
      return;
    }
    const add = await Resume.create({
      userID,
      skills,
      Location,
      PrimaryRole,
      Statement
    })
    if (add) {
      res.status(StatusCodes.OK).send({ msg: "Added" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error Adding" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error Adding" });
    return;
  }
}
const getUserResume = async (req, res) => {
  const { userID: userID } = req.params;

  try {
    const find = await Resume.findOne({ userID });
    res.status(StatusCodes.OK).json({
      find,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving resume" });
    throw new Error("eror in retriving resume");
  }
}
const UpdateResume = async (req, res) => {
  const { userID, skills,Location,PrimaryRole,Statement } = req.body;
  const filter = { userID: userID }
  try {
    
    const add = await Resume.updateOne(filter,{
      userID,
      skills,
      Location,
      PrimaryRole,
      Statement
    })
    if (add) {
      res.status(StatusCodes.OK).send({ msg: "updated" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error updated" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error updated" });
    return;
  }
}
const RemoveResume = async (req, res) => {
  const { userID: userID } = req.params;
  try {    
    const remove = await Resume.deleteOne({ userID: userID });

    if (remove) {
      res.status(StatusCodes.OK).send({ msg: "removed" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error removing" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error removing" });
    return;
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
  RemoveResume
};
//

