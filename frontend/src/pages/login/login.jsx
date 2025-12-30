import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { SpaceBackground } from '../../3D_Asset/space.js';
import './login.css';

export default function LoginUser() {
    
    const [isRegistering, setIsRegistering] = useState(false);
    const spaceContainerRef = useRef(null);
  
    // Handlers that prevent form submission
    const handleToggleSignIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsRegistering(false);
    };

    const handleToggleSignUp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsRegistering(true);
    };

    const handleSignInSubmit = (e) => {
      e.preventDefault();
      // Add your sign in logic here
      console.log('Sign in submitted');
    };

    const handleSignUpSubmit = (e) => {
      e.preventDefault();
      // Add your sign up logic here
      console.log('Sign up submitted');
    };
    
    return (
        <div className="auth-wrapper">
          <div ref={spaceContainerRef} className="space-background-container" />
          <SpaceBackground containerRef={spaceContainerRef} />
          <div className={`container ${isRegistering ? 'active' : ''}`}>
            <div className="form-container">
              <div className="sign-up">
                  <form onSubmit={handleSignUpSubmit}>
                  <h1>Create Account</h1>
                  
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button type="submit">Sign Up</button>
                  </form>
              </div>
            
            <div className="sign-in">
              <form onSubmit={handleSignInSubmit}>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <Link type="forgot" className="link">
                  Forget Your Password?
              </Link>
                <button type="submit">Sign In</button>
              </form>
            </div>
          </div>
            <div className="toggle-container">
              <div className="toggle">
                <div className="toggle-panel toggle-left">
                  <h1>Welcome Back!</h1>
                  <p>Enter your personal details to use all of site features</p>
                  <button
                    className="hidden"
                    type="button"
                    onMouseDown={handleToggleSignIn}
                  >
                    Sign In
                  </button>
                </div>
                <div className="toggle-panel toggle-right">
                  <h1>Hello, Friend!</h1>
                  <p>
                    Register with your personal details to use all of site features
                  </p>
                  <button
                    className="hidden"
                    type="button"
                    onMouseDown={handleToggleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}