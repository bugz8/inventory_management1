import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      const { user, qrCodeData } = response.data;

      if (user) {
        console.log('Registration successful');
        // Redirect user to the dashboard or specific route
        setRegistrationSuccess(true);
      } else {
        console.log('Registration failed');
        // Display a message or handle failed registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              {registrationSuccess ? (
                <div>
                  <h2>Registration Successful!</h2>
                  <p>Thank you for registering.</p>
                </div>
              ) : (
                <div>
                  <h2 className="card-title text-center mb-4">Registration</h2>
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Email"
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
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary" id="registerButton">Register</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;