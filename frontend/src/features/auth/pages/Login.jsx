import { Link } from "react-router";
import "../auth.form.scss";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1> Login </h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>

        <p>
          Don't have an account?<Link to={"/register"}> Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
