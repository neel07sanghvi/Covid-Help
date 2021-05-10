import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    return (
        <>
            <form className="col-10 form-inline text-center justify-content-center align-items-center" style={{height: "70vh", width: "70vw"}}>
                <h3>Sign Up</h3>
                <div class="form-row d-flex">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div class="form-row d-flex">
                    <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip" />
                    </div>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary mt-4">Sign up</button>
                </div>
                <p> Already a member ? <Link to="/login"> Sign In </Link></p>
            </form>

        </>
    );
}