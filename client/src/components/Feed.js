import React , {useRef , useState , useEffect} from 'react';
import FeedPost from './FeedPost';
import usePost from './usePost';
import { AddPost, DeletePost } from '../api/Post';
import { currentUser } from '../api/User'
    

function Feed() {
   

    const {loading,list,count,page,HandleQuery,UpdatePage, IncreaseCount} = usePost()
    
    const country = useRef("");
    const state = useRef("");
    const city = useRef("");

   

    const [user,setUser] = useState(null);

    useEffect(() => {
        const Observable = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            Observable.unsubscribe();
        }
    },[])

    

    
    
    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); HandleQuery(country.current.value,state.current.value,city.current.value)}}>
                <div className="form-row align-items-center d-flex col-9 justify-content-center" style={{columnGap: "0.5rem", marginLeft: "16%"}}>
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
            
        </>
    )
}

export default Feed;