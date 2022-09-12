const SavedEvents = require("../../models/SavedEvents");
const { StatusCodes } = require("http-status-codes");

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
//get  saved event
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
  try {
    const find = await SavedEvents.deleteOne({ EventID: EventID });
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
//get all saved Events to view in saved page
const getALLSavedEvents = async (req, res) => {
  const { userID: userID } = req.params;
  try {
    var find = await SavedEvents.find({ userID: userID }).populate({
      path: "EventID",
      populate: {
        path: "company",
      },
    });
    res.status(StatusCodes.OK).json({
      find,
    });
  } catch (error) {
    res.status(400).send({ msg: "eror in retriving saved jobs" });
    throw new Error("eror in retriving saved jobs");
  }
};
module.exports = {
  saveEvent,
  getSavedEvents,
  deleteSavedEvents,
  getALLSavedEvents,
};
