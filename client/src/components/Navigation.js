import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, logout } from '../api/User';

function Navigation(){
    const [user,setUser] = useState(null);

    useEffect(() => {
        const User = currentUser.subscribe((u) => {
            setUser(u);
        });

        return () => {
            User.unsubscribe();
        }
    },[])

    return (
        <>
            <nav className="navbar navbar-light bg-white">
                <div className="container d-flex justify-content-between align-item-center">
                    <h2 className="text-dark"><Link style={{textDecoration: "none"}} to="/">Covid Help</Link></h2>

                    {user !== null ? <Link className="" type="submit" to="/profile" style={{textDecoration: "none",}}>
                    <i className="fa fa-user" style={{padding: ".7rem 1rem", borderRadius: "50%", color: "#fff", backgroundColor: "#dc3545"}}></i></Link> : 
                    <p className="text-dark p-0 m-0" ><Link to="/login">Login</Link> / <Link to="/signup">Register</Link></p>}
                </div>
            </nav>
        </>
    )
}

export default Navigation;