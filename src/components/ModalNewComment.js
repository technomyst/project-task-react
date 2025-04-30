import React, {useEffect, useState } from 'react';
import Modal from 'react-modal';
import "../styles/ModalNewProject.css";
import {Transition} from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import {ReactComponent as IconClose} from '../svg/icons8-close-24.svg';


const ModalNewComment=({CreateEditMode,isOpen,onClose,onSubmitFunc,showM,toggleShow,passedEntity,EntityType})=>{
    
    const [projectTaskName,setProjectTaskName]=useState();
    const [projectTaskDescription,setProjectTaskDescription]=useState();
    const [projectTask,setProjectTask]=useState();

    const node1Ref = React.useRef(null);

    useEffect(()=>{
        if (CreateEditMode==='Edit' && passedEntity!==undefined)
        {
            console.log(CreateEditMode);
            setProjectTaskName(passedEntity.name);
            setProjectTaskDescription(passedEntity.description);
            setProjectTask(passedEntity)
        }
        },[passedEntity])

    
    
   

    const [show,setShow]=useState(showM);

    const handleClose=()=>setShow(false);
    const handleShow=()=>setShow(true);

    function somefunction(projectName,projectDescription,projectId){
        
        console.log("somefunction:"+projectName+","+projectDescription);
        alert("somefunction:"+projectName+","+projectDescription);
        //onSubmitFunc(projectName,projectDescription);
    }
    //handleChange = (e) => this.setState({name: e.target.value})

    return (
        <CSSTransition nodeRef={node1Ref} in={isOpen} timeout={350} unmountOnExit={true}>
        {/*<>*/}
        {/*<Transition in={showM} timeout={350} unmountOnExit={true}>
        {(state) =>(
            <CSSTransition nodeRef={node1Ref} in={isOpen} timeout={350} unmountOnExit={true}></CSSTransition>*/}
        
        {/*{isOpen &&*/}
        {(state) =>(
        <div ref={node1Ref} className={`modal-new-project modal-new-project--${state}`}>
            <div className="modal-wrapper">
                <div className="modal-content">
                <button className="modal-close-button" onClick={()=>onClose()} /*onClick={toggleShow}*/>
                <IconClose/></button>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        console.log("form onSubmit");
                        console.log("setProjectName "+projectTaskName);
                        //setProjectName('');
                        console.log("setProjectName AFTER "+projectTaskName);
                        console.log("setProjectDescription "+projectTaskDescription);
                        //setProjectDescription('');
                        console.log("setProjectDescription AFTER "+projectTaskDescription);
                        console.log("call onSubmitFunc  with "+projectTaskName+","+projectTaskDescription);
                        
                        if (CreateEditMode==='Create')
                        {
                            onSubmitFunc(projectTaskName,projectTaskDescription,projectId);
                        }
                        if (CreateEditMode==='Edit')
                        {
                            let updateProjectTask=projectTask;
                            updateProjectTask.name=projectTaskName;
                            updateProjectTask.description=projectTaskDescription;
                            onSubmitFunc(updateProjectTask);
                        }
                        
                        console.log("form onSubmitFunc AFTER");
                        }
                        }>
                        <div className='form-content'>
                        <div>
                        <label>Название задачи</label>
                        </div>
                        <div>
                        <input type="text" name="projectName" value={projectTaskName} onChange={e => setProjectTaskName(e.target.value)}></input>
                        </div>
                        <div>
                        <label>Описание Задачи</label>
                        </div>
                        <div>
                        <textarea name="projectDescription" rows="15" value={projectTaskDescription} onChange={e => setProjectTaskDescription(e.target.value)}>
                        </textarea>
                        </div>
                        <div>
                            <label>
                            Исполнитель:
                            <select name="Executor">

                            </select>
                            </label>
                        </div>
                        <div className='button-submit'>
                        <button type="submit" text>{CreateEditMode==='Create'? 'Создать':'Сохранить изменения'}</button>
                        </div>
                        </div>
                    </form>
                    {/*{children}*/}
                </div>
            
            </div>
        </div>
    )}
    {/*</Transition></>*/}
    </CSSTransition>
    

      );

    }
export default ModalNewComment;