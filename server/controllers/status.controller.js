const Status = require('../models/status.model')

module.exports.status_create = async function(req, res) {
    try {
        const {
            text
        } = req.body
        const createdStatus = await Status.create({
            text
        })
        res.json({
            success: true,
            data: createdStatus
        })
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
}
module.exports.status_list = async function(req, res) {
    try {
        const statusList = await Status.find({})
        res.json(statusList)

    } catch (error) {
        res.json(error)
    }

}