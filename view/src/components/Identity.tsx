//Import Statements
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import NavModule from '../modules/NavModule'

//Sign Up Component
const SignUp : React.FC = () =>
{
    const [state, setState] = useState({ name: '', email: '', password: '', otp: '', hash:'', alert: '' })
    const [show, setShow] = useState({ step1: true, step2: false })
    const history: any = useNavigate()

    let getOTP = async(e: any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Please wait' })

        try 
        {  
            const response = await axios.post('/api/identity/signup/getotp', state)
            setState({ ...state, hash: response.data.hash, alert: response.data.msg })
            setShow({ step1: false, step2: true })
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }

            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }
    }

    let register = async(e: any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Creating account' })

        try 
        {   
            const response = await axios.post('/api/identity/signup/register', state)
            axios.defaults.headers.common['x-auth-token'] = response.data.token
            localStorage.setItem('token', response.data.token)
            history.push('/dashboard')
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }

            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }
    }

    if(localStorage.getItem('token'))
    {
        return(<Navigate replace to='/dashboard' />)
    }

    else
    {
        return(
            <Fragment>
                <NavModule />
                <form className='box' onSubmit = { getOTP } style={{ display: show.step1? 'block': 'none' }}>   
                    <p className='boxhead'>Sign Up</p>
                    <input type='text' name='name' placeholder='Your Name' onChange={ (e) => setState({ ...state, name: e.target.value }) } required autoComplete = {'off'}  minLength={3} maxLength={40} />
                    <input type='email' name='email' placeholder='Email Address' onChange={ (e) => setState({ ...state,  email: e.target.value }) } required autoComplete = {'off'}  minLength={4} maxLength={40}/>
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Continue<i className='fas fa-chevron-right'></i></button><br/>
                    <Link to='/identity/signin' className='boxlink'>Already a member? Sign In</Link>
                </form> 
                <form className='box' onSubmit = { register } style={{ display: show.step2? 'block': 'none' }}>   
                    <p className='boxhead'>Sign Up</p>
                    <input type='password' name='password' placeholder='Choose a Password' onChange={ (e) => setState({ ...state,  password: e.target.value }) } required autoComplete = {'off'}  minLength={8} maxLength={20}/>
                    <input type='password' name='otp' placeholder='Enter OTP sent to you' onChange={ (e) => setState({ ...state,  otp: e.target.value }) } required autoComplete = {'off'}  minLength={6} maxLength={6}/>      
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Sign Up<i className='fas fa-chevron-right'></i></button>
                </form>
            </Fragment>
        )
    }
}

//Sign In Component
const SignIn : React.FC = () =>
{
    const [state, setState] = useState({ email: '', password: '', otp: '', hash:'', alert: '' })
    const [show, setShow] = useState({ step1: true, step2: false })
    const history: any = useNavigate()

    let getOTP = async(e: any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Please wait' })

        try 
        {     
            const response = await axios.post('/api/identity/signin/getotp', state)
            setState({ ...state, hash: response.data.hash, alert: response.data.msg })
            setShow({ step1: false, step2: true })
        } 

        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }

            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }
    }


    let login = async(e: any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Signing in' })

        try 
        {
            const res = await axios.post('/api/identity/signin/login', state)
            axios.defaults.headers.common['x-auth-token'] = res.data.token
            localStorage.setItem('token', res.data.token)
            history.push('/dashboard')
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }

            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }
    }

    if(localStorage.getItem('token'))
    {
        return (<Navigate replace to='/dashboard' />)
    }

    else
    {
        return (
            <Fragment>
                <NavModule />
                <form className='box' onSubmit = { getOTP } style={{ display: show.step1? 'block': 'none' }}>   
                    <p className='boxhead'>Sign In</p>
                    <input type='email' name='email' placeholder='Email Address' onChange={ (e) => setState({ ...state, email: e.target.value }) } required autoComplete = {'off'}/>
                    <input type='password' name='password' placeholder='Password' onChange={ (e) => setState({ ...state, password: e.target.value }) } required autoComplete = {'off'}/>
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Continue<i className='fas fa-chevron-right'></i></button><br/>
                    <Link to='/identity/pwreset' className='boxlink'>Forgot password? Reset here</Link>
                </form>  
                <form className='box' onSubmit = { login } style={{ display: show.step2? 'block': 'none' }}>   
                    <p className='boxhead'>Sign In</p>
                    <input type='password' name='otp' placeholder='Enter OTP sent to you' onChange={ (e) => setState({ ...state,  otp: e.target.value }) } required autoComplete = {'off'}  minLength={6} maxLength={6}/>
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Sign In<i className='fas fa-chevron-right'></i></button>
                </form>
            </Fragment>   
        )
    }
}

//Password Reset Component
const PasswordReset : React.FC = () =>
{
    const [state, setState] = useState({ email: '', password: '', otp: '', hash:'', alert: '' })
    const [show, setShow] = useState({ step1: true, step2: false })
    const history: any = useNavigate()
    
    let getOTP = async(e: any) =>
    {
        e.preventDefault()    
        setState({ ...state, alert: 'Please wait' })

        try 
        { 
            const response: any = await axios.post('/api/identity/pwreset/getotp', state)
            setState({ ...state, hash: response.data.hash, alert: response.data.msg })
            setShow({ step1: false, step2: true })
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }

            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }
    }

    let reset = async(e: any) =>
    {
        e.preventDefault()
        setState({ ...state, alert: 'Resetting password' })

        try 
        {     
            const res = await axios.post('/api/identity/pwreset/reset', state)
            axios.defaults.headers.common['x-auth-token'] = res.data.token
            localStorage.setItem('token', res.data.token)
            history.push('/dashboard')
        } 
        
        catch (error: any) 
        {
            if(error.response)
            {
                setState({ ...state, alert: error.response.data.msg })
            }
            else
            {
                setState({ ...state, alert: 'Connection error' })
            }
        }   
    }

    if(localStorage.getItem('token'))
    {
        return (<Navigate replace to='/dashboard' />)
    }

    else
    {
        return (
            <Fragment>
                <NavModule />
                <form className='box' onSubmit = { getOTP } style={{ display: show.step1? 'block': 'none' }}>   
                    <p className='boxhead'>Reset Password</p>
                        <input type='email' name='email' placeholder='Email Address' onChange={ (e) => setState({ ...state, email: e.target.value }) } required autoComplete = {'off'}  />
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Continue<i className='fas fa-chevron-right'></i></button>
                </form> 
                <form className='box' onSubmit = { reset } style={{ display: show.step2? 'block': 'none' }}>   
                    <p className='boxhead'>Reset Password</p>
                    <input type='password' name='otp' placeholder='Enter OTP sent to you' onChange={ (e) => setState({ ...state, otp: e.target.value }) } required autoComplete = {'off'} minLength={6} maxLength={6}/>
                    <input type='password' name='password' placeholder='Enter New Passweod' defaultValue='' onChange={ (e) => setState({ ...state, password: e.target.value }) } required autoComplete = {'off'} minLength={8} maxLength={20}/>
                    <p id='alert'>{ state.alert }</p>
                    <button type='submit' className='btn btnsubmit'>Reset Password<i className='fas fa-chevron-right'></i></button>
                </form> 
            </Fragment>  
        ) 
    }
}

//Sign Out Component
const SignOut : React.FC = () =>
{
    //LOGIC
    localStorage.removeItem('token')
  
    //JSX
    return <Navigate replace to = '/identity/signin' />
}

//Export Statement
export { SignUp, SignIn, PasswordReset, SignOut }