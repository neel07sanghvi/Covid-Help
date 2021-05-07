import React from 'react';

function Navigation(){
    return (
        <>
        <nav className="navbar navbar-light bg-white">
            <div className="container d-flex justify-content-between align-item-center">
                <h2 className="text-dark">Covid Help</h2>
                <p className="text-dark p-0 m-0"><a>Login</a> / <a>Register</a></p>
            </div>
        </nav>
        </>
    )
}

export default Navigation;