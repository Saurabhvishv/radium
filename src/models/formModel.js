const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
     
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["Open", "In-Progress", "Completed"]
    },
    deletedAt: {
        type: Date,
        default: null
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
},{timestamps: true})

module.exports = mongoose.model('Form', formSchema)