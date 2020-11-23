import React, { useState, useEffect } from "react";
import './UserList.css'
import UserService from "../../services/UserService";
import { withRouter } from "react-router-dom";
import AvatarPlaceholder from "../../img/avatar_placeholder.jpg";
import ReactPaginate from 'react-paginate';

function UserList(props) {

    const [users, setUsers] = useState([]);
    const [paginationData, setPaginationData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await UserService.getUserList();
        setUsers(response.data.data);
        setPaginationData(response.data);
    }

    const pageCount = paginationData.total_pages;

    async function handlePageClick({ selected: selectedPage }) {
        const response = await UserService.getUserList(selectedPage + 1);
        setUsers(response.data.data);
        setPaginationData(response.data);
    }

    const removeUser = (id) => {
        UserService.removeUser(id)
            .then(function (response) {
                if (response.status === 204) { // Removed
                    const del = users.filter(user => id !== user.id);
                    setUsers(del);
                    props.showError(null);
                } else {
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const editUser = (id) => {
        props.updateTitle('Edit');
        props.history.push(`/edituser/${id}`);
    }

    const redirectToAddUser = () => {
        props.updateTitle('Add new user');
        props.history.push('/adduser');
    }

    const renderBody = () => {
        if (!users) return (<tr>There are no users</tr>);

        return users?.map(({ id, email, first_name, last_name, avatar }) => {
            return (
                <tr key={id}>
                    <td>{email}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td><img width={35} src={AvatarPlaceholder} alt='User avatar'/></td>
                    <td className='opration'>
                        <button className='btn btn-primary button' onClick={() => editUser(id)}>Edit</button> {"  "}
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
            <button className='add-user-btn button btn btn-primary' onClick={redirectToAddUser}>Add new user</button>
            <table className="table text-left" id='users'>
                <thead className="thead-dark">
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </>
    );
}

export default withRouter(UserList);