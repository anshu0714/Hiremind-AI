import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../helpers/auth.validation";
import "../auth.form.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, register } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const validationError =
      validateUsername(username) ||
      validateEmail(email) ||
      validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      await register(payload);

      navigate("/");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <main>
      <div className="form-container">
        <header>
          <h1>Create Account</h1>
          <p>Start your AI interview journey</p>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {error && (
            <p className="error" aria-live="assertive">
              {error}
            </p>
          )}

          {/* USERNAME */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              id="username"
              name="username"
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
              required
              autoFocus
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
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
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
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

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
