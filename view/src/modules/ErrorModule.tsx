//Import Statements
import React, { Fragment } from 'react'

//Error Module Component
const ErrorModule : React.FC = (props : any) =>
{
    return (
        <Fragment>
            <div className='box'> 
                <p className='boxhead'>{ props.message ? props.message : '404, Lost' }</p>
                <button onClick={ () => window.history.back() } className='btn btnsubmit'><i className='fas fa-chevron-left'></i>Go Back</button>
            </div>
        </Fragment>
    )
}

//Export Statement
export default ErrorModule