import React, { useState } from 'react'
import flower from './download.jfif';

export default function FeedPost(props) {
    props = props.post
    const [readMore,setReadMore] = useState(false);

    let Toggler = () => {
        setReadMore(!readMore);
    }

    return (
        <div className="col-lg-10 col-md-11 col-12 border-top border-dark rounded shadow bg-white mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
            <div className="col-12 d-flex flex-column" style={{rowGap: "1rem"}}>
                <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                    <img src={flower} width={70} height={70} className="rounded-circle border border-info border-3"></img>
                    <p className="fw-bold fs-4">{props.authorId.username}</p>
                </div>
                <p>
                    <p className={"mt-2 w-100 fw-normal "+ (!readMore ? " read-less" : "")}>{props.caption}</p>
                    <p onClick={Toggler} style={{color:"blue", cursor:"pointer", textDecoration:"underline"}}>{readMore ? "less" : "more"}</p>
                </p>
            </div>
            <img src={flower} className="w-100"></img>
            <div className="d-flex" style={{columnGap: "1rem"}}>
                <i className="fa fa-comment" style={{cursor: "pointer"}}> Comment</i>
                <i className="fa fa-share" style={{cursor: "pointer"}}> Share</i>
            </div>
        </div>
    )
}
