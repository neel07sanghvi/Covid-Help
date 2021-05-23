import React , {useRef} from 'react';
import { Link } from 'react-router-dom';
import { SignupAuthentication } from '../api/User';

export default function Signup() {
    // const { HandleQuery } = 
    const password = useRef("");
    const confirm_password = useRef("");
    const username = useRef("");
    const name = useRef("");
    const email = useRef("");
    const mobile = useRef("");

    let HandleSignUp = async () => {
        if(password.current.value === "" || confirm_password.current.value === "" || username.current.value === "" || name.current.value === "" || email.current.value === "" || mobile.current.value === "") 
        {
            window.alert("Every Field is required");
            return;
        }

        let addPostresponse = await SignupAuthentication(password.current.value, username.current.value, name.current.value, email.current.value, mobile.current.value);

        password.current.value = "";
        username.current.value = "";
        name.current.value = "";
        email.current.value = "";
        mobile.current.value = "";
        
        let message = "Registration Done Successfully...";
        if(!addPostresponse){
            message = "Ooops! Something went wrong.";
        }
        window.alert(message);
    }
    return (
        <>
            <form className="col-lg-6 col-md-6 col-10 mx-auto my-5 px-3 py-5 shadow d-flex flex-column align-items-center justify-content-between" style={{rowGap: "1rem" , overflowX: "hidden"}}
                onSubmit={(e) => {e.preventDefault();}}>
                <div className="container">
                    <Link to="/"><i className="fa fa-arrow-left"></i></Link>
                </div>
                <h3>Sign Up</h3>
                <div className="form-row d-flex flex-column align-items-center justify-content-between container" style={{rowGap: "0.5rem"}}>
                    <div className="form-group">
                        <label for="inputEmail4" className="active p-2">Full Name</label>
                        <input type="text" className="form-control" id="inputEmail4" placeholder="Name" />
                    </div>
                    <div className="form-group ">
                        <label for="inputEmail4" className="active p-2">User Name</label>
                        <input type="text" className="form-control" id="inputEmail4" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label for="inputEmail4" className="active p-2">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumber" className="active p-2">Phone Number</label>
                        <input type="number" className="form-control" id="inputNumber" placeholder="Phone number" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword4" className="active p-2">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword4" className="active p-2">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Confirm Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={HandleSignUp}>Sign up</button>
                </div>
                <p> Already a member ? <Link to="/login"> Sign In </Link></p>
            </form> 
        </>
    );
};