import React, { useRef } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { login } from '../api/User';

export default function Login() {

    const usernameOREmail = useRef("");
    const password = useRef("");

    let HandleLogin = (e) => {
        e.preventDefault();
        let loginResponse = login(usernameOREmail.current.value,password.current.value).then(data => {
            if(data.status){
                window.location = "/"
            }
            else{
                window.alert(data.message);
                usernameOREmail.current.value = "";
                password.current.value = "";
            }
        })
    }


    return (
        <> 
            <form onSubmit={(e) => HandleLogin(e)} className="col-lg-6 col-md-6 col-10 mx-auto my-5 px-3 py-5 shadow d-flex flex-column align-items-center justify-content-between" style={{rowGap: "1rem" , overflowX: "hidden"}}>
                <div className="container">
                    <Link to="/"><i className="fa fa-arrow-left"></i></Link>
                </div>
                <h3>Log In</h3>
                <div className="form-row d-flex flex-column align-items-center justify-content-between container" style={{rowGap: "0.5rem"}}>
                    <div className="form-group ">
                        <label for="inputEmail4">Username or Email</label>
                        <input type="text" required className="form-control" id="inputEmail4" ref={usernameOREmail} placeholder="Username or Email" />
                    </div>
                    <div className="form-group ">
                        <label for="inputPassword4">Password</label>
                        <input type="password" required className="form-control" id="inputPassword4" ref={password} placeholder="Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mt-4">Sign in</button>
                </div>
                <p> Create a new account ? <Link to="/signup"> Sign Up </Link></p>
            </form> 
        </>
    );
}