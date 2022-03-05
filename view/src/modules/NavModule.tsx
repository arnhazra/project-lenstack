//Import Statements
import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//Navigation Module Component
const NavModule : React.FC = () =>
{
    if(!localStorage.getItem('token'))
    {
        return(
            <Navbar variant='light' expand='lg'>
                <Container style={{ minWidth: '90%' }}>
                    <Link to='/'>
                        <Navbar.Brand>
                            Lenstack
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle></Navbar.Toggle>
                    <Navbar.Collapse>
                        <Nav className='ms-auto'>
                            <Link to='/identity/signup'><Navbar.Brand>Sign Up</Navbar.Brand></Link>
                            <Link to='/identity/signin'><Navbar.Brand>Sign In</Navbar.Brand></Link>
                            <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Creator</Navbar.Brand></a>  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    
    else
    {
        return(
            <Navbar variant='light' expand='lg'>
                <Container style={{ minWidth: '90%' }}>
                    <Link to='/dashboard'>
                        <Navbar.Brand>
                            Dashboard
                        </Navbar.Brand>
                    </Link>  
                    <Navbar.Toggle></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>   
                            <Link to='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            <Link to='/identity/signout'><Navbar.Brand>Sign Out</Navbar.Brand></Link>             
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

//Export Statement
export default NavModule