import React, { useState,useEffect, useRef } from 'react'
import flower from './download.jfif';
import { currentUser } from '../api/User'
import {AddComment} from '../api/Post'

export default function FeedPost(props) {
    props = props.post
    const [readMore,setReadMore] = useState(false);
    const [openComment,setOpenComment] = useState(false);
    const [commentList,setCommentList] = useState([]);
    const [loading,setloading] = useState(false);
    const [page,setPage] = useState(1);
    const [count,setCount] = useState(props.comment);
    const limit = 3;
    const [user,setUser] = useState(null);
    const commentContent = useRef("");

    useEffect(() => {
        const Observable = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            Observable.unsubscribe();
        }
    },[])    
    

    let Toggler = () => {
        setReadMore(!readMore);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    let loadComment = async() => {
        if(setCommentList.length > 0){
            await setPage(prev => prev + 1);
        }
        
        setloading(true);
        fetch('http://localhost:7000/api/post/commentList?page='+page+'&limit='+limit,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                postId: props._id
            })
        }).then(res => res.json()).then(doc => {
            let tempArray = [...commentList,...doc];
            setCommentList(tempArray.filter(onlyUnique) || []);
        })
        setloading(false);
    }

    let CommentToggle = ()=>{
        if(openComment === false){
            if(commentList.length === 0){
                console.log("load")
                loadComment();
            }
        }
        setOpenComment(!openComment)
    }

    let HandleAddComment = async (e) => {
        e.preventDefault();
        if(user === null){
            window.location = "/login";
            return;
        }
        
        else{
            let temp = commentContent.current.value;
            commentContent.current.value = ""
            let AddCommentResponse = await AddComment(temp,user.id,props._id);
            // console.log(AddCommentResponse);
            if(AddCommentResponse){
                AddCommentResponse.username = user.username;
                // delete AddCommentResponse._v;
                console.log(AddCommentResponse);
                let tempArray = [{_id: AddCommentResponse._id,authorId: AddCommentResponse.authorId,postId: AddCommentResponse.postId,content: AddCommentResponse.content,username: AddCommentResponse.username},...commentList];
                console.log(tempArray); 
                setCommentList(tempArray.filter(onlyUnique) || []);
                setCount(prev => prev + 1);
            }
        }
    }

    return (
        <div className="col-lg-10 col-md-11 col-12 border-top border-dark rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
            <div className="col-12 d-flex flex-column" style={{rowGap: "1rem"}}>
                <div className="d-flex justify-content-between align-items-center px-2" style={{columnGap: "1rem"}}>
                    <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                        <img src={flower} width={70} height={70} className="rounded-circle"></img>
                        <p className="fw-bold fs-4">{props.username}</p>
                    </div>
                    <i className="fa fa-ellipsis-v align-self-start"></i>
                </div>
                <div>
                    <p className={"mt-2 w-100 fw-normal "+ (!readMore ? " read-less" : "")}>{props.caption}</p>
                    <p onClick={Toggler} style={{color:"blue", cursor:"pointer", textDecoration:"underline"}}>{readMore ? "less" : "more"}</p>
                </div>
            </div>
            <img src={flower} className="w-100"></img>
            <div className="d-flex mx-3" style={{columnGap: "1rem"}}>
                <i className="fa fa-comment" style={{cursor: "pointer"}} onClick={CommentToggle}> Comment({count})</i>
                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
            </div>
            {
                openComment && 
                <>
                    <div className="d-flex flex-column justify-content-between align-items-start px-3 py-3" style={{overflowY: 'scroll',rowGap: "0.7rem",maxHeight: "200px"}}>
                    {commentList.map(cmt => 
                    <div key={cmt._id} className="rounded float-end d-flex flex-column px-1 py-1" style={{rowGap: '0.5rem'}}>
                        <div className="d-flex align-items-center" style={{columnGap: '0.5rem'}}><img src={flower} className="rounded-circle" style={{width: '30px',height: "30px"}}></img> <h6>{cmt.username}</h6></div>
                        <p>{cmt.content}</p>                           
                    </div> 
                    )}

                        {console.log(commentList,count)}
                    {commentList.length !== count && !loading && <button className="btn btn-outline-secondary waves-effect" style={{paddingBottom: "2px", paddingTop: "2px", textAlign: "center", width: "20%" }} onClick={loadComment}> Load More </button>}
                    {loading && <b className="text-center">Loading....</b>}    

                            
                    </div>
                    <form onSubmit={(e) => HandleAddComment(e)} className="d-flex justify-content-between align-items-center px-3 mx-2 comment-form">
                        <input ref={commentContent} className="flex-grow-1" placeholder="Write a comment..."></input>
                        <button className="btn" type="submit"><i className="fa fa-send"></i></button>
                    </form> 
                </>
            }
        </div>
    )
}
