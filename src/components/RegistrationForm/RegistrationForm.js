import './RegistrationForm.css';
import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id , value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);

            const payload = {
                "email": state.email,
                "password": state.password,
            };

            UserService.register(payload)
                .then(function (response) {
                    if (response.status === 201 || response.status === 200) { // Created success
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem('reqres_token', response.data.token);
                        redirectToHome();
                        props.showError(null)
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
            props.showError('Please enter valid username and password');
        }
    }

    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/home');
    }

    const redirectToLogin = () => {
        props.updateTitle('Login');
        props.history.push('/login');
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
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex flex-column justify-content-center">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="card rounded shadow shadow-sm">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group text-left">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email"
                                                   className="form-control"
                                                   id="email"
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter email"
                                                   value={state.email}
                                                   onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group text-left">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password"
                                                   className="form-control"
                                                   id="password"
                                                   placeholder="Password"
                                                   value={state.password}
                                                   onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group text-left">
                                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                            <input type="password"
                                                   className="form-control"
                                                   id="confirmPassword"
                                                   placeholder="Confirm Password"
                                                   value={state.confirmPassword}
                                                   onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg float-right"
                                            onClick={handleSubmitClick}
                                        >Register</button>
                                    </form>
                                    <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                                        {state.successMessage}
                                    </div>
                                    <div className="loginMessage">
                                        <span>Already have an account? </span>
                                        <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(RegistrationForm);