//Import Statements
import React from 'react'

//Offline Module Component
const OfflineModule : React.FC = () => 
{
    return (
        <div className='box'>
            <p className='boxhead'>You're offline</p> 
            <i className='fas fa-wifi fa-6x'></i> 
        </div>
    )
}

//Export Statement
export default OfflineModule