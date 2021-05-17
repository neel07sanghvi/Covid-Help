import React , {useState , useEffect, useRef} from 'react';
import FeedPost from './FeedPost';
import {slice , concat} from 'lodash';
import { GetPost } from '../api/Post';
import usePost from './usePost';


    

function Feed() {
   

    const {loading,list,count,page,HandleQuery,UpdatePage} = usePost()
    
    const country = useRef("");
    const state = useRef("");
    const city = useRef("");
    
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
             
            <button className="btn btn-danger rounded-circle position-fixed" style={{left: "90%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            
        </>
    )
}

export default Feed;