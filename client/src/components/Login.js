import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <> 
        
            <form className="col-lg-6 col-md-6 col-10 mx-auto my-5 px-3 py-5 shadow d-flex flex-column align-items-center justify-content-between" style={{rowGap: "1rem"}}>
                <h3>Log in</h3>
                <div className="form-row d-flex flex-column align-items-center justify-content-between container" style={{rowGap: "0.5rem"}}>
                    <div className="form-group ">
                        <label for="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                    </div>
                    <div className="form-group ">
                        <label for="inputNumber">Phone Number</label>
                        <input type="number" className="form-control" id="inputNumber" placeholder="Phone number" />
                    </div>
                    <div className="form-group ">
                        <label for="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
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