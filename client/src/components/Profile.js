import React from 'react';
import flower from './download.jfif';

export default function Profile() {
    return (
        <>
            <div className="col-lg-7 col-md-9 col-10 rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                <div className="d-flex flex-column align-items-center" style={{rowGap: "1rem"}}>
                    <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                        <img src={flower} width={70} height={70} className="rounded-circle"></img>
                        <p className="fw-bold fs-4">Username</p>
                    </div>
                    <div className="col-10">
                        <h3> Posts </h3>
                        <hr style={{border: "1px solid red"}} />
                        <div className="rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                            <img src={flower} className="w-100"></img>
                            <div className="d-flex mx-3" style={{columnGap: "1rem"}}>
                                <i className="fa fa-comment" style={{cursor: "pointer"}}> Comment</i>
                                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
                            </div>      
                        </div>
                        <div className="rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                            <img src={flower} className="w-100"></img>
                            <div className="d-flex mx-3" style={{columnGap: "1rem"}}>
                                <i className="fa fa-comment" style={{cursor: "pointer"}}> Comment</i>
                                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
                            </div>      
                        </div>
                        <div className="rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                            <img src={flower} className="w-100"></img>
                            <div className="d-flex mx-3" style={{columnGap: "1rem"}}>
                                <i className="fa fa-comment" style={{cursor: "pointer"}}> Comment</i>
                                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
                            </div>      
                        </div>
                        <div className="rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
                            <img src={flower} className="w-100"></img>
                            <div className="d-flex mx-3" style={{columnGap: "1rem"}}>
                                <i className="fa fa-comment" style={{cursor: "pointer"}}> Comment</i>
                                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
                            </div>      
                        </div>
                    </div>
                    {/* <a href="#" class="btn btn-outline-dark btn-sm btn-block"> Edit Profile </a> */}
                </div>
            </div>
        </>
    );
}