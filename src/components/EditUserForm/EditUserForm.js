import React from 'react';
import UserForm from "../UserForm/UserForm";
import UserService from "../../services/UserService";
import { useParams } from "react-router-dom";

function EditUserForm(props) {
    const {id} = useParams();

    const req = UserService.getUser(id);

    req.then(res => {
        if (res.status === 200) {
            console.log('status 200');
        }
        console.log('daaata', res.data);
    });

    const editUser = (data) => {
        console.log('edit user:', data);
    }

    return (
        <UserForm showError = {props.showError} updateTitle = {props.updateTitle} formAction = {editUser}/>
    )
}

export default EditUserForm;