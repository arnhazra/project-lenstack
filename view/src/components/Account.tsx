//Import Statements
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import LoadingModule from '../modules/LoadingModule'
import NavModule from '../modules/NavModule'
import useSession from '../hooks/useSession'

//Update Account Component
const UpdateAccount: React.FC = () =>
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ name: '', password: '', alert: '' })
    const navigate = useNavigate()

    let handleUpdate = async(e:any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Updating profile' })
        
        try 
        {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
            const res = await axios.post('/api/account/update', state)
            setState({ ...state, alert: res.data.msg })
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                if (error.response.status === 401) 
                {
                    localStorage.removeItem('token')
                    navigate('/identity/signin')
                }
    
                else
                {
                    setState({ ...state, alert: error.response.data.msg })
                }
            }

            else
            {
                localStorage.removeItem('token')
                navigate('/identity/signin')
            }
        }
    }

    //JSX
    if(session.hasError)
    {
        return(<Navigate replace to= '/identity/signin' />)
    }

    else
    {
        if(session.isLoaded)
        {
            return (
                <Fragment>
                    <NavModule />
                    <form className='box' onSubmit = { handleUpdate }>   
                        <p className='boxhead'>Update Account</p>
                        <input type='text' id='name' name='name' placeholder='Change Name' onChange={ (e) => setState({ ...state, name: e.target.value }) } defaultValue={ session.name } autoComplete='off' required minLength={3} maxLength={40} />
                        <input type='password' id='new-password' autoComplete={ 'new-password' } name='password' placeholder='Old/New Password' onChange={ (e) => setState({ ...state, password: e.target.value }) } required minLength={8} maxLength={20} />
                        <p id='alert'>{ state.alert }</p>
                        <button type='submit' className='btn btnsubmit'>Update Account<i className='fas fa-chevron-right'></i></button><br/>
                        <Link to='/account/close' className='boxlink'>Close Your Account</Link>
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

//Close Account Component
const CloseAccount: React.FC = () =>
{
    //LOGIC
    const session = useSession()
    const [state, setState] = useState({ password: '', alert: '' })
    const navigate = useNavigate()

    let handleClose = async(e:any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Closing account' })
            
        try 
        {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
            await axios.post('/api/account/close', state)
            localStorage.removeItem('token')
            navigate('/identity/signin')
        } 
        
        catch (error) 
        {
            setState({ ...state, alert: 'Invalid Password' })
        }
    }

    //JSX
    if(session.hasError)
    {
        return(<Navigate replace to= '/identity/signin' />)
    }

    else
    {
        return (
            <Fragment>
                <NavModule />
                <form className='box' onSubmit = { handleClose }>   
                    <p className='boxhead'>Close Account</p>
                    <input type='password' name='password' placeholder='Your Password' onChange={ (e) => setState({ ...state, password: e.target.value }) } required autoComplete='off' />
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Close Account<i className='fas fa-chevron-right'></i></button>
                </form>
            </Fragment>
        )
    }
}

//Export Statement
export { UpdateAccount, CloseAccount }