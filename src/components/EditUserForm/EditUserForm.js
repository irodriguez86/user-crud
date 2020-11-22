import React from 'react';
import UserForm from "../UserForm/UserForm";

function EditUserForm(props) {

    const editUser = (data) => {
        console.log('edit user:', data);
    }

    return (
        <UserForm showError = {props.showError} updateTitle = {props.updateTitle} formAction = {editUser} />
    )
}

export default EditUserForm;