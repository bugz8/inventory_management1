import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });

    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/login', formData);
        const { approved, user } = response.data;

        if (approved) {
          console.log('Login successful');
          // Redirect user to the dashboard or specific route
        } else {
          console.log('Login failed');
          // Display a message or handle failed login
          setLoginFailed(true);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Reset loginFailed state when the user starts typing again
        setLoginFailed(false);
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2><br></br>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                {loginFailed && (
                                  <div className="mb-3 text-danger">
                                    Login failed. Please check your username and password.
                                  </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;