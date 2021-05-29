import React , {useRef , useState , useEffect} from 'react';
import FeedPost from './FeedPost';
import usePost from './usePost';
import { AddPost } from '../api/Post';
import { currentUser } from '../api/User'
    

function Feed() {
   

    const {loading,list,count,page,HandleQuery,UpdatePage} = usePost()
    
    const country = useRef("");
    const state = useRef("");
    const city = useRef("");

    const description = useRef("");
    const addCountry = useRef("");
    const addState = useRef("");
    const addCity = useRef("");

    const [user,setUser] = useState(null);

    useEffect(() => {
        const Observable = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            Observable.unsubscribe();
        }
    },[])

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

        let addPostresponse = await AddPost(description.current.value , addCountry.current.value , addState.current.value , addCity.current.value)
        description.current.value = "";
        addCountry.current.value = "";
        addCity.current.value = "";
        addState.current.value = "";

        let message = "Post Added Sucessfully...";
        if(!addPostresponse){
            message = "Ooops! Something went wrong.";
        }
        window.alert(message);
    }
    
    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); HandleQuery(country.current.value,state.current.value,city.current.value)}}>
                <div className="form-row align-items-center d-flex col-9 justify-content-center" style={{columnGap: "0.5rem", marginLeft: "16%",}}>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" ref={country} placeholder="Country"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" ref={state} placeholder="State"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" ref={city} placeholder="City"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <button className="btn btn-primary mt-2" type="submit" >Apply</button>
                    </div>
                </div>
            </form>
            <div className="col-lg-10 col-md-11 col-12 mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
                
                    {list.length ? list.map((pst,idx)=> <FeedPost key={idx} post={pst} />) : ''}
                
                {loading && <div className="mt-5 mb-5 text-center"><strong>Loading.....</strong></div>}

                
                <div className="d-flex justify-content-center align-items-center">
                {(list.length!==count && !loading) && <button className="btn btn-outline-secondary waves-effect" style={{paddingBottom: "5px", paddingTop: "5px", textAlign: "center", width: "30%" }} onClick={UpdatePage}> Load More </button>}    
                </div>
            </div>
            { (user !== null) && <button type="button" className="btn btn-danger rounded-circle position-fixed" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{right: "7%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            }
            <div className="modal fade myModal" id="staticBackdrop" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Post</h5>
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
                        <button type="button" id="AddPostBtn" className="btn btn-primary" onClick={HandleAddPost}>Add Post</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed;