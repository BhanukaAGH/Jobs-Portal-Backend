
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//candidate GET ALL JOB using pagination
const getAllJobs = async (req, res) => {
    console.log('here')
    const PageSize=4
    const page=parseInt(req.query.page || 0)

    try {
        const jobs = await Job.find({}).limit(PageSize).skip(PageSize*page)
        const JobsCount=await Job.countDocuments({})

        res.status(StatusCodes.OK).json({
            totalPages:Math.ceil(JobsCount/PageSize),
            jobs
          });    
    } catch (error) {
        res.status(400).send({msg:"eror in retriving jobs"})
        throw new Error('eror in retriving jobs')  
    }
}
module.exports = {
    getAllJobs    
}
  