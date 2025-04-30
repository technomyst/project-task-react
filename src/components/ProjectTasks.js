import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewProjectTask from "./ModalNewProjectTask";
import ProjectTaskItem from "./ProjectTaskItem";

const URL_API = `http://localhost:5158/api/ProjectTasks/Project/`;
const URL_API_ProjectTasks = `http://localhost:5158/api/ProjectTasks`;

const ProjectTasks=({ projectId })=>{
    const [allProjectTasks, setProjectTasks] = useState([]);

    const [ModalInfoIsOpen,setModalInfoOpen]=useState(false);
    const [show,setShow]=useState(false);
    const [lastAddedProjectTaskIds, setLastAddedProjectTaskId] = useState([]);

    function toggleShow(){
        console.log('toggleShow'+show);
        let k=!show;
        console.log('toggleShow k '+k);
        setShow(k);
        console.log('toggleShow'+show);
    }

    useEffect(() => {
        if(!projectId) { return };
        {
            let res=projectId!=='undefined';
            let res2=projectId===undefined;
            getProjectTasks();
        }
    }, [projectId])

    const getProjectTasks =  async () => {
        const options = {
            method: 'GET',
            names: new Headers()
        }
        const result = await fetch(URL_API+projectId, options);
        if (result.ok) {
            const ProjectTasks = await result.json();
            setProjectTasks(ProjectTasks);
            return ProjectTasks;
        }
        else
        {
            let k=1;            
        }
        return [];
    }

    const addProjectTask = async (projectTaskName,projectTaskDescription,projectId) => {

        //const nameFromUser = document.querySelector('#name').value;
        //const descriptionFromUser = document.querySelector('#description').value;
        console.log ("AddProjectTask Function is here "+projectTaskName+","+projectTaskDescription);
        const newProjectTask = {
            name: projectTaskName,
            description: projectTaskDescription,
            projectId:projectId
        };

        const names = new Headers();
        names.set('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: names,
            body: JSON.stringify(newProjectTask)
        };
        console.log (JSON.stringify(newProjectTask));

        const result = await fetch(URL_API_ProjectTasks, options)
                                //.then(response => resp=response.json())
                                //.then(data => {console.log(data);setModalInfoOpen(false);})
                                .catch(error => {alert("Ошибка при добавлении проекта!");console.error(error)});
        
        if (result!==undefined && result.ok){
            setModalInfoOpen(false);
            const project = await result.json();
            console.log('result.json()  '+JSON.stringify(project));
            allProjectTasks.unshift(project);
            lastAddedProjectTaskIds.push(project.id)
            setLastAddedProjectTaskId(lastAddedProjectTaskIds);
            console.log('ProjectTask pushed');
            console.log(allProjectTasks);
            console.log(allProjectTasks.slice());
            setProjectTasks(allProjectTasks.slice());
        }
    }

    return(
<div>
    Список Задач <button className="modal-show-button"
                onClick={()=>setModalInfoOpen(true)}
                /*onClick={()=>toggleShow()}*/
                >+ Новая задача</button>
                <ModalNewProjectTask
                CreateEditMode="Create"
                isOpen={ModalInfoIsOpen}
                onClose={()=>setModalInfoOpen(false)}
                onSubmitFunc={addProjectTask}
                show={show}
                toggleShow={toggleShow}
                projectId={projectId}
                ></ModalNewProjectTask>
    <div>{allProjectTasks.map(x => <ProjectTaskItem key={x.id} projectTask={x}  isNew={lastAddedProjectTaskIds.includes(x.id)}/>)}</div>
</div>
    );
}
export default ProjectTasks;