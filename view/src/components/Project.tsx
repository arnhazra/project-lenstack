import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Container, ListGroup, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import CardModule from '../modules/CardModule';
import ErrorModule from '../modules/ErrorModule';
import LoadingModule from '../modules/LoadingModule';
import NavModule from '../modules/NavModule';
import TrayNav from '../modules/TrayNav';

const NewProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({  title: '', description: '', authorizeduri: '', alert: '' })
    const navigate = useNavigate()

    const handleSubmit = async(e:any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Creating Project' })
        
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

        try
        {
            const res = await axios.post('/api/project/new', state)
            setState({ ...state, alert: res.data.msg })
            navigate(`/project/view/${res.data.project._id}`)
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
        (async() =>
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
        })()      
    }, [])

    const projectItems = state.projects.map((item:any) => <CardModule id={ item._id } title={ item.title } key={ item._id } />)

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
                        <div className="box">
                            <p className="boxhead">No Projects</p>
                            <Link to="/project/new" className="btn">New Project<i className="fas fa-chevron-right"></i></Link>
                        </div>
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
    const id = params.id
    const [state, setState] = useState({ title: '', description: '', date: '', isLoaded: false, error: false })

    useEffect(() => 
    {
        (async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, title: response.data.project.title, description: response.data.project.description, date: response.data.project.date, isLoaded: true })     
            } 
            
            catch (error) 
            {
                setState({ ...state, error: true, isLoaded: true }) 
            }
        })()
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
            return(<ErrorModule />)
        }
    
        else
        {
            if(state.isLoaded)
            {
                return(
                    <Fragment>
                        <NavModule />
                        <Container className='mt-4'>
                            <TrayNav id={ id } />
                            <div className='mt-4 p-5 tray'>
                                <Link to='/project/library' className='btn'><i className='fas fa-arrow-left'></i></Link>
                                <p className='display-4 fw-bold'>{ state.title }</p>
                                <p className='lead fw-bold'>{ `${ state.date.slice(0,10) }` }</p>
                                <p className='lead fw-bold text-justify' style={{ overflowWrap: 'break-word' }}>Description: { state.description }</p><br/>
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

const APIDoc: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const params = useParams()
    const id = params.id
    const [state, setState] = useState({ id: '', title: '', description: '', authorizeduri: '', apikey: '', date: '', isLoaded: false, error: false, displayTable: false })

    let dummyRequestPayloadExample = {
        "component": "User SignUp Component",
        "event": "New User Signed Up",
        "info": "Name - John Doe"
    }

    useEffect(() => 
    {
        (async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, id: response.data.project._id, title: response.data.project.title, description: response.data.project.description, authorizeduri: response.data.project.authorizeduri, apikey: response.data.project.apikey, date: response.data.project.date, isLoaded: true })     
            } 
            
            catch (error) 
            {
                setState({ ...state, error: true, isLoaded: true }) 
            }
        })()
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
            return(<ErrorModule />)
        }
    
        else
        {
            if(state.isLoaded)
            {
                return(
                    <Fragment>
                        <NavModule />
                        <Container className='mt-4'>
                            <TrayNav id={ state.id } />
                            <div className='mt-4 p-5 tray'>
                                <code>
                                    HTTP Method: POST <br/>
                                    Request Payload Body Format: JSON <br/>
                                    Request Payload Header: x-api-key <br/>
                                    Request Payload Body Example: { JSON.stringify(dummyRequestPayloadExample) } <br/>
                                    API Usage: Invoke the API from your application with the details, no need to wait for response to come. You can see the analytics created here.
                                </code><br/><br/>
                                <input type="text" value={`API Endpoint: https://lenstack.herokuapp.com/api/analytics/new/${state.id}`} disabled />
                                <input type="text" value={`x-api-key (Header): ${state.apikey}`} disabled />
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

const ProjectAnalytics: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const params = useParams()
    const id = params.id
    const [state, setState] = useState({ isLoaded: false, error: false })
    const [analytics, setAnalytics] = useState([])

    useEffect(() => 
    {
        (async() =>
        {
            try 
            {
                const response = await axios.get(`/api/analytics/library/${id}`)
                setAnalytics(response.data)
                setState({ ...state, isLoaded: true })     
            } 
            
            catch (error) 
            {
                setState({ ...state, error: true, isLoaded: true }) 
            }
        })()
    }, [])

    const analyticsData = analytics.map((item:any) => 
    {
        return(
            <tr key={ item._id }>
                <td>{ item.date.slice(0,10) }</td>
                <td>{ item.component }</td>
                <td>{ item.event }</td>
                <td>{ item.info }</td>
                <td>{ item.ipaddr }</td>
                <td>{ item.geolocation }</td>
            </tr>
        )
    })

    //JSX
    if(session.hasError)
    {
        return <Navigate replace to='/auth/signin' />
    }

    else
    {
        if(state.error)
        {
            return(<ErrorModule />)
        }
    
        else
        {
            if(state.isLoaded)
            {
                return(
                    <Fragment>
                        <NavModule />
                        <Container className='mt-4'>
                            <TrayNav id={ id } />
                            <Table className='mt-4' responsive variant="light">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Component</th>
                                        <th>Event</th>
                                        <th>Info</th>
                                        <th>IP Address</th>
                                        <th>Geolocation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { analyticsData }
                                </tbody>
                            </Table>
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
    const [state, setState] = useState({ id: '', title: '', description: '', authorizeduri: '', isLoaded: false, hasError: false , alert: '' })
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    useEffect(() => 
    {
        (async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, id: response.data.project._id, title: response.data.project.title, description: response.data.project.description, authorizeduri: response.data.project.authorizeduri, isLoaded: true })    
            } 
            
            catch (error) 
            {
                setState({ ...state, hasError: true, isLoaded: true })  
            }
        })()
    }, [])

    const handleSubmit = async(e:any) =>
    {
        e.preventDefault()
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
    
        setState({ ...state, alert: 'Updating Project' })
        const id = params.id
        
        try 
        {
            const response = await axios.post(`/api/project/update/${id}`, state) 
            setState({ ...state, alert: response.data.msg })
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
        if(!state.isLoaded)
        {
            return(
                <LoadingModule />
            )
        }

        else 
        {
            if(state.hasError)
            {
                return(
                    <ErrorModule />
                )
            }

            else
            {
                return (
                    <Fragment>
                        <NavModule/>
                        <Container className='mt-4'>
                            <TrayNav id={ state.id } />
                            <form className='tray mt-4 p-5' onSubmit={ handleSubmit }> 
                                <p className='boxhead fw-bold'>Update Project</p>
                                <input type='text' name='title' placeholder='Project Title' onChange={ (e) => setState({ ...state, title: e.target.value }) } value= { state.title } autoComplete='off' required />
                                <textarea name='description' placeholder='Description' onChange={ (e) => setState({ ...state, description: e.target.value }) } value= { state.description } autoComplete='off' required />
                                <input type='url' name='authorizeduri' placeholder='Authorized URI' onChange={ (e) => setState({ ...state, authorizeduri: e.target.value }) } value= { state.authorizeduri } autoComplete='off' />
                                <p id='alert'>{ state.alert }</p>
                                <button type='submit' className='btn'>Update<i className='fas fa-chevron-right'></i></button>
                            </form>
                        </Container>
                    </Fragment>   
                )    
            }
        }
    }
}

const DeleteProject: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ useript: '', title: '', description: '', authorizeduri: '', isLoaded: false, hasError: false , alert: '' })
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    useEffect(() => 
    {
        (async() =>
        {
            try 
            {
                const response = await axios.get(`/api/project/view/${id}`)
                setState({ ...state, title: response.data.project.title, description: response.data.project.description, authorizeduri: response.data.project.authorizeduri, isLoaded: true })    
            } 
            
            catch (error) 
            {
                setState({ ...state, hasError: true, isLoaded: true })  
            }
        })()
    }, [])

    const handleSubmit = async(e:any) =>
    {
        e.preventDefault()
        if(state.useript === 'Delete Project') 
        {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
    
            setState({ ...state, alert: 'Deleting Project' })
            const id = params.id
            
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
        if(!state.isLoaded)
        {
            return(
                <LoadingModule />
            )
        }
    
        else
        {
            if(state.hasError)
            {
                return(
                    <ErrorModule />
                )
            }

            else
            {
                return (
                    <Fragment>
                        <NavModule/>
                        <Container className='mt-4'>
                            <TrayNav id={ id } />
                            <form className='tray mt-4 p-5' onSubmit={ handleSubmit }> 
                                <p className='boxhead fw-bold'>Delete Project</p>
                                <input type='text' name='useript' placeholder='Type "Delete Project"' onChange={ (e) => setState({ ...state, useript: e.target.value }) } autoComplete='off' required />
                                <p id='alert'>{ state.alert }</p>
                                <button type='submit' className='btn'>Delete<i className='fas fa-chevron-right'></i></button>
                            </form>
                        </Container>
                    </Fragment>   
                )
            }
        }
    }
}

export { NewProject, ProjectLibrary, ViewProject, UpdateProject, DeleteProject, APIDoc, ProjectAnalytics }