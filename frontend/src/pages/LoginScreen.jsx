

export default function LoginScreen() {
  return (
    <>
      <div className="background">
        <div className="centered-box">
          <h1>Login</h1>
          <ul>
            <input type="text" placeholder='username/email'/>
            <input type="password" placeholder='password'/>
          </ul>
          <button className='LoginButton'>Login</button>
        </div>
      </div>
    </>
  )
}
