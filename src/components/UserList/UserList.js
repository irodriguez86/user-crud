import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";

export default function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const response = await UserService.getUserList();
        setUsers(response.data);
    }

    const removeData = (id) => {

        /*axios.delete(`${URL}/${id}`).then(res => {
            const del = users.filter(user => id !== user.id)
            setUsers(del)
        })*/
    }

    const renderBody = () => {
        console.log('users', users);
        return users && users.data && users.data.map(({ id, email, first_name, last_name, avatar }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{email}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td><img src={avatar} alt='User avatar'/></td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'email', 'first_name', 'last_name', 'avatar', 'Actions']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='users'>
                <thead>
                <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
        </>
    );
}