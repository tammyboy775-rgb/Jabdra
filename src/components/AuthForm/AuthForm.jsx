import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "../../icons";
import "./AuthForm.css";

export default function AuthForm({ mode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("Please enter both your username and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const ok = isLogin
        ? login(username, password)
        : register(username, password);

      if (ok) {
        navigate("/", { replace: true });
      } else {
        setError(
          isLogin
            ? "No account found with that username or password."
            : "That username is already taken."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">
            <Icon name="leaf" size={32} />
          </span>
          <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p>
            {isLogin
              ? "Log in to start saving your favourite markets."
              : "Sign up to save your favourite markets and get personalized picks."}
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              autoComplete="username"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={isSubmitting}
          >
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          {" "}
          <Link to={isLogin ? "/register" : "/login"} className="auth-link">
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
    </section>
  );
}
