import { Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CardComponent = (props) => 
{
    return(
        <ListGroup.Item key={ props.id }>
            <Row className='align-items-center'>
                <Col style={{ textAlign: "left", marginTop: "12px" }}>
                    <p className='boxhead fw-bold'>{ props.title }</p>
                </Col>
                <Col style={{ textAlign: "right", marginTop: "2px" }}>
                    <Link to={ `/project/view/${props.id}` }>
                        <i className="fa-solid fa-square-up-right fa-3x"></i>
                    </Link>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

//Export Statement
export default CardComponent