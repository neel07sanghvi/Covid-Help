import React, { useState } from 'react'
import flower from './download.jfif';

export default function FeedPost() {

    const [readMore,setReadMore] = useState(false);

    let Toggler = () => {
        setReadMore(!readMore);
    }

    return (
        <div className="col-lg-10 col-md-11 col-12 shadow mt-2 mb-3 mx-auto p-2 d-flex flex-column justify-content-between" style={{rowGap: '1rem'}}>
            <div className="col-12 d-flex flex-column" style={{rowGap: "1rem"}}>
                <div className="d-flex align-items-center" style={{columnGap: "1rem"}}>
                    <img src={flower} width={70} height={70} className="rounded-circle border border-info border-3"></img>
                    <p>Username</p>
                </div>
                <p>
                    <p className={"mt-2 w-100"+ (!readMore ? " read-less" : "")}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <p onClick={Toggler} style={{color:"blue", cursor:"pointer", textDecoration:"underline"}}>{readMore ? "less" : "more"}</p>
                </p>
            </div>
            <img src={flower} className="w-100"></img>
            <div className="d-flex" style={{columnGap: "1rem"}}>
                <i className="fa fa-comment"> Comment</i>
                <i className="fa fa-share"> Share</i>
            </div>
        </div>
    )
}
