const AppliedJobs = require("../../models/AppliedJobs");
const Resume = require("../../models/UserResume");
const { StatusCodes } = require("http-status-codes");

//apply for jobs
const apply = async (req, res) => {
  const { userID, JobID, ResumeID, CompanyID } = req.body;
  try {
    const check = await Resume.findOne({ _id:ResumeID });
    if (!check) {
      res.send({ msg: "You Have not setup ur resume" });
      return;
    }
    const find = await AppliedJobs.findOne({
      $and: [{ userID: userID }, { JobID: JobID }],
    });
    if (find) {
      res.send({ msg: "You Have already Applied to this job" });
      return;
    }

    const applyForJob = await AppliedJobs.create({
      userID,
      JobID,
      ResumeID,
      CompanyID,
    });

    if (applyForJob) {
      res.status(StatusCodes.OK).send({ msg: "Applied" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error Applying" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error Applying" });
  }
};

//get user specific applied jobs
const getUsersAppliedJobs = async (req, res) => {
  const { userID: userID } = req.params;

  try {
    const find = await AppliedJobs.find({userID: userID}).populate("JobID").populate("CompanyID");
    res.status(StatusCodes.OK).json({
      find
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving jobs" });
  }

}



module.exports = {
  apply,
  getUsersAppliedJobs
};
