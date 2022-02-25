import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import useDetectOffline from 'use-detect-offline'
import { Home } from './components/Home'
import { SignUp, SignIn, SignOut, PasswordReset } from './components/Identity'
import { Dashboard } from './components/Dashboard'
import { CloseAccount, UpdateAccount } from './components/Account'
import OfflineModule from './modules/OfflineModule'
import ErrorModule from './modules/ErrorModule'
import { CreateProject, ProjectLibrary, ViewProject } from './components/Project'


const App : React.FC = () => 
{
    const { offline } = useDetectOffline()

    if(offline)
    {
        return <OfflineModule />
    }

    else
    {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element = { <Home /> } />

                    <Route path='/identity/signup' element = { <SignUp /> } />
                    <Route path='/identity/signin' element = { <SignIn /> } />
                    <Route path='/identity/pwreset' element = { <PasswordReset /> } />
                    <Route path='/identity/signout' element = { <SignOut /> } />

                    <Route path='/dashboard' element = { <Dashboard /> } />

                    <Route path='/project/create' element = { <CreateProject /> } />
                    <Route path='/project/library' element = { <ProjectLibrary /> } />
                    <Route path='/project/view/:id' element = { <ViewProject /> } />

                    <Route path='/account/updatedetails' element = { <UpdateAccount /> } />
                    <Route path='/account/close' element = { <CloseAccount /> } />
                    <Route path='*' element = { <ErrorModule /> } />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App