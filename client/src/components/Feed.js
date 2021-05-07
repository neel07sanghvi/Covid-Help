import React from 'react';
import flower from './download.jfif';
import FeedPost from './FeedPost';

function Feed() {
    return (
        <> 
            <div className="col-lg-10 col-md-11 col-12 mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
                <FeedPost></FeedPost>
                <FeedPost></FeedPost>
                <FeedPost></FeedPost>
                <FeedPost></FeedPost>    
            </div>
             
            <button className="btn btn-danger rounded-circle position-sticky" style={{left: "95%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            
        </>
    )
}

export default Feed;