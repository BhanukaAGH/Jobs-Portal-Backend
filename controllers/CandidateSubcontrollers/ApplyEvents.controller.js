const ApplyEvents = require("../../models/ApplyEvents");
const { StatusCodes } = require("http-status-codes");

//apply for events
const applyForEvent = async (req, res) => {
  const { EventID, CompanyID, FName, LName, Email, Country, Role } =req.body;
  try {
    const find = await ApplyEvents.findOne({
      $and: [{ Email: Email }, { EventID: EventID }],
    });
    if (find) {
      res.send({ msg: "This Email Has already been used to signup to this event" });
      return;
    }

    const applyForEvent = await ApplyEvents.create({
      EventID,
      CompanyID,
      FName,
      LName,
      Email,
      Country,
      Role,
    });

    if (applyForEvent) {
      res.status(StatusCodes.OK).send({ msg: "Signed-Up" });
    } else {
      res.status(StatusCodes.OK).send({ msg: "Error " });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).send({ msg: "Error " });
  }
};

module.exports = {
    applyForEvent,
};
