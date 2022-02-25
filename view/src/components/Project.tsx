import { Fragment, useState } from "react";
import NavModule from "../modules/NavModule";

const CreateProject: React.FC<any> = () => 
{
    const [project, setProject] = useState({ title: '', description: '', authorizeduri: '', alert: '' })
    let saveProject = (e) => 
    {
        e.preventDefault()
    }

    return (
        <Fragment>
            <NavModule />
            <form className="box" onSubmit={ saveProject }>
                <p className="boxhead">Create Project</p>
                <input type="text" placeholder='Project Name' />
                <input type="text" placeholder='Authorized URI' />
                <button className="btn" type="submit">Save<i className='fas fa-chevron-right'></i></button>
            </form>
        </Fragment> 
    );
}

const ProjectLibrary: React.FC<any> = () => 
{
    return (<></>)
}

const ViewProject: React.FC<any> = () => 
{
    return (<></>)
}

export { CreateProject, ProjectLibrary, ViewProject }