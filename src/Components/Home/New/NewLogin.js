import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./New.css";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const NewLogin = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const [loginData, setLoginData] = useState([]);
  // react router dom path detect and go there
  let history = useHistory();

  // sign with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value,
    };

    //getting data accoring to the input data from backend
    try {
      setLoading(true);
      const response = await fetch(
        `https://server.gynecologybooks.org/getAuthData?phoneNumber=${info?.phoneNumber}&password=${info?.password}`
      );
      const data = await response.json();
      setLoginData(data);
      if (!loginData.length) {
        setError("login failed");
      }
    } catch (error) {
      console.log("err", error);
    }
    setLoading(false);
  };

  //setting data to the localstore and push it to the home page
  useEffect(() => {
    if (loginData.length) {
      sessionStorage.setItem("data", JSON.stringify(loginData));
      history.push("/home");
    }
  }, [history, loginData]);

  //eye for password
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <section className="auth_background">
      <div className="container login_form">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="PhoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="PhoneNumber"
              aria-describedby="PhoneNumber"
              ref={phoneNumberRef}
              required
              placeholder="Type your phone number"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <span className="password_input">
              <input
                type={type}
                className="form-control"
                id="exampleInputPassword1"
                ref={passwordRef}
                required
                placeholder="Type your password"
              />
              <span onClick={handleToggle} className="eye_icon">
                <Icon icon={icon} size={25} />
              </span>
            </span>
          </div>
          <h5 className="error mb-3">{error}</h5>
          <button type="submit" className="btn auth_btn d-grid mx-auto w-100">
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="login_footer">
          <Link to="/forgotPassword" className="forgot_link">
            Forgot Password?
          </Link>
          <Link to="/signUp" className="btn auth_btn">
            Sign Up <i className="bi bi-person-add"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewLogin;
