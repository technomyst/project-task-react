import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import ModalButton from "./ModalBtn";
import ModalNewProject from "./ModalNewProject";
import ProjectTasks from "./ProjectTasks";
import Comments from "./Comments";

const URL = `http://localhost:5158/api/projects/`;

const Project = () => {
    const{id}=useParams();
    const [project,setProject]=useState([]);
    const [ModalInfoIsOpen,setModalInfoOpen]=useState(false);
    const [show,setShow]=useState(false);
    function toggleShow(){
        console.log('toggleShow'+show);
        let k=!show;
        console.log('toggleShow k '+k);
        setShow(k);
        console.log('toggleShow'+show);
    }

    

    const getProject =  async () => {
        const options = {
            method: 'GET',
            names: new Headers()
        }
        const result = await fetch(URL+id, options);
        if (result.ok) {
            const projectData = await result.json();
            setProject(projectData);
            return projectData;
        }
        else
        {
            let k=1;            
        }
        return [];
    }
    const deleteProject = (id) => {
        const options = {
            method: 'DELETE',
            names: new Headers()   
        }
        fetch(URL + `/${id}`, options);
        //setProjects(allProjects.filter(x => x.id !== id));
        alert("Проект был успешно  удален!");
    } 

    const updateProject = async (oldProject) => {
        //const names = new Headers();
        //names.set('Content-Type', 'application/json');

        const options = {
            method: 'PUT',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify(oldProject)
        };
        console.log(options.headers);
        const result = await fetch(URL+oldProject.id, options);
        if (result.ok){
            console.log(result);
            //const data = await result.json();
            //const updatedProject = allProjects.findIndex(x => x.id === oldProject.id);
            //allProjects[updatedProject] = project;
            //setProjects(allProjects.slice());
            //console.log(data);
            alert("Данные проекта обновлены!");
            
        }
    }


    useEffect(()=>{
        console.log("Project useEffect "+URL);
        getProject();
    }, [])

    const deleteAction=(id)=>{deleteProject(id);}
    const updateAction=(oldProject)=>{updateProject(oldProject);}

    return (
       
        /*<div>
            <Project 
            project={project}            
            deleteAction={deleteAction}
            updateAction={updateAction}
            isNew={lastAddedProjectIds.includes(project.id)}>
            </Project>
        </div>*/

         <div>
            <Link to="/projects"><button>← Назад</button></Link>
        <div className="project-container" /*style={{backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '10px'}}*/>
            <h2>{project.name}</h2> 
            
            <button className="modal-show-button"
                onClick={()=>setModalInfoOpen(true)}
                /*onClick={()=>toggleShow()}*/
                >Редактировать проект</button>
                <ModalNewProject 
                CreateEditMode="Edit"
                isOpen={ModalInfoIsOpen}
                onClose={()=>setModalInfoOpen(false)}
                onSubmitFunc={updateProject}
                show={show}
                toggleShow={toggleShow}
                passedProject={project}
                >
                <h2>ModalInfo</h2>
                </ModalNewProject>

            <p>{project.description}</p>
            
            <div style={{display: 'flex'}}>
                <button onClick={() => deleteAction(project.id)}>Delete</button>
                <ModalButton 
                    btnName={'Update'} 
                    title={'Update project'}
                    modalContent={
                        <div>
                            <div style={{margin: '10px'}}>
                                <input id="header" type="text" 
                                    defaultValue={project.name}
                                    onChange={e => project.name = e.target.value}
                                    />
                            </div>
                            <div style={{margin: '10px'}}>
                                <textarea  id="text" 
                                    defaultValue={project.description}
                                    onChange={e => project.description = e.target.value}/>
                            </div>
                            <button onClick={() => updateAction(project)}>Update project</button>    
                        </div>                    
                    }/>
            </div>
       {/*} </Link>*/}     
        </div>
        <div>
            
            <ProjectTasks
            projectId={project.id}>

            </ProjectTasks>
        </div>

        <div>Комментарии Проекта
        <div><Comments
            parentEntity={project.id}
            typeOfParentEntity="Project">
             </Comments>
          </div>
        </div>
        
        </div>
       
          
          
    );
}
export default Project;