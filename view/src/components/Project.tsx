import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import CardModule from '../modules/CardModule';
import ErrorModule from '../modules/ErrorModule';
import LoadingModule from '../modules/LoadingModule';
import NavModule from '../modules/NavModule';

const CreateProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({  title: '', description: '', authorizeduri: '', alert: '' })
    const navigate = useNavigate()

    let handleSubmit = async(e:any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Creating Project' })
        
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

        try
        {
            const res = await axios.post('/api/project/create', state)
            setState({ ...state, alert: res.data.msg })
        } 

        catch (error) 
        {
            if(error.response.status === 401)
            {
                localStorage.removeItem('token')
                navigate('/identity/signin')
            }

            else
            {
                setState({ ...state, alert: error.response.data.msg })
            }
        }  
    }

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to= '/identity/signin' />
    }

    else
    {
        return (
            <Fragment>
                <NavModule/>
                <form className='box' onSubmit={ handleSubmit }> 
                    <p className='boxhead'>New Project</p>
                    <input type='text' name='title' placeholder='Project Title' onChange={ (e) => setState({ ...state, title: e.target.value }) } autoComplete='off' required />
                    <textarea name='description' placeholder='Description' onChange={ (e) => setState({ ...state, description: e.target.value }) } autoComplete='off' required/>
                    <input type='url' name='authorizeduri' placeholder='Authorized URI' onChange={ (e) => setState({ ...state, authorizeduri: e.target.value }) } autoComplete='off' required/>
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btn-block'>Create<i className='fas fa-chevron-right'></i></button>
                </form>
            </Fragment>   
        )
    }
}

const ProjectLibrary: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ projects: [], isLoaded: false, show: false, alert: '' })
    const navigate = useNavigate()

    useEffect(() => 
    {
        let fetchLibrary = async() =>
        {
            try 
            {
                const response = await axios.get('/api/project/library')
                setState({ ...state, projects: response.data, isLoaded: true })
            } 
            
            catch (error) 
            {
                navigate('/identity/signin') 
            }
        }       

        fetchLibrary()   
    }, [])

    let handleDelete = async(id: any) =>
    {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

        try 
        {
            let projects = state.projects.filter((project:any) =>
            {
                return id !== project._id
            })

            setState({ ...state, projects: projects })
            await axios.delete(`/api/project/delete/${id}`)            
        } 
        
        catch (error) 
        {
            localStorage.removeItem('token')
            navigate('/identity/signin') 
        }
    }

    let projectItems = state.projects.map((item:any)=>
    {
        return(
            <CardModule id={ item._id } title={ item.title } key={ item._id } />
        )
    })

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to = '/auth/signin' />
    }

    else
    {
        if(state.isLoaded)
        {
            if(state.projects.length === 0)
            {
                return(
                    <Fragment>
                        <NavModule/>
                    </Fragment>
                ) 
            }
    
            else
            {
                return(
                    <Fragment>
                        <NavModule/>
                        <Container className='mt-4'>
                            <ListGroup>
                                { projectItems }
                            </ListGroup>
                        </Container>     
                    </Fragment>
                )     
            }
        }
    
        else
        {
            return <LoadingModule />
        }
    }
}

const ViewProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const params = useParams()
    const [state, setState] = useState({ id: '', title: '', description: '', authorizeduri: '', date: '', isLoaded: false, error: false })

    useEffect(() => 
    {
        let id = params.id

        let fetchProject = async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, id: response.data.project._id, title: response.data.project.title, description: response.data.project.description, authorizeduri: response.data.project.authorizeduri, date: response.data.project.date, isLoaded: true })     
            } 
            
            catch (error) 
            {
                setState({ ...state, error: true, isLoaded: true }) 
            }
        } 

        fetchProject()
    }, [])

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to='/auth/signin' />
    }

    else
    {
        if(state.error)
        {
            
        }
    
        else
        {
            if(state.isLoaded)
            {
                return(
                    <Fragment>
                        <NavModule />
                        <Container>
                            <div className='mt-4 p-5 tray'>
                                <Link to='/project/library' className='btn'><i className='fas fa-arrow-left'></i></Link>
                                <p className='display-4 fw-bold'>{ state.title }</p>
                                <p className='lead fw-bold'>{ `${ state.date.slice(0,10) }` }</p>
                                <p className='lead fw-bold text-justify' style={{ overflowWrap: 'break-word' }}>Description: { state.description }</p><br/>
                                <Link to={`/project/update/${state.id}`} className='btn'>Update Project<i className='fas fa-chevron-right'></i></Link>
                                <Link to={`/project/delete/${state.id}`} className='btn'>Delete Project<i className='fas fa-chevron-right'></i></Link>
                            </div>
                        </Container>
                    </Fragment>
                )    
            }
            
            else
            {
                return <LoadingModule />
            }
        }
    }
}

const UpdateProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ id: '', title: '', description: '', authorizeduri: '', isLoaded: false, error: false , alert: '' })
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => 
    {
        let id = params.id
        let fetchProject = async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, id: response.data.project._id, title: response.data.project.title, description: response.data.project.description, authorizeduri: response.data.project.authorizeduri, isLoaded: true })     
            } 
            
            catch (error) 
            {
                setState({ ...state, error: true, isLoaded: true })  
            }
        } 

        fetchProject()
    }, [])

    let handleSubmit = async(e:any) =>
    {
        e.preventDefault()
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
    
        setState({ ...state, alert: 'Updating Project' })
        let id = params.id
        
        try 
        {
            const response = await axios.post(`/api/project/update/${id}`, state) 
            setState({ ...state, alert: response.data.msg })
            navigate(`/project/view/${id}`)
        } 
        
        catch (error) 
        {
            if(error.response.status === 401)
            {
                localStorage.removeItem('token')
                navigate('/auth/signin')
            }

            else
            {
                setState({ ...state, alert: error.response.data.msg })
            }
        }
    }

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to='/auth/signin' />
    }

    else
    {
        if(state.error)
        {
            
        }
    
        else
        {
            if(state.isLoaded)
            {
                return (
                    <Fragment>
                        <NavModule/>
                        <form className='box' onSubmit={ handleSubmit } id='step1'> 
                            <p className='boxhead'>Update Project</p>
                            <input type='text' name='title' placeholder='Project Title' onChange={ (e) => setState({ ...state, title: e.target.value }) } value= { state.title } autoComplete='off' required />
                            <textarea name='description' placeholder='Description' onChange={ (e) => setState({ ...state, description: e.target.value }) } value= { state.description } autoComplete='off' required />
                            <input type='url' name='authorizeduri' placeholder='Authorized URI' onChange={ (e) => setState({ ...state, authorizeduri: e.target.value }) } value= { state.authorizeduri } autoComplete='off' />
                            <p id='alert'>{ state.alert }</p>
                            <button type='submit' className='btn'>Update<i className='fas fa-chevron-right'></i></button>
                        </form>
                    </Fragment>   
                )            
            }
            
            else
            {
                return <LoadingModule />             
            }
        }
    }
}

const DeleteProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ useript: '', error: false , alert: '' })
    const navigate = useNavigate()
    const params = useParams()

    let handleSubmit = async(e:any) =>
    {
        console.log(state)
        e.preventDefault()
        if(state.useript === 'Delete Project') 
        {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
    
            setState({ ...state, alert: 'Deleting Project' })
            let id = params.id
            
            try 
            {
                const response = await axios.delete(`/api/project/delete/${id}`) 
                setState({ ...state, alert: response.data.msg })
                navigate(`/project/library`)
            } 
            
            catch (error) 
            {
                if(error.response.status === 401)
                {
                    localStorage.removeItem('token')
                    navigate('/auth/signin')
                }
    
                else
                {
                    setState({ ...state, alert: error.response.data.msg })
                }
            }
        }

        else
        {
            setState({ ...state, alert: 'Please type "Delete Project"' })
        }
    }

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to='/auth/signin' />
    }

    else
    {
        if(state.error)
        {
            
        }
    
        else
        {
            return (
                <Fragment>
                    <NavModule/>
                    <form className='box' onSubmit={ handleSubmit } id='step1'> 
                        <p className='boxhead'>Delete Project</p>
                        <input type='text' name='useript' placeholder='Type "Delete Project"' onChange={ (e) => setState({ ...state, useript: e.target.value }) } autoComplete='off' required />
                        <p id='alert'>{ state.alert }</p>
                        <button type='submit' className='btn'>Update<i className='fas fa-chevron-right'></i></button>
                    </form>
                </Fragment>   
            )
        }
    }
}

export { CreateProject, ProjectLibrary, ViewProject, UpdateProject, DeleteProject }