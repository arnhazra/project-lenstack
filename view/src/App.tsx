import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import useDetectOffline from 'use-detect-offline'
import { Home } from './components/Home'
import { SignUp, SignIn, SignOut, PasswordReset } from './components/Identity'
import { Dashboard } from './components/Dashboard'
import { CloseAccount, UpdateAccount } from './components/Account'
import { NewProject, DeleteProject, ProjectLibrary, UpdateProject, ViewProject, ProjectAnalytics, APIDoc } from './components/Project'
import ErrorComponent from './shared/ErrorComponent'
import OfflineComponent from './shared/OfflineComponent'


const App : React.FC = () => 
{
    const { offline } = useDetectOffline()

    if(offline)
    {
        return <OfflineComponent />
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

                    <Route path='/project/new' element = { <NewProject /> } />
                    <Route path='/project/library' element = { <ProjectLibrary /> } />
                    <Route path='/project/view/:id' element = { <ViewProject /> } />
                    <Route path='/project/apidoc/:id' element = { <APIDoc /> } />
                    <Route path='/project/analytics/:id' element = { <ProjectAnalytics /> } />
                    <Route path='/project/update/:id' element = { <UpdateProject /> } />
                    <Route path='/project/delete/:id' element = { <DeleteProject /> } />

                    <Route path='/account' element = { <UpdateAccount /> } />
                    <Route path='/account/close' element = { <CloseAccount /> } />
                    <Route path='*' element = { <ErrorComponent /> } />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App