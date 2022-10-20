const Event = require('../models/Event')
const ApplyEvents = require('../models/ApplyEvents')
const { StatusCodes } = require('http-status-codes')

//combine 2 collections to get event report
const EventReport = async (req, res) => {
  try {
    //aggregate applied events and evnts
    let report = await Event.aggregate([
      {
        $lookup: {
          from: 'applyevents',
          localField: '_id',
          foreignField: 'EventID',
          as: 'report',
        },
      },
    ])
    let totalapplied = await ApplyEvents.countDocuments()

    //populate company to event
    await Event.populate(report, { path: 'company' })

    res.status(StatusCodes.OK).json({ report, totalapplied })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST)
  }
}

module.exports = {
  EventReport,
}
