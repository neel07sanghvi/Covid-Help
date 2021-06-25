import React, { useRef } from 'react'
import {Dialog,DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
export default function EditPostDialog(props) {


    const descriptionPost = useRef(props.caption)
    const addCountryPost = useRef(props.country)
    const addStatePost = useRef(props.state)
    const addCityPost = useRef(props.city)
    return (
        <Dialog open={props.open} fullWidth onClose={props.close}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <div className="modal-dialog modal-dialog-centered" style={{pointerEvents: 'auto'}}>
                    <form className="mx-auto d-grid" style={{rowGap: "0.5rem"}}>
                        <label>Description</label>
                        <textarea className="px-2 py-1" rows="5" ref={descriptionPost} defaultValue={props.oldData.caption} required></textarea>
                        {/* <label>Image</label>
                        <input type="file"></input>  */}
                        <label>Country</label>
                        <input className="px-2 py-1" defaultValue={props.oldData.country} ref={addCountryPost} required></input>
                        <label>State</label>
                        <input className="px-2 py-1" defaultValue={props.oldData.state} ref={addStatePost} required></input>
                        <label>City</label>
                        <input className="px-2 py-1" ref={addCityPost} defaultValue={props.oldData.city} required></input>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-secondary" onClick={() => props.close()}>Close</button>
                <button className="btn btn-primary" onClick={() => props.HandleEditPost(addCountryPost,addCityPost,addStatePost,descriptionPost)}>Edit Post</button>
            </DialogActions>
        </Dialog>
    )
}
