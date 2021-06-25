import React, { useEffect, useRef, useState }  from 'react';
import flower from './download.jfif';
import FeedPost from './FeedPost';
import usePost from './usePost';
import { currentUser } from '../api/User';
import { AddPost, getUserPost } from '../api/Post';


export default function Profile() {
    const [user,setUser] = useState(null);
    const [posts,setPosts] = useState("loading");
    const description = useRef("");
    const addCountry = useRef("");
    const addState = useRef("");
    const addCity = useRef("");

    useEffect(() => {
        const User = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            User.unsubscribe();
        }
    },[])

    useEffect(async () => {
        if(user){
            let getPost = await getUserPost(user.id);
            if(getPost.status){
                setPosts(getPost.data);
            }else{
                setPosts([]);
            }
        }
        
    },[user])

    let HandleAddPost = async () => {

        if(user === null)
        {
            window.location = "/login";
            return;
        }

        if(description.current.value === "" || addCountry.current.value === "" || addState.current.value === "" || addCity.current.value === "")
        {
            window.alert("Every Field is required");
            return;
        }

        let addPostresponse = await AddPost(description.current.value , addCountry.current.value , addState.current.value , addCity.current.value,user.id)
        description.current.value = "";
        addCountry.current.value = "";
        addCity.current.value = "";
        addState.current.value = "";
        let ResponseStatus = true;
        let message = "Post Added Sucessfully...";
        if(!addPostresponse){
            ResponseStatus = false
            message = "Ooops! Something went wrong.";
        }
        window.alert(message);
        if(ResponseStatus){
            window.location.reload()
        }
    }
    
    return (
        <>
            {/* <div className="col-lg-7 col-md-9 col-10 rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                <div className="d-flex flex-column align-items-center" style={{rowGap: "1rem"}}>
                    <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                        <img src={flower} width={70} height={70} className="rounded-circle"></img>
                        <p className="fw-bold fs-4">username</p>
                    </div>
                    <div className="col-10">
                        <h3> Posts </h3>
                        <hr style={{border: "1px solid red"}} />
                        <div className="mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
                            {list.length ? list.map((pst,idx)=> <FeedPost key={idx} post={pst} />) : ''}
                            {loading && <div className="mt-5 mb-5 text-center"><strong>Loading.....</strong></div>}
                            <div className="d-flex justify-content-center align-items-center">
                            {(list.length!==count && !loading) && <button className="btn btn-outline-secondary waves-effect" style={{paddingBottom: "5px", paddingTop: "5px", textAlign: "center", width: "80%" }} onClick={UpdatePage}> Load More </button>}    
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="col-lg-10 col-md-11 col-12 mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
                {posts !== "loading" ? 
                    posts.map((post,idx) => 
                        
                        <FeedPost key={idx} post={post} />
                        
                    )
                    :
                    <strong>Loading....</strong>
                }
            </div>
            { (user !== null) && <button type="button" className="btn btn-danger rounded-circle position-fixed" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{right: "7%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            }
            <div className="modal fade myModal" id="staticBackdrop" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-dialog modal-dialog-centered" style={{pointerEvents: 'auto'}}>
                        <form className="mx-auto d-grid" style={{rowGap: "0.5rem"}}>
                            <label>Description</label>
                            <textarea rows="5" ref={description} required></textarea>
                            {/* <label>Image</label>
                            <input type="file"></input> */}
                            <label>Country</label>
                            <input ref={addCountry} required></input>
                            <label>State</label>
                            <input ref={addState} required></input>
                            <label>City</label>
                            <input ref={addCity} required></input>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="AddPostBtn" className="btn btn-primary" onClick={HandleAddPost}>Post</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}