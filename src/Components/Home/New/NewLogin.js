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

  // matching the password and send it to the sessionstroage then took the sessionStroage id for update status logout to login then want to findOne in the backend that password, number and if it is login then sessionStroage data seting and login(prive route login getting sesseion stroage data then inter)
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
        `http://localhost:5000/getAuthData?phoneNumber=${
          info?.phoneNumber
        }&password=${info?.password}&status=${"login"}`
      );
      const data = await response.json();
      setLoginData(data);

      // if (!loginData.length) {
      //   setError("login failed");
      // }
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

  //status change after login successfully
  useEffect(() => {
    //getting the id from sessionStorage
    const loginData = sessionStorage.getItem("data");
    const dataObj = loginData ? JSON.parse(loginData)[0] : null;
    const id = dataObj ? dataObj._id : null;

    const status = {
      value: "login",
    };

    async function updateUserStatus() {
      try {
        const response = await fetch(`http://localhost:5000/userStatus/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        });
        const result = await response.json();
        if (result) {
          console.log("updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      updateUserStatus();
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
