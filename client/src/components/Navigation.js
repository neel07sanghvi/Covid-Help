import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return (
        <>
        <nav className="navbar navbar-light bg-white">
            <div className="container d-flex justify-content-between align-item-center">
                <h2 className="text-dark">Covid Help</h2>
                <p className="text-dark p-0 m-0"><Link to="/login">Login</Link> / <Link to="/signup">Register</Link></p>
            </div>
        </nav>
        </>
    )
}

export default Navigation;