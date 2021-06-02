import React, { useEffect, useState }  from 'react';
import flower from './download.jfif';
import FeedPost from './FeedPost';
import usePost from './usePost';
import { currentUser } from '../api/User';


export default function Profile() {
    const {loading,list,count,UpdatePage} = usePost();
    const [user,setUser] = useState(null);

    useEffect(() => {
        const User = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            User.unsubscribe();
        }
    },[])
    
    return (
        <>
            <div className="col-lg-7 col-md-9 col-10 rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
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
            </div>
        </>
    );
}