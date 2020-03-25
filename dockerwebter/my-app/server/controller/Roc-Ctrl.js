const BisectionModel = require('../model/bimodel')
const FlaseModel = require('../model/flasemodel')
const NewtonModel = require('../model/newtonmodel')
const SecantModel = require('../model/secantmodel')
const CompositeModel = require('../model/compositemodel')   
const DiffModel = require('../model/diffmodel')
getBisectionEX = async (req, res) => {
    await BisectionModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getfalseEX = async (req, res) => {
    await FlaseModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getnewtonEX = async (req, res) => {
    await NewtonModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getsecantEX = async (req, res) => {
    await SecantModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getcompositeEX = async (req, res) => {
    await CompositeModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getdiffEX = async (req, res) => {
    await DiffModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
module.exports = {
    getBisectionEX,
    getfalseEX,
    getnewtonEX,
    getsecantEX,
    getcompositeEX,
    getdiffEX
}