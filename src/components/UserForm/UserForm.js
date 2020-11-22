import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { withRouter } from "react-router-dom";

function UserForm(props) {
    const [state , setState] = useState({
        name : "",
        job : "",
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
        if (state.name.length && state.job.length) {
            props.showError(null);

            const payload = {
                "name": state.name,
                "job": state.job,
            };

            UserService.addNewUser(payload)
                .then(function (response) {
                    if (response.status === 201 || response.status === 200) { // Created success
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'New user added successfully, redirect to user list..'
                        }))
                        console.log('Added user: ', response.data);
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
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="name"
                           className="form-control"
                           id="name"
                           placeholder="Enter name"
                           value={state.name}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputJob">Job</label>
                    <input type="job"
                           className="form-control"
                           id="job"
                           placeholder="Job"
                           value={state.job}
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