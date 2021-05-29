import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, logout } from '../api/User';
import flower from './download.jfif';

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
                    <h2 className="text-dark"><Link to="/" style={{textDecoration: "none"}}>Covid Help</Link></h2>

                    {user !== null ? 
                        <div className="dropdown">
                            <div className="d-flex align-items-center" style={{columnGap: "0.5rem", marginRight: "1rem"}}>
                                {/* <i className="fa fa-user-circle-o"></i> */}
                                <img src={flower} width={25} height={25} className="rounded-circle"></img>
                                {/* <p>{user.username}</p> */}
                            </div> 
                             <div className="dropdown-content align-items-left">
                                    <a href="/profile"><i className="fa fa-user-circle-o"></i> Profile</a>
                                    <a onClick={logout}><i className="fa fa-sign-out"></i> Logout</a>
                            </div>
                        </div>
                    : 
                    <p className="text-dark p-0 m-0" ><Link to="/login">Login</Link> / <Link to="/signup">Register</Link></p>}
                    
                </div>
            </nav>
        </>
    )
}

export default Navigation;