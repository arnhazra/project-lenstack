//Import Statements
const mongoose = require('mongoose')

//User NoSQL Schema
const ProjectSchema = new mongoose.Schema
({
    creator:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title:
    {
        type: String,
        required: true
    },

    description:
    {
        type: String,
        required: true
    },

    authorizeduri:
    {
        type: String,
        required: true
    },

    date:
    {
        type: Date,
        default: Date.now
    }
})


//EXPORT STATEMENTS
module.exports = Project = mongoose.model('project', ProjectSchema)