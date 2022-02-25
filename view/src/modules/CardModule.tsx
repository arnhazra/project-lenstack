import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CardModule = ({ icon, name, description, link }) => {
    return(
        <Col xs={12} sm={12} md={6} lg={6} xl={4} key={ icon }>
            <Link to = { link } >
                <Card className='text-center'>     
                    <Card.Header>
                        <p className="boxhead" style={{ marginBottom: '60px' }}>{ name }</p>
                        <i className={`fa-solid ${ icon } fa-3x`} style={{ marginBottom: '30px' }}></i>
                    </Card.Header>
                    <Card.Footer>
                        <p className="lead">{ description }</p>
                    </Card.Footer>
                </Card>
            </Link>
        </Col>
    )
}

//Export Statement
export default CardModule