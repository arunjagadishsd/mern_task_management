const Status = require("../models/status.model");

module.exports.statusCreate = async function (req, res) {
  try {
    const { text } = req.body;
    const createdStatus = await Status.create({
      text,
    });
    res.json({
      success: true,
      data: createdStatus,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
module.exports.statusList = async function (req, res) {
  try {
    const statusList = await Status.find({});
    res.json(statusList);
  } catch (error) {
    res.json(error);
  }
};
