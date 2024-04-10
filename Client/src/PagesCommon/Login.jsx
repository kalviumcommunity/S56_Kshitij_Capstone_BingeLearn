import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Joi from 'joi'; 

const Login = () => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const RENDER_LINK = 'https://s56-kshitij-capstone-bingelearn.onrender.com';

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  const validateForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: false } }).required(), 
      password: Joi.string().min(6).required(),
    });

    const { error: validationError } = schema.validate({ name, email, password }, { abortEarly: false });

    if (validationError) {
      const errorMessage = validationError.details.map(detail => detail.message).join('. ');
      setError(errorMessage);
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
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const response = await fetch(`${RENDER_LINK}/createUser`, { // Use the RENDER_LINK constant
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, password: trimmedPassword }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User created successfully:', userData);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.error); 
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="center-align">
      <div className={`container ${active ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
            {error && <p className="error-message">{error}</p>} 
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={active ? '' : 'hidden'} onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className={!active ? '' : 'hidden'} onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
