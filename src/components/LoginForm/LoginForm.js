import './LoginForm.css';
import React, {useState} from 'react';
import UserService from '../../services/UserService';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        /*const payload = {
            "email": state.email,
            "password": state.password,
        }*/
        const payload = { // TODO: set correct values
            "email": 'eve.holt@reqres.in',
            "password": 'cityslicka',
        }
        UserService.login(payload)
            .then(function (response) {
                if (response.status === 200 || response.status === 204) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem('reqres_token', response.data.token);
                    redirectToHome();
                    props.showError(null)
                }
                else if (response.code === 204) {
                    props.showError("Username and password do not match");
                }
                else if (response.code === 400) {
                    props.showError(response.data.error);
                }
                else {
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }

    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="card rounded shadow shadow-sm">
                                <div className="card-header">
                                    <h3 className="mb-0">Login</h3>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form form-group text-left">
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
                                        <div className="form-check">
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg float-right"
                                            onClick={handleSubmitClick}
                                        >Submit</button>
                                    </form>
                                    <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                                        {state.successMessage}
                                    </div>
                                    <div className="registerMessage">
                                        <span>Don't have an account? </span>
                                        <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);