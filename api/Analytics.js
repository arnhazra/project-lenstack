//Import Statements
const express = require('express')
const { check, validationResult } = require('express-validator')
const superagent = require('superagent')
const auth = require('../middlewares/auth')
const Analytics = require('../models/Analytics')
const Project = require('../models/Project')
const router = express.Router()

//New Analytics Route
router.post
(
    '/new/:id',

    [
        check('component', 'Component must not be empty').notEmpty(),
        check('event', 'Event must not be empty').notEmpty(),
        check('info', 'Info must not be empty').notEmpty(),
    ],

    async(req, res) =>
    {
        const ipaddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        let geolocation = ' '
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else
        {
            const { component, event, info } = req.body
        
            try 
            {
                const projectid = req.params.id
                const apikey = req.headers['x-api-key']
                const project = await Project.findOne({ _id: projectid, apikey })
                
                if(project)
                {
                    if(req.headers.referer.toString().includes(project.authorizeduri))
                    {
                        const response = await superagent.get(`http://ip-api.com/json/${ipaddr}`)
                        if(response.body.status === 'success')
                        {
                            const country = response.body.country || 'Not Found'
                            const region = response.body.regionName || ' '
                            const city = response.body.city || ' '
                            geolocation = `${city}, ${region}, ${country}`
                        }

                        else
                        {
                            geolocation = 'Not Found'
                        }

                        const creator = project.creator
                        let analytics = new Analytics({ creator, projectid, component, event, info, ipaddr, geolocation })
                        await analytics.save()
                        return res.status(200).json({ msg: 'Analytics created' })  
                    }

                    else
                    {
                        return res.status(500).json({ msg: 'Unauthorized URI' })  
                    }
                }

                else
                {
                    return res.status(500).json({ msg: 'Project Not Found' })  
                }
            } 

            catch (error) 
            {
                return res.status(500).json({ msg: 'Error creating insight' })
            }
        }
    }
)

//Analytics library Route
router.get
(
    '/library/:id', 

    auth, 

    async(req,res)=> 
    {
        const projectid = req.params.id
        const requester = req.id
        try 
        {
            const project = await Project.findById(req.params.id)

            if(project)
            {
                const { creator } = project
                if(requester === creator.toString())
                {
                    const analytics = await Analytics.find({ projectid }).sort({ date: -1 })
                    return res.status(200).json(analytics)
                }

                else
                {
                    return res.status(404).json({ msg: 'Project does not belong to this creator' })
                }
            }

            else
            {
                return res.status(404).json({ msg: 'Project not found' })
            }
        } 
        
        catch (error) 
        {
            return res.status(500).json({ msg: 'Server error' })
        }
    }
)

//Export Statement
module.exports = router