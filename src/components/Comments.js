import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewComment from "./ModalNewComment";

import {URL_Comments} from "./Api";
import {CommentItem} from "./CommentItem"

const Comments = (parentEntity,typeOfParentEntity) => {

    const [allComments, setComments] = useState([]);
    const [ModalInfoIsOpen,setModalInfoOpen]=useState(false);
    const [show,setShow]=useState(false);
    const [lastAddedCommentIds, setLastAddedCommentId] = useState([]);
    
    function toggleShow(){
        console.log('toggleShow'+show);
        let k=!show;
        console.log('toggleShow k '+k);
        setShow(k);
        console.log('toggleShow'+show);
    }

    const addComment = async (UserName,CommentText,parentEntity,typeOfParentEntity) => {

        //const nameFromUser = document.querySelector('#name').value;
        //const descriptionFromUser = document.querySelector('#description').value;
        console.log ("AddComment Function is here "+UserName+","+CommentText+"for"+typeOfParentEntity+" id="+parentEntity.id);
        
        const newComment = {
            commentText: CommentText,
            userName: UserName,
            sourceId:parentEntity.id,
            sourcetype:typeOfParentEntity,
        };

        const names = new Headers();
        names.set('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: names,
            body: JSON.stringify(newComment)
        };
        console.log (JSON.stringify(newComment));

        const result = await fetch(URL_Comments, options)
                                //.then(response => resp=response.json())
                                //.then(data => {console.log(data);setModalInfoOpen(false);})
                                .catch(error => {alert("Ошибка при добавлении комментария!");console.error(error)});
        
        if (result!==undefined && result.ok){
            setModalInfoOpen(false);
            const project = await result.json();
            console.log('result.json()  '+JSON.stringify(project));
            allComments.unshift(project);
            lastAddedCommentIds.push(project.id)
            setLastAddedCommentId(lastAddedCommentIds);
            console.log('ProjectTask pushed');
            console.log(allComments);
            console.log(allComments.slice());
            setComments(allComments.slice());
        }
    }

    return (
        <div>
            Комментарии к проекту <button className="modal-show-button"
                onClick={()=>setModalInfoOpen(true)}
                /*onClick={()=>toggleShow()}*/
                >+ Добавить комментарий к проекту</button>
                <ModalNewComment
                CreateEditMode="Create"
                isOpen={ModalInfoIsOpen}
                onClose={()=>setModalInfoOpen(false)}
                onSubmitFunc={addComment}
                show={show}
                toggleShow={toggleShow}
                entity={project}
                entityType={entityType}
                ></ModalNewComment>
            <div>
                <CommentItem>
                </CommentItem>
            </div>
        </div>
    );
}
export default Comments;