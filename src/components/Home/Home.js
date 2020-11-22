import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/api';
import axios from 'axios'
function Home(props) {

    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);