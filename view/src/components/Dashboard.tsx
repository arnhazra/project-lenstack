//Import Statements
import React, { Fragment, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import LoadingComponent from '../shared/LoadingComponent'
import useSession from '../hooks/useSession'
import NavComponent from '../shared/NavComponent'
import { Link } from 'react-router-dom'
import greetingTime from 'greeting-time'

//Dashboard Component
const Dashboard: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()
    const greet = greetingTime(new Date())

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
                    <NavComponent />
                    <Container>
                        <div className='cover covertext'>
                            <p className='display-2 fw-bold'>{ greet + ', ' + session.name.split(' ')[0]  }</p>
                            <p className='lead my-4 fw-bold'>
                                Lenstack Analytics lets you measure your application usage/traffic <br /> 
                                using API endpoints and display in real time on your project dashboard.
                            </p>
                            <Link to='/project/new'><button className='btn'>New Project<i className='fas fa-chevron-right'></i></button></Link>  
                            <Link to='/project/library'><button className='btn'>Project Library<i className='fas fa-chevron-right'></i></button></Link>  
                        </div>
                    </Container>
                </Fragment>   
            )
        }

        else
        {
            return <LoadingComponent />
        }   
    }
}



//Export Statement
export { Dashboard }