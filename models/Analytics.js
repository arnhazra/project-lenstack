//Import Statements
const mongoose = require('mongoose')

//Project NoSQL Schema
const AnalyticsSchema = new mongoose.Schema
({
    creator:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    projectid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },

    component:
    {
        type: String,
        required: true
    },

    event:
    {
        type: String,
        required: true
    },

    info:
    {
        type: String,
        required: true
    },

    ipaddr:
    {
        type: String,
        required: true
    },
    
    geolocation: 
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
module.exports = Analytics = mongoose.model('analytics', AnalyticsSchema)