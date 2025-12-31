import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpaceBackground } from "../../3D_Asset/space.js";
import { login } from "../../services/auth.js";
import { setToken } from "../../services/api";
import "./login.css";

export default function LoginUser() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const spaceContainerRef = useRef(null);
  const navigate = useNavigate();

  // Toggle panel
  const handleSignIn = (e) => {
    e.preventDefault();
    setIsRegistering(false);
    setError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError("");
  };

  const handleSignInSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {

    const res = await login({ username, password });

    // ⬇️ SIMPAN TOKEN
    setToken(res.token);

    navigate("/admin/", { replace: true });
  } catch (err) {
    setError("Username atau password salah");
  } finally {
    setLoading(false);
  }

};


  // Register handler (belum diaktifkan)
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    alert("Fitur register belum tersedia");
  };

  return (
    <div className="auth-wrapper">
      <div ref={spaceContainerRef} className="space-background-container" />
      <SpaceBackground containerRef={spaceContainerRef} />

      <div className={`container ${isRegistering ? "active" : ""}`}>
        <div className="form-container">

          {/* ===== SIGN UP FORM ===== */}
          <div className="sign-up">
            <form onSubmit={handleSignUpSubmit}>
              <h1>Create Account</h1>
              <input 
                type="text" 
                placeholder="Username" 
                disabled 
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              />
              <input 
                type="password" 
                placeholder="Password" 
                disabled 
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              />
              <button type="submit" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                Sign Up (Coming Soon)
              </button>
            </form>
          </div>

          {/* ===== SIGN IN FORM ===== */}
          <div className="sign-in">
            <form onSubmit={handleSignInSubmit}>
              <h1>Sign In</h1>

              {error && (
                <div style={{
                  color: "#ff4444",
                  backgroundColor: "rgba(255, 68, 68, 0.1)",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  fontSize: "14px"
                }}>
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                disabled={loading}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={loading}
                required
              />

              <Link className="link" to="#">
                Forget Your Password?
              </Link>

              <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        {/* ===== TOGGLE PANELS ===== */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all features</p>
              <button className="hidden" onClick={handleSignIn}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register feature coming soon</p>
              <button className="hidden" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}