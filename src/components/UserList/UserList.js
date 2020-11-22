import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { withRouter } from "react-router-dom";
import AvatarPlaceholder from "../../img/avatar_placeholder.jpg";

function UserList(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await UserService.getUserList();
        setUsers(response.data);
    }

    const removeUser = (id) => {
        UserService.removeUser(id)
            .then(function (response) {
                if (response.status === 204) { // Removed
                    //Remove from the list
                    console.log('remove user:', id);
                    const del = users.filter(user => id !== user.id);
                    setUsers(del);
                    props.showError(null);
                } else if (response.code === 400) {
                    console.log('print error:', response);
                    props.showError(response.data.error);
                } else {
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log('error removing the element');
                console.log(error);
            });

        /*axios.delete(`${URL}/${id}`).then(res => {
            const del = users.filter(user => id !== user.id)
            setUsers(del)
        })*/
    }

    const redirectToEdit = (id) => {
        props.updateTitle('Edit')
        props.history.push('/edit');
    }

    const redirectToAddUser = (id) => {
        props.updateTitle('Add new user');
        props.history.push('/adduser');
    }

    const renderBody = () => {
        return users?.data?.map(({ id, email, first_name, last_name, avatar }) => {
            return (
                <tr key={id}>
                    <td>{email}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td><img width={35} src={AvatarPlaceholder} alt='User avatar'/></td>
                    <td className='opration'>
                        <button className='btn btn-primary button' onClick={() => redirectToEdit(id)}>Edit</button> {"  "}
                        <button className='btn btn-danger button' onClick={() => removeUser(id)}>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    const renderHeader = () => {
        const headerElement = ['Email', 'First name', 'Last name', 'Avatar', 'Actions'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    return (
        <>
            <h1 id='title'>User list</h1>
            <button className='button btn btn-primary' onClick={() => redirectToAddUser()}>Add new user</button>
            <table className="table" id='users'>
                <thead className="thead-dark">
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    );
}

export default withRouter(UserList);