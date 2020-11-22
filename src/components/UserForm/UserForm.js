import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { withRouter } from "react-router-dom";

function UserForm(props) {
    const [state , setState] = useState({
        email : "",
        firstName : "",
        lastName : "",
        successMessage: null
    })

    const handleChange = (e) => {
        console.log('entra en handle change');
        const {id , value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }

    const sendDetailsToServer = () => {
        if (state.firstName.length && state.lastName.length && state.email.length) {
            props.showError(null);

            const payload = {
                "email": state.email,
                "firstName": state.firstName,
                "lastName": state.lastName,
            };

            UserService.addNewUser(payload)
                .then(function (response) {
                    if (response.status === 201 || response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'New user added successfully, redirect to user list..'
                        }))
                        console.log('Added user: ', response.data);
                        redirectToHome();
                        props.showError(null);
                    } else if (response.code === 400) {
                        console.log('print error:', response);
                        props.showError(response.data.error);
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log('entra en error de register');
                    console.log(error);
                });
        } else {
            props.showError('Error occurred');
        }
    };

    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/home');
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer();
        } else {
            props.showError('Passwords do not match');
        }
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail">Email</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputFirstName">First name</label>
                    <input type="firstName"
                           className="form-control"
                           id="firstName"
                           placeholder="Enter first name"
                           value={state.firstName}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputLastName">Last name</label>
                    <input type="lastName"
                           className="form-control"
                           id="lastName"
                           placeholder="Enter last name"
                           value={state.lastName}
                           onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Save user
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    );
}

export default withRouter(UserForm);