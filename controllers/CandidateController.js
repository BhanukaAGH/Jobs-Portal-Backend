const Job = require("../models/Job");
const Event = require("../models/Event");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Resume = require("../models/UserResume");
const {
  getALLSavedEvents,
  saveEvent,
  getSavedEvents,
  deleteSavedEvents,
} = require("../controllers/CandidateSubcontrollers/EventsController");
const {
  getALLSavedJobs,
  saveJob,
  getSavedJobs,
  deleteSavedJobs,
} = require("../controllers/CandidateSubcontrollers/JobsController");

//candidate GET ALL JOB using pagination
const getAllJobs = async (req, res) => {
  const PageSize = 5;
  const page = parseInt(req.query.page || 0);
  const { Location, keyword } = req.body;
  try {
    //for drop down data
    const distincCat = await Job.find({}).distinct("jobCategory");
    const mediality = await Job.find({}).distinct("workType");
    const experience = await Job.find({}).distinct("jobType");
    var filter;
    if (!Location && !keyword) {
      filter = {};
    }
    // for search data
    var locationregex = new RegExp(`.*${Location}.*`, "i");
    var keywordregex = new RegExp(`.*${keyword}.*`, "i");
    //searching options
    if (keyword && !Location) {
      filter = {
        $or: [
          { jobTitle: { $regex: keywordregex } },
          { jobType: { $regex: keywordregex } },
          { jobCategory: { $regex: keywordregex } },
        ],
      };
    }
    if (Location && !keyword) {
      filter = {
        $or: [{ country: { $regex: locationregex } }],
      };
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
      };
    }
    const jobs = await Job.find(filter)
      .populate("company")
      .limit(PageSize)
      .skip(PageSize * page);

    const Count = await Job.find(filter).populate("company");

    const JobsCount = Count.length;
    //count number of results found
    const count = await Job.find(filter);
    const ResultsFound = count.length;

    res.status(StatusCodes.OK).json({
      JobsCount,
      totalPages: Math.ceil(JobsCount / PageSize),
      jobs,
      distincCat,
      mediality,
      experience,
      ResultsFound,
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
  const { userID, skills, Location, PrimaryRole, Statement } = req.body;
  try {
    const find = await Resume.findOne({ userID });
    if (find) {
      res.send({ msg: "Resume already Added" });
      return;
    }
    const add = await Resume.create({
      userID,
      skills,
      Location,
      PrimaryRole,
      Statement,
    });
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
};
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
};
const UpdateResume = async (req, res) => {
  const { userID, skills, Location, PrimaryRole, Statement } = req.body;
  const filter = { userID: userID };
  try {
    const add = await Resume.updateOne(filter, {
      userID,
      skills,
      Location,
      PrimaryRole,
      Statement,
    });
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
};
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
  getALLSavedEvents,
  AddResume,
  getUserResume,
  UpdateResume,
  RemoveResume,
};
//
