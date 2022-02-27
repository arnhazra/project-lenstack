//Import Statements
import React from 'react'

//Offline Module Component
const OfflineModule : React.FC = () => 
{
    return (
        <div className='box text-center'>
            <p className='boxhead'>You're offline</p> 
            <p className='boxhead'>Reconnecting</p> 
            <i className='fas fa-plane fa-spin fa-5x'></i>
        </div>
    )
}

//Export Statement
export default OfflineModule