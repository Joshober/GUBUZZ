import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import "../Sass/LoginComponent.scss";

export default function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await LoginAPI(credentials.email, credentials.password);
      await localStorage.setItem("userEmail", res.user.email);
      await localStorage.setItem("userID", res.user.id);
      console.log(res.user.email)
      toast.success("Signed In Successfully!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    } finally {
      setLoading(false);
    }
  };
  const handleBrightspaceSignIn = async () => {
    try {
      setLoading(true);
      // Initiate Brightspace authentication
    } catch (error) {
      console.error("Error signing in with Brightspace:", error);
      toast.error("Failed to sign in with Brightspace");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="login-wrapper">

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on what's going on around campus!</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
        
        <button onClick={handleBrightspaceSignIn} className="login-btn brightspace-btn">
          Sign in with Brightspace
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to Hive?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
