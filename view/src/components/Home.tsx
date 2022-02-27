//Import Statements
import { Navigate, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import React, { Fragment, useEffect } from 'react'
import NavModule from '../modules/NavModule'
import axios from 'axios'

//Home Component
const Home : React.FC = () =>
{
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
                            Your analytics, from the web <br/>
                            on the cloud
                        </p>
                        <p className='lead my-4 fw-bold'>
                            Limitless analytics with realtime insights. Analytics for your apps & services. <br/>Start measuring with a free account and 10 free projects.
                        </p>
                        <Link to ='/identity/signup' className='btn'>Get an account<i className='fas fa-chevron-right'></i></Link>
                    </div>
                </Container>
            </Fragment> 
        )
    }  
}    

//Export Statement
export { Home }