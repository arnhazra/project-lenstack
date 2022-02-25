//Import Statements
import React, { Fragment } from 'react'
import NavModule from './NavModule'

//Loading Module Component
const LoadingModule : React.FC = () =>
{
    return(
        <Fragment>
            <NavModule />
            <div className='cover text-center fa-6x'>
                <i className='fas fa-circle-notch fa-spin'></i>
            </div>
        </Fragment>
    )
}

//Export Statement
export default LoadingModule