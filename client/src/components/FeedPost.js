import React, { useState,useEffect, useRef } from 'react'
import flower from './download.jfif';
import { currentUser } from '../api/User'
import {AddComment, DeletePost, EditPost} from '../api/Post'
import usePost from './usePost';
import EditPostDialog from './EditPostDialog';
export default function FeedPost(props) {
    props = props.post
    
    const [readMore,setReadMore] = useState(false);
    const [openComment,setOpenComment] = useState(false);
    const [commentList,setCommentList] = useState([]);
    const [loading,setloading] = useState(false);
    const [page,setPage] = useState(0);
    const [count,setCount] = useState(props.comment);
    const limit = 3;
    const [openEditPost,setOpenEditPost] = useState(false);
    const [user,setUser] = useState(null);
    const commentContent = useRef("");
    const {DecreaseCount} = usePost();
    const [caption,setCaption] = useState(props.caption)
    const [country,setCountry] = useState(props.country)
    const [city,setCity] = useState(props.city)
    const [state,setState] = useState(props.state)
    
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

    let CheckDuplicate = (idx) => {

        for(let i=0;i<commentList.length;i++){
            if(commentList[i].key === idx){
                return false            
            }
        }
        
        return true;
    }

    let loadComment = async () => {
        setloading(true);
        fetch('http://localhost:7000/api/post/commentList?page='+parseInt(page+1)+'&limit='+limit,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                postId: props._id
            })
        }).then(res => res.json()).then(async(doc) => {
            let temp = commentList;
            doc.map((data) => {
                if(CheckDuplicate(data._id)){
                    let ele = (
                        <div key={data._id} className="rounded float-end d-flex flex-column px-1 py-1" style={{rowGap: '0.5rem'}}>
                            <div className="d-flex align-items-center" style={{columnGap: '0.5rem'}}><img src={flower} className="rounded-circle" style={{width: '30px',height: "30px"}}></img> <h6>{data.username}</h6></div>
                            <p>{data.content}</p>                           
                        </div>
                    )
                    temp.push(ele);
                }
            })
            setCommentList(temp);
            setloading(false);
            setPage(prev => prev + 1)
        })
        
    }

    let CommentToggle = ()=>{
        if(openComment === false){
            if(commentList.length === 0){
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
            if(AddCommentResponse){
                AddCommentResponse.username = user.username;
                let temp = commentList;
                if(CheckDuplicate(AddCommentResponse._id)){
                    let ele = (
                        <div key={AddCommentResponse._id} className="rounded float-end d-flex flex-column px-1 py-1" style={{rowGap: '0.5rem'}}>
                            <div className="d-flex align-items-center" style={{columnGap: '0.5rem'}}><img src={flower} className="rounded-circle" style={{width: '30px',height: "30px"}}></img> <h6>{AddCommentResponse.username}</h6></div>
                            <p>{AddCommentResponse.content}</p>                           
                        </div>
                    )
                    temp.unshift(ele);
                }
                setCommentList(temp);
                setCount(prev => prev + 1);
            }
        }
    }

    let HandleEditPost = async (addCountryPost,addCityPost,addStatePost,descriptionPost) => {
        let Response = await EditPost(addCountryPost.current.value,addCityPost.current.value,descriptionPost.current.value,addStatePost.current.value,props._id);
        
        if(Response.status){

            setCaption(descriptionPost.current.value)
            setCountry(addCountryPost.current.value)
            setCity(addCityPost.current.value)
            setState(addStatePost.current.value)
            setOpenEditPost(false)
            window.alert("Edited Successfully")
        }
        else{
            window.alert(Response.message);
            return;
        }
    }

    let HandleDeletePost = async () => {
        let Response = await DeletePost(props._id);
        if(Response.status){
           window.location.reload()
        }
        else{
            window.alert(Response.message);
            return;
        }
    }

    return (
        <div className="main-div col-lg-10 col-md-11 col-12 border-top border-dark rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
            <div className="main-div2 col-12 d-flex flex-column" style={{rowGap: "1rem"}}>
                <div className=" main-div3 d-flex justify-content-between align-items-center px-2" style={{columnGap: "1rem"}}>
                    <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                        <img src={flower} width={70} height={70} className="rounded-circle"></img>
                        <p className="fw-bold fs-4">{props.username}</p>
                    </div>
                    {props.authorId===user?.id && <div className="dropdown align-self-start">
                        <div style={{columnGap: "0.5rem", marginRight: "1rem", paddingLeft: "7rem"}}>
                            <i className="fa fa-ellipsis-v align-self-start"></i>
                        </div> 
                        <div className="dropdown-content">
                            <a onClick={() => setOpenEditPost(true)}><i className="fa fa-edit"></i> Edit</a>
                            <a onClick={HandleDeletePost}><i className="fa fa-trash"></i> Delete</a>
                        </div>
                    </div>}
                </div>
                <div>
                    <p className={"mt-2 w-100 fw-normal "+ (!readMore ? " read-less" : "")}>{caption}</p>
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
                        {commentList.map(cmt => cmt)}    
                        {commentList.length !== count && !loading && <button className="btn btn-outline-secondary waves-effect rounded" style={{borderRadius: "50%", marginLeft: "2%" }} onClick={loadComment}> <i className="fa fa-plus"></i> </button>}
                        {loading && <b className="text-center">Loading....</b>}
                    </div>
                    <form onSubmit={(e) => HandleAddComment(e)} className="d-flex justify-content-between align-items-center px-3 mx-2 comment-form">
                        <input ref={commentContent} className="flex-grow-1" placeholder="Write a comment..."></input>
                        <button className="btn" type="submit"><i className="fa fa-send"></i></button>
                    </form> 
                </>
            }
            <EditPostDialog open={openEditPost} oldData={{caption,state,country,city}} close={() => setOpenEditPost(false)} HandleEditPost={(addCountryPost,addCityPost,addStatePost,descriptionPost) => HandleEditPost(addCountryPost,addCityPost,addStatePost,descriptionPost)} />
        </div>
    )
}
