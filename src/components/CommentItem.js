import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";
import ModalNewProject from "./ModalNewProject";

const CommentItem=(comment)=>{
    
    return(
<div>
    <div>{comment.userName}</div>
    <div>{comment.commentText}</div>
    <div></div>
</div>
    );
}
export default CommentItem;