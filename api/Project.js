//Import Statements
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const auth = require('../middlewares/auth')
const Project = require('../models/Project')
const Analytics = require('../models/Analytics')

//Create Project Route
router.post
(
    '/new',

    auth,

    [
        check('title', 'Title must not be empty').notEmpty(),
        check('description', 'Description must not be empty').notEmpty(),
        check('authorizeduri', 'Authorized URI must be an URL').notEmpty(),
    ],

    async(req, res) =>
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else
        {
            const { title, description, authorizeduri } = req.body

            try 
            {
                const projects = await Project.find({ creator: req.id })
                
                if(projects.length < 5)
                {
                    const apikey = uuidv4()
                    let project = new Project({ creator: req.id, title, description, authorizeduri, apikey })
                    await project.save()
                    return res.status(200).json({ msg: 'Project created', project }) 
                }

                else
                {
                    return res.status(400).json({ msg: 'Max project count limit reached' })
                }
            } 

            catch (error) 
            {
                return res.status(400).json({ msg: 'Error creating project' })
            }
        }
    }
)

//Project Library Route
router.get
(
    '/library', 

    auth, 

    async(req,res)=> 
    {
        try 
        {
            const projects = await Project.find({ creator: req.id }).sort({ date: -1 })
            return res.status(200).json(projects)
        } 
        
        catch (error) 
        {
            return res.status(500).json({ msg: 'Server error' })
        }
    }
)

//View Project Route
router.get
(
    '/view/:id', 

    auth,

    async(req,res)=> 
    {
        try 
        {
            const project = await Project.findById(req.params.id)
            
            if(req.id == project.creator)
            {
                return res.status(200).json({ project })
            }

            else
            {
                return res.status(404).json({ msg: 'Not found' })
            }
        }
         
        catch (error) 
        {
            return res.status(500).json({ msg: 'Server error' })
        }
    }
)

//Update Project Route
router.post
(
    '/update/:id',

    auth,

    [
        check('title', 'Title must not be empty').notEmpty(),
        check('description', 'Description must not be empty').notEmpty(),
        check('authorizeduri', 'Authorized URI must be an URL').notEmpty(),
    ],

    async(req, res) =>
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else
        {
            const { title, description, authorizeduri } = req.body

            try 
            {
                const project = await Project.findById(req.params.id)

                if(req.id = project.creator) 
                {
                    await Project.findByIdAndUpdate(req.params.id, { title, description, authorizeduri })
                    return res.status(200).json({ msg: 'Project updated' }) 
                }

                else
                {
                    return res.status(404).json({ msg: 'Not found' }) 
                }
            } 

            catch (error) 
            {
                return res.status(500).json({ msg: 'Error updating project' })
            }
        }
    }
)

//Delete Document - Databox Route
router.delete
(
    '/delete/:id',

    auth,

    async(req, res) =>
    {
        try 
        {
            const project = await Project.findById(req.params.id)
            
            if(req.id == project.creator)
            {
                await Project.findByIdAndDelete(req.params.id)
                await Analytics.deleteMany({ projectid: req.params.id })
                return res.status(200).json({ msg: 'Project deleted' })
            }

            else
            {
                return res.status(404).json({ msg: 'Not found' })
            }
        } 

        catch (error) 
        {
            return res.status(500).json({ msg: 'Error deleting project' })
        }
    }
)

//Export Statement
module.exports = router