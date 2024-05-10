import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Joi from 'joi';
import Navigation from '../PagesTeach/Navigation'; 

const Login = () => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const RENDER_LINK = 'https://s56-kshitij-capstone-bingelearn.onrender.com';

  const handleRegisterClick = () => {
    setActive(true);
    setError('');
    setSuccessMessage('');
  };

  const handleLoginClick = () => {
    setActive(false);
    setError('');
    setSuccessMessage('');
  };

  const validateForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[0-9])')).message('Password must include at least one number.')
        .pattern(new RegExp('^(?=.*[a-zA-Z])')).message('Password must include at least one letter.')
        .required()
        .messages({
          'string.empty': 'Password cannot be empty.',
          'string.min': 'Password must be at least 8 characters long.',
          'any.required': 'Password is required.'
        })
    });

    const { error } = schema.validate({ name, email, password }, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join('. ');
      setError(errorMessage);
      setPassword('');
      return false;
    }

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userType = sessionStorage.getItem('userType');
      let url = '';

      if (userType === 'teacher') {
        url = `${RENDER_LINK}/createTeacher`;
      } else if (userType === 'student') {
        url = `${RENDER_LINK}/createUser`;
      } else {
        setError('Invalid user type');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setSuccessMessage('User created successfully. Please login.');
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        setActive(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setPassword('');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
      setPassword('');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setError('Email and password are required.');
      setPassword('');
      return;
    }

    try {
      const userType = sessionStorage.getItem('userType');
      let url = '';

      if (userType === 'teacher') {
        url = `${RENDER_LINK}/loginTeacher`;
      } else if (userType === 'student') {
        url = `${RENDER_LINK}/loginUser`;
      } else {
        setError('Invalid user type');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setSuccessMessage('Login successful.');
        setEmail('');
        setPassword('');
        setError('');
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setPassword('');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
      setPassword('');
    }
  };

  // Redirect to Navigation component if isLoggedIn is true
  if (isLoggedIn) {
    return <Navigation />;
  }

  return (
    <div className="center-align">
      <div className={`container ${active ? 'active' : ''}`}>
        {/* Sign-up form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a> */}
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a> */}
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a> */}
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
        {/* Sign-in form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a> */}
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a> */}
              {/* <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a> */}
            </div>
            <span>or use your email and password</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={active ? '' : 'hidden'} onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details and start journey with us</p>
              <button className={!active ? '' : 'hidden'} onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
