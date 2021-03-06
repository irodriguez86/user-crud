import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserService from "../../services/UserService";
import UserList from "../UserList/UserList";

function Home(props) {
    useEffect(() => {
        UserService.getUserList(1)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('data en home', response.data);
                }
            })
            .catch(function (error) {
                console.log('error en home', error);
            });
    });

    return(
        <div className="mt-2">
            <UserList showError = {props.showError} updateTitle = {props.updateTitle}/>
        </div>
    )
}

export default withRouter(Home);