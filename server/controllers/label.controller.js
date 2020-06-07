const Label = require("../models/label.model");

module.exports.labelCreate = async function (req, res) {
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
module.exports.labelList = async function (req, res) {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    res.json(error);
  }
};
