import React, { useState } from "react";
import { register } from "./api";

const Register = ({ onRegistrationSuccess, onBackButtonClick }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !userCredentials.username ||
      !userCredentials.password ||
      !userCredentials.email
    ) {
      setError("Username, password, and email are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await register(userCredentials);
      console.log("User registered:", response);

      if (response) {
        setRegistrationSuccess(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="row">
          <h2>Register</h2>
          <form onSubmit={handleRegister} style={{ maxWidth: "400px" }}>
            <label htmlFor="InputUsername" className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              id="InputUsername"
              value={userCredentials.username}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  username: e.target.value,
                })
              }
            />

            <label htmlFor="InputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />

            <label htmlFor="InputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="InputEmail"
              className="form-control"
              value={userCredentials.email}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                })
              }
            />
            <button type="submit" className="m-2 btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        className="m-2 btn btn-secondary"
        onClick={onBackButtonClick}
      >
        Back
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {registrationSuccess && (
        <p>Registration successful! Please go back to login.</p>
      )}
    </div>
  );
};

export default Register;
