//Import Statements
import React, { Fragment } from 'react'
import NavModule from './NavComponent'

//Loading Module Component
const LoadingComponent : React.FC = () =>
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
export default LoadingComponent