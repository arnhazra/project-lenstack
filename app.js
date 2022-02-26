//Import Statements
const express = require('express')
const Connection = require('./functions/Connection')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')

//Initialize Express App
const app = express()
app.listen(process.env.PORT || 7000)

app.use(express.json({ extended: false, limit: '35mb' }))
app.use(cors())

//MongoDB Connection
Connection()

//Defining API Routes
app.use('/api/account', require('./api/Account'))
app.use('/api/identity', require('./api/Identity'))
app.use('/api/project', require('./api/Project'))
app.use('/api/analytics', require('./api/Analytics'))
app.use('/api/services/session', require('./api/Session'))


app.use(express.static('view/build'))
app.get('*', (req,res) => { res.sendFile(path.resolve(__dirname, 'view', 'build', 'index.html')) })