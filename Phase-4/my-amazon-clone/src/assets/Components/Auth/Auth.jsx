import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../../DataContext/DataContext";
import { Type } from "../../../Utility/action.type";
// named import በመጠቀም
import { ClipLoader } from "react-spinners";
import "./Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ከ ProtectedRoute የተላከ Message ካለ ለመቀበል
  const navStateData = location.state;

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setLoading({ ...loading, signIn: true });
      setError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });

      setLoading({ ...loading, signIn: false });

      // ወደ ነበረበት ገጽ Redirect ማድረጊያ (ወይም ወደ Home)
      navigate(navStateData?.redirect || "/");
    } catch (err) {
      setError(err.message);
      setLoading({ ...loading, signIn: false });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setLoading({ ...loading, signUp: true });
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });

      setLoading({ ...loading, signUp: false });
      navigate(navStateData?.redirect || "/");
    } catch (err) {
      setError(err.message);
      setLoading({ ...loading, signUp: false });
    }
  };

  return (
    <section className="login">
      {/* Amazon Logo */}
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        {/* 🟢 ProtectedRoute የመጣ Redirect Message ካለ እዚህ ያሳያል */}
        {navStateData?.msg && (
          <small
            style={{
              padding: "8px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              display: "block",
              backgroundColor: "#ffe6e6",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            {navStateData.msg}
          </small>
        )}

        {/* 🔴 የ Auth Error (የኢሜይል/ፓስወርድ ስህተት) ካለ እዚህ ያሳያል */}
        {error && <small className="login__error">{error}</small>}

        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tsegish@gmail.com"
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <button
            type="submit"
            onClick={handleSignIn}
            className="login__signInButton"
            disabled={loading.signIn}
          >
            {loading.signIn ? (
              <ClipLoader color="#00ffdd" size={15} />
            ) : (
              "Signing In"
            )}
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Fake Store Conditions of Use and
          Privacy Notice.
        </p>

        <button onClick={handleSignUp} className="login__registerButton">
          {loading.signUp ? (
            <ClipLoader color="#111" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
