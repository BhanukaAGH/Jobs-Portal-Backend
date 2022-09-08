const SavedJob = require("../../models/SavedJobs");
const { StatusCodes } = require("http-status-codes");

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
  //get all saved jobs to view in saved page
  const getALLSavedJobs = async (req, res) => {
    const { userID: userID } = req.params;
    try {
      var find = await SavedJob.find({ userID: userID }).populate({
        path:"JobID",
        populate:{
          path:"company"
        }
      })
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
      if (find) {
        res.status(StatusCodes.OK).send({ msg: "Unsaved" });
      } else {
        res.status(StatusCodes.BAD_REQUEST).send({ msg: "error in unsaving" });
        return;
      }
    } catch (error) {
      res.status(400).send({ msg: "eror unsaving" });
      throw new Error("eror in unsaving");
    }
  };
  module.exports = {
    getALLSavedJobs,
    saveJob,
    getSavedJobs,
    deleteSavedJobs,
  };
