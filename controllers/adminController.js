const User = require("../models/User");
const Company = require("../models/Company");
exports.accountCreate = async (req, res, next) => {
  try {
    const admin = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        account: admin,
      },
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await User.find({ role: "admin" });
    res.status(200).json({
      status: "success",
      accounts,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await User.findById({ _id: id });
    res.status(200).json({
      status: "success",
      account,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      account,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await User.deleteOne({ _id: id });
    res.status(200).json({
      status: "success",
      account,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    const account = await Company.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      account,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.companyDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Company.deleteOne({ _id: id });
    res.status(200).json({
      status: "success",
      account,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};
