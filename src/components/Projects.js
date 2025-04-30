import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewProject from "./ModalNewProject";

import ProjectItem from "./ProjectItem";



const URL = `http://localhost:5158/api/projects`;

const Projects = () => {
    const [allProjects, setProjects] = useState([]);
    const [ModalInfoIsOpen,setModalInfoOpen]=useState(false);
    const [show,setShow]=useState(false);
    const [lastAddedProjectIds, setLastAddedProjectId] = useState([]);

    function toggleShow(){
        console.log('toggleShow'+show);
        let k=!show;
        console.log('toggleShow k '+k);
        setShow(k);
        console.log('toggleShow'+show);
    }

    const getProjects =  async () => {
        const options = {
            method: 'GET',
            names: new Headers()
        }
        const result = await fetch(URL, options);
        if (result.ok) {
            const Projects = await result.json();
            setProjects(Projects);
            return Projects;
        }
        else
        {
            let k=1;            
        }
        return [];
    }

    const addProject123 = ()=> console.log("addProject123");

    const addProject = async (projectName,projectDescription) => {

        //const nameFromUser = document.querySelector('#name').value;
        //const descriptionFromUser = document.querySelector('#description').value;
        console.log ("AddProject Function is here "+projectName+","+projectDescription);
        const newProject = {
            name: projectName,
            description: projectDescription
        };

        const names = new Headers();
        names.set('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: names,
            body: JSON.stringify(newProject)
        };
        console.log (JSON.stringify(newProject));
        let resp;
        const result = await fetch(URL, options)
                                //.then(response => resp=response.json())
                                //.then(data => {console.log(data);setModalInfoOpen(false);})
                                .catch(error => {alert("Ошибка при добавлении проекта!");console.error(error)});
        console.log('result'+result);
        console.log(result!==undefined);
        console.log('result ok '+result.ok);
        console.log('response  '+resp);
        
        if (result!==undefined && result.ok){
            setModalInfoOpen(false);
            console.log('TRUE');
            console.log(result.ok);
            const project = await result.json();
            console.log('result.json()  '+JSON.stringify(project));
            //setProjects([...allProjects,project]);
            //allProjects.push(project);
            allProjects.unshift(project);
            lastAddedProjectIds.push(project.id)
            setLastAddedProjectId(lastAddedProjectIds);
            console.log('Project pushed');
            console.log(allProjects);
            console.log(allProjects.slice());
            setProjects(allProjects.slice());
        }
    }

    const updateProject = async (oldProject) => {
        const names = new Headers();
        names.set('Content-Type', 'application/json');

        const options = {
            method: 'PATCH',
            names: names,
            body: JSON.stringify(oldProject)
        };

        const result = await fetch(URL, options);
        if (result.ok){
            const project = await result.json();
            const updatedProject = allProjects.findIndex(x => x.id === oldProject.id);
            allProjects[updatedProject] = project;
            setProjects(allProjects.slice());
            
        }
    }

    const deleteProject = (id) => {
        const options = {
            method: 'DELETE',
            names: new Headers()   
        }
        fetch(URL + `/${id}`, options);
        setProjects(allProjects.filter(x => x.id !== id));
    } 

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div>
            <div>
                <button className="modal-show-button"
                onClick={()=>setModalInfoOpen(true)}
                /*onClick={()=>toggleShow()}*/
                >Новый проект</button>
                <ModalNewProject 
                CreateEditMode="Create"
                isOpen={ModalInfoIsOpen}
                onClose={()=>setModalInfoOpen(false)}
                onSubmitFunc={addProject}
                show={show}
                toggleShow={toggleShow}
                >
                <h2>ModalInfo</h2>
                </ModalNewProject>
                {/*
                onSubmitFunc={() =>{console.log("Projects.onSubmitFunc");addProject(nameFromUser,descriptionFromUser);}}
                <p>Создание постов</p>
                <div style={{margin: '10px'}}>
                    <input id="name" type="text" />
                </div>
                <div style={{margin: '10px'}}>
                    <textarea  id="text"/>
                </div>
                <button onClick={() => addProject()}>Add project</button>             */}
            </div>
            <div>
                {allProjects.map(x => <ProjectItem key={x.id} project={x} deleteAction={deleteProject} updateAction={updateProject} isNew={lastAddedProjectIds.includes(x.id)}/>)}
            </div>
        </div>
    )
};

export default Projects;


