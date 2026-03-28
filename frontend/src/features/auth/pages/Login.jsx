import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail, validatePassword } from "../helpers/auth.validation";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";
import { showToast } from "@/utils/toast.util";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, login } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const validationError = validateEmail(email) || validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };
      await login(payload);
      showToast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      if (err.type === "AUTH_ERROR") {
        setError(err.message);
      } else {
        showToast.error("Something went wrong");
      }
    }
  };

  return (
    <main>
      <div className="form-container">
        <header>
          <h1>Welcome Back</h1>
          <p>Login to your HireMind AI account</p>
        </header>

        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="on"
          noValidate
        >
          {error && (
            <p className="error" aria-live="assertive">
              {error}
            </p>
          )}

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
              autoComplete="username"
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              required
              autoFocus
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
                autoComplete="current-password"
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
            {loading ? "Logging in..." : "Login"}
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
