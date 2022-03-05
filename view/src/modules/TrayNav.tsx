//Import Statements
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//Navigation Module Component
const TrayNav = (props: any) =>
{
    return(
        <Navbar variant='light' expand='lg'>
            <Container>
                <Link to={`/project/view/${props.id}`}>
                    <Navbar.Brand>
                        Project
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className='ms-auto'>
                        <Link to={`/project/apidoc/${props.id}`}><Navbar.Brand>API Doc</Navbar.Brand></Link>
                        <Link to={`/project/analytics/${props.id}`}><Navbar.Brand>Analytics</Navbar.Brand></Link>
                        <Link to={`/project/update/${props.id}`}><Navbar.Brand>Update Project</Navbar.Brand></Link>
                        <Link to={`/project/delete/${props.id}`}><Navbar.Brand>Delete Project</Navbar.Brand></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

//Export Statement
export default TrayNav