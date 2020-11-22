import React from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const Error404 = (props) => {

    return (
        <div>
            <h2>404 page</h2>
            <p>Return to <Link to="/home">Home Page</Link></p>
        </div>
    )
}
export default withRouter(Error404);