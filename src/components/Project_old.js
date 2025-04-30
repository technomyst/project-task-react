// const Project =(props) =>{

//     const {name, age} = props;
//     return(
//         <div>
//             <h3>{props.name}</h3>
//             <p>{props.description}</p>
//         </div>
//     )
// }

// Project.defaultProps = {name: "Проект0", description: "Это проект по умолчанию (пока не загружены данные)"};

import ModalButton from "./ModalBtn";
import "../styles/Project.css";
import { Link } from "react-router-dom";



const Project = ({project, deleteAction, updateAction,isNew}) => {

    return (

        <div className={isNew? "project-border new-created-project" : "project-border"} onAnimationEnd={(event)=>{event.target.classList.remove('new-created-project');}} >
            <Link to = {"/projects/"+project.id} >
        <div className="project-container" /*style={{backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '10px'}}*/>
            <h2>{project.name}</h2>
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
        </div>
        </Link>
        </div>
    )
}

export default Project;