//Import Statements
import React, { Fragment, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import LoadingModule from '../modules/LoadingModule'
import useSession from '../hooks/useSession'
import NavModule from '../modules/NavModule'
import { Link } from 'react-router-dom'

//Dashboard Component
const Dashboard: React.FC<any> = () => 
{
    //LOGIC
    const session = useSession()

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
                    <Container>
                        <div className='cover covertext'>
                            <p className='display-4 fw-bold'>Lenstack</p>
                            <p className='display-4 fw-bold'>Hey, { session.name.split(' ')[0]  }</p>
                            <p className='lead my-4 fw-bold'>
                                Invent with purpose, Your framework, your cloud <br/>
                                Turn your ideas into reality, Explore the products <br/>
                            </p>
                            <Link to='/project/create'><button className='btn'>Create Project<i className='fas fa-chevron-right'></i></button></Link>  
                            <Link to='/project/library'><button className='btn'>Project Library<i className='fas fa-chevron-right'></i></button></Link>  
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



//Export Statement
export { Dashboard }