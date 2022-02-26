//Import Statements
const express = require('express')
const { check, validationResult } = require('express-validator')
const geoip = require('geoip-lite')
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
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const geo = geoip.lookup(ip)
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
                const project = await Project.findById(projectid)
                
                if(project)
                {
                    if(req.headers.referer.toString().includes(project.authorizeduri))
                    {
                        const creator = project.creator
                        let analytics = new Analytics({ creator, projectid, component, event, info })
                        await analytics.save()
                        return res.status(200).json({ msg: 'Analytics created', ip, geo })  
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
                console.log(requester, creator.toString())
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