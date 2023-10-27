import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const GetStartedPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  
const handleBackButtonClick = () => {
    setShowRegister(false);
    setShowLogin(true);
};

const handleRegistrationSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div class="container mt-5 text-center">
    <div class="row">
        <h1>Welcome to Virtual Time Capsule!</h1>
    </div>
    <div class="row mt-5">
        <div class="col">               
             <h3>Your Memories, Your Future</h3>
             <div class="row d-flex justify-content-center">
                <div class="col"> 
                  {!showLogin && !showRegister && (
                    <button class="btn btn-primary" onClick={handleGetStartedClick}>Get Started</button>
                  )}
                  {showLogin && <Login onLoginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />}
      {showRegister && <Register onRegistrationSuccess={handleRegistrationSuccess} onBackButtonClick={handleBackButtonClick} />}
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <img class="img-fluid" src="lifespan.jpg" alt="logo"/>
        </div>
    </div>
</div>
  );
};

export default GetStartedPage;