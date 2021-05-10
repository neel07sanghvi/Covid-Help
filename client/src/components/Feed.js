import React , {useState , useEffect} from 'react';
import FeedPost from './FeedPost';
import {slice , concat} from 'lodash';
import { GetPost } from '../api/Post';

const LENGTH = 50;
const DATA = [ ...Array(LENGTH).keys() ];
const LIMIT = 3;
    

function Feed() {
    const [showMore,setShowMore] = useState(true);
    const [List,setList] = useState([]);
    const [index,setIndex] = useState(LIMIT);

    useEffect(async () => {
        const Getpost = await GetPost();
        setList(Getpost)
    }, [])
  
    const loadMore = () =>{
      const newIndex = index + LIMIT;
      const newShowMore = newIndex < (LENGTH - 1);
      const newList = concat(List, slice(DATA, index, newIndex));
      setIndex(newIndex);
      setList(newList);
      setShowMore(newShowMore);
    }
    return (
        <> 
            <div className="col-lg-10 col-md-11 col-12 mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
                <div className="image-container">
                    {List.length && List.map((pst)=> <FeedPost key={pst.authorId} post={pst} />)}
                </div>
                <div className="d-flex justify-content-center align-items-center">
                {showMore && <button className="btn btn-outline-secondary waves-effect" style={{paddingBottom: "5px", paddingTop: "5px", textAlign: "center", width: "30%" }} onClick={loadMore}> Load More </button>}    
                </div>
            </div>
             
            <button className="btn btn-danger rounded-circle position-sticky" style={{left: "90%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            
        </>
    )
}

export default Feed;
// import React from 'react';
// import FeedPost from './FeedPost';

// function Feed() {
//     return (
//         <> 
//             <div className="col-lg-10 col-md-11 col-12 mx-auto p-2 container d-flex flex-column" style={{rowGap:"1rem"}}>
//                 <FeedPost></FeedPost>
//                 <FeedPost></FeedPost>
//                 <FeedPost></FeedPost>
//                 <FeedPost></FeedPost>    
//             </div>
             
//             <button className="btn btn-danger rounded-circle position-sticky" style={{left: "90%", bottom: "10%"}}> <i className="fa fa-plus"></i> </button>
            
//         </>
//     )
// }

// export default Feed;