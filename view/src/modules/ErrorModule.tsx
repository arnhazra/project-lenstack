//Import Statements
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import NavModule from './NavModule'

//Error Module Component
const ErrorModule : React.FC = (props : any) =>
{
    return (
        <Fragment>
            <NavModule />
            <div className='box'> 
                <p className='boxhead'>{ props.message ? props.message : '404, Lost' }</p>
                <Link to='/project/library' className='btn btnsubmit'><i className='fas fa-chevron-left'></i>Go Back</Link>
            </div>
        </Fragment>
    )
}

//Export Statement
export default ErrorModule