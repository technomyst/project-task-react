import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewProject from "./ModalNewProject";
import Comments from "./Comments";

const ProjectTaskItem=({projectTask})=>{
    
    return(
<div>
    <div>{projectTask.name}</div>
    <div>{projectTask.description}</div>
    <div><Comments>
        </Comments>
    </div>
</div>
    );
}
export default ProjectTaskItem;