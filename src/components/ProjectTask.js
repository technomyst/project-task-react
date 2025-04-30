import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewProject from "./ModalNewProject";
import Comments from "./Comments";

const ProjectTask=(projectTask)=>{
    
    return(
<div>
    <div>{projectTask.name}</div>
    <div>{projectTask.description}</div>
    <div>Комментарии Задачи</div>
    <div><Comments>
        </Comments>
    </div>
</div>
    );
}
export default ProjectTask;