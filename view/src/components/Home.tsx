//Import Statements
import { Navigate, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import React, { Fragment, useEffect } from 'react'
import NavModule from '../modules/NavModule'
import axios from 'axios'

//Home Component
const Home : React.FC = () =>
{
    let log = {
        component: 'home',
        event: 'load page',
        info: 'no info'
    }
    useEffect(() => {
      (async() => {
          await axios.post('https://lenstack.herokuapp.com/api/analytics/new/6219eaee3bff4963f3aa6863', log)
      })()
    }, [])
    
    //JSX
    if(localStorage.getItem('token'))
    {
        return <Navigate replace to='/dashboard' />
    }

    else
    {
        return(
            <Fragment>
                <NavModule />
                <Container>
                    <div className='cover covertext'>
                        <p className='display-4 fw-bold'>
                            Lenstack <br/> 
                            Your frameworks <br/>
                            Your analytics
                        </p>
                        <p className='lead my-4 fw-bold'>
                            Limitless analytics with realtime insights. <br/> Analytics for your apps & services. <br/>Start measuring with a free account and 10 free projects.
                        </p>
                        <Link to ='/identity/signup' className='btn'>Get an account<i className='fas fa-chevron-right'></i></Link>
                        <Link to ='/identity/signin' className='btn'>Sign In<i className='fas fa-chevron-right'></i></Link>
                    </div>
                </Container>
            </Fragment> 
        )
    }  
}    

//Export Statement
export { Home }