import './login.css'

export default function LoginScreen() {
  return (
    <div className="background-login">
      <div className="centered-boxlgn">
        <h1>Login</h1>

        <div className="login-box">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />

          <button className="login-btn">Login</button>
        </div>
      </div>
    </div>
  )
}
