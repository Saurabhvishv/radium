const formModel = require('../models/formModel')
const mongoose = require('mongoose')
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
// const isValidStatus = function (status) {
//     return ['Open', 'In-Progress', 'Completed'].indexOf(status) !== -1
// }

const isvalidRequestbody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// Create Form API

const createForm = async function (req, res) {
    try {
        const requestBody = req.body;
        let { title, description, status } = requestBody;  //Object destructing

        if(!title || !description || !status){
            return res.status(400).json({error:"feild the details all"})
        }
       
        const formData = { title, description, status };
        const newForm = await formModel.create(formData);
        res.status(201).send({ status: true, message: 'Created successfull', data: newForm })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getDetails = async function(req,res){
    try {
        let getQuery = {
            isDeleted: false
        }
        let block = await formModel.find(getQuery)
        if (block.length == 0) {
            res.status(400).send({ status: false, data: "Form details not found!!" })
        }
        else {
            res.status(200).send({ status: true, msg: block })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const updateForm = async function (req, res) {
    try {
        let requestBody = req.body
       const formId = req.params.formId
       console.log(formId)
        if (!isValidObjectId(formId)) {
            res.status(400).send({ status: false, message: `${formId} is invalid` })
            return
        }
        const formFound = await formModel.findOne({ _id: formId })
        
        if (!formFound) {
            return res.status(404).send({ status: false, message: `form do not exists` })
        }
        if (!isvalidRequestbody(requestBody)) {
            res.status(400).send({ status: false, message: 'Please provide details to update' })
            return
        }
        let formDetails = await formModel.findOne({_id :formId})
        if (!formDetails) {
            res.status(404).send({ status: false, message: "No form found" })
            return
        }
        // destructuring the body
        let { title, description, status} = requestBody;
        let updateData = {};
            updateData['title'] = title
       
            updateData['description'] = description
        
            updateData['status'] = status
        
        const updatedFormData = await formModel.findOneAndUpdate({ _id: formId}, updateData, { new: true })
        
        res.status(201).send({ status: true, data: updatedFormData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

const deleteForm = async function (req, res) {
    try {
        let requestBody = req.body
       const formId = req.params.formId
       console.log(formId)
        if (!isValidObjectId(formId)) {
            res.status(400).send({ status: false, message: `${formId} is invalid` })
            return
        }
        const formFound = await formModel.findOne({ _id: formId })
        
        if (!formFound) {
            return res.status(404).send({ status: false, message: `form do not exists` })
        }
        let formDetails = await formModel.findOne({_id :formId})
        if (!formDetails) {
            res.status(404).send({ status: false, message: "No form found" })
            return
        }
        const updatedFormData = await formModel.findOneAndUpdate({ _id: formId},{ $set: { isDeleted: true, deletedAt: new Date() } } , { new: true })
        
        res.status(201).send({ status: true, data: updatedFormData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}
module.exports = { createForm ,getDetails,updateForm ,deleteForm};