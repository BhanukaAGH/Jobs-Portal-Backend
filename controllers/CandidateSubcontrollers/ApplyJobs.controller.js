const AppliedJobs = require("../../models/AppliedJobs");
const { StatusCodes } = require("http-status-codes");

//apply for jobs
const apply = async (req, res) => {
    const { userID, JobID,ResumeID,CompanyID } = req.body;
}



module.exports = {
    apply 
};
  