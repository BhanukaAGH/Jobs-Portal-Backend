const createJob = async (req, res) => {
  res.send('post Job')
}

const getJob = async (req, res) => {
  res.send('Get Job Details')
}

const getAllJobs = async (req, res) => {
  res.send('Get All Jobs Details')
}

const updateJob = async (req, res) => {
  res.send('Job Update')
}

const deleteJob = async (req, res) => {
  res.send('Job Delete')
}

module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
}
