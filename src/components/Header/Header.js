import React from 'react';
import { withRouter } from "react-router-dom";
function Header(props) {
    let title = props.location.pathname.substring(1, props.location.pathname.length);
    if (props.location.pathname === '/') {
        title = 'Welcome';
    }

    function renderLogout() {
        if (props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }

    function handleLogout() {
        localStorage.removeItem('reqres_token');
        props.history.push('/login');
    }

    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3 text-capitalize">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);