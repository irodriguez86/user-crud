import React from 'react';
import UserForm from "../UserForm/UserForm";

function AddUserForm(props) {

    const addUser = (data) => {
        console.log('add user:', data);
    }

    return (
        <UserForm showError = {props.showError} updateTitle = {props.updateTitle} action = {addUser} />
    )
}

export default AddUserForm;