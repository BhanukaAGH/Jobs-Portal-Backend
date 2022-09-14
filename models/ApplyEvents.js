const mongoose = require("mongoose");

const AppllyEventsSchema = new mongoose.Schema(
  {
    EventID: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: [true, "Please provide Event id"],
    },
    CompanyID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide Company id"],
    },
    FName: {
      type: String,
      required: [true, "Please provide First Name"],
    },
    LName: {
      type: String,
      required: [true, "Please provide Last Name"],
    },
    Email: {
      type: String,
      required: [true, "Please provide Email"],
    },
    Country: {
      type: String,
      required: [true, "Please provide Country"],
    },
    Role: {
      type: String,
      required: [true, "Please provide Role"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyEvents", AppllyEventsSchema);
