import { add } from 'lodash';
import React , {useRef} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SignupAuthentication } from '../api/User';

export default function Signup() {
    // const { HandleQuery } = 
    const password = useRef("");
    const confirm_password = useRef("");
    const username = useRef("");
    const name = useRef("");
    const email = useRef("");
    const mobile = useRef("");

    let HandleSignUp = async (e) => {
        e.preventDefault();
        if(password.current.value === "" || confirm_password.current.value === "" || username.current.value === "" || name.current.value === "" || email.current.value === "") 
        {
            window.alert("Every Field is required");
            return;
        }

        if(password.current.value !== confirm_password.current.value){
            return window.alert("Password does not match with confirm password")
        }

        let addPostresponse = await SignupAuthentication(password.current.value, username.current.value, name.current.value, email.current.value, mobile.current.value);

        password.current.value = "";
        confirm_password.current.value = "";
        username.current.value = "";
        name.current.value = "";
        email.current.value = "";
        mobile.current.value = "";
        
        let message = addPostresponse?.message;
        
        if(!addPostresponse){
            message = "Ooops! Something went wrong.";
        }
        window.alert(message);
        if(addPostresponse?.status){
            return window.location = '/login'
        }
    }
    return (
        <>
            <form className="col-lg-6 col-md-6 col-10 mx-auto my-5 px-3 py-5 shadow d-flex flex-column align-items-center justify-content-between" style={{rowGap: "1rem" , overflowX: "hidden"}}
                onSubmit={(e) => {HandleSignUp(e)}}>
                <div className="container">
                    <Link to="/"><i className="fa fa-arrow-left"></i></Link>
                </div>
                <h3>Sign Up</h3>
                <div className="form-row d-flex flex-column align-items-center justify-content-between container" style={{rowGap: "0.5rem"}}>
                    <div className="form-group">
                        <label for="inputEmail4" className="active p-2">Full Name</label>
                        <input type="text" ref={name} className="form-control" id="inputEmail4" required placeholder="Name" />
                    </div>
                    <div className="form-group ">
                        <label  className="active p-2">User Name</label>
                        <input type="text" ref={username} className="form-control" required placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label className="active p-2">Email</label>
                        <input type="email" ref={email} className="form-control" required placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumber" className="active p-2">Phone Number</label>
                        <input type="number" ref={mobile} className="form-control" id="inputNumber" placeholder="Phone number" />
                    </div>
                    <div className="form-group">
                        <label className="active p-2">Password</label>
                        <input type="password" ref={password} className="form-control" required placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label  className="active p-2">Confirm Password</label>
                        <input type="password" ref={confirm_password} className="form-control" required placeholder="Confirm Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
                <p> Already a member ? <Link to="/login"> Sign In </Link></p>
            </form> 
        </>
    );
};