import { Link } from "react-router";
import "../auth.form.scss";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1> Register </h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              type="userName"
              placeholder="Enter user name"
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
