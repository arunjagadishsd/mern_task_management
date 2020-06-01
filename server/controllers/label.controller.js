const Label = require("../models/label.model");

module.exports.label_create = async function (req, res) {
  try {
    const { text } = req.body;
    const createdLabel = await Label.create({
      text,
    });
    res.json({
      success: true,
      data: createdLabel,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
module.exports.label_list = async function (req, res) {
  try {
    const labelList = await Label.find({});
    res.json(labelList);
  } catch (error) {
    res.json(error);
  }
};
