import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../auth.form.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <header>
          <h1>Welcome Back</h1>
          <p>Login to your HireMind AI account</p>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {/* EMAIL */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                className="input"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                className="eye"
                onClick={togglePassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
