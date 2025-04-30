import React, {useEffect, useState } from 'react';
import Modal from 'react-modal';
import "../styles/ModalNewProject.css";
import {Transition} from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import {ReactComponent as IconClose} from '../svg/icons8-close-24.svg';


const ModalNewProject=({CreateEditMode,isOpen,onClose,onSubmitFunc,showM,toggleShow,passedProject})=>{
    
    // const getInitialValueProjectName = () => {
    //     if ( (pName!==undefined && pName!=='')) { // don't update unnecessarily
    //         return pName;
    //     }
    //     return null;
    //   }
    //   const getInitialValueProjectDescription = () => {
    //     // if (projectName !== pName) { // don't update unnecessarily
    //     //     setProjectName(pName);
    //     // }
    //     if ((pDescription!==undefined && pDescription!=='')) { // don't update unnecessarily
    //         //setProjectDescription(pDescription);
    //         return pDescription;
    //     }
    //     return null;
    //   }
    const [projectName,setProjectName]=useState();
    const [projectDescription,setProjectDescription]=useState();
    const [project,setProject]=useState();

    const node1Ref = React.useRef(null);

    useEffect(()=>{
        if (CreateEditMode==='Edit' && passedProject!==undefined)
        {
            console.log(CreateEditMode);
            setProjectName(passedProject.name);
            setProjectDescription(passedProject.description);
            setProject(passedProject)
        }
        },[passedProject])

    
    
   

    const [show,setShow]=useState(showM);

    const handleClose=()=>setShow(false);
    const handleShow=()=>setShow(true);

    function somefunction(projectName,projectDescription){
        
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
                        console.log("setProjectName "+projectName);
                        //setProjectName('');
                        console.log("setProjectName AFTER "+projectName);
                        console.log("setProjectDescription "+projectDescription);
                        //setProjectDescription('');
                        console.log("setProjectDescription AFTER "+projectDescription);
                        console.log("call onSubmitFunc  with "+projectName+","+projectDescription);
                        
                        if (CreateEditMode==='Create')
                        {
                            onSubmitFunc(projectName,projectDescription);
                        }
                        if (CreateEditMode==='Edit')
                        {
                            let updateProject=project;
                            updateProject.name=projectName;
                            updateProject.description=projectDescription;
                            onSubmitFunc(updateProject);
                        }
                        
                        console.log("form onSubmitFunc AFTER");
                        }
                        }>
                        <div className='form-content'>
                        <div>
                        <label>Название проекта</label>
                        </div>
                        <div>
                        <input type="text" name="projectName" value={projectName} onChange={e => setProjectName(e.target.value)}></input>
                        </div>
                        <div>
                        <label>Описание проекта</label>
                        </div>
                        <div>
                        <textarea name="projectDescription" rows="15" value={projectDescription} onChange={e => setProjectDescription(e.target.value)}>
                        </textarea>
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
export default ModalNewProject;