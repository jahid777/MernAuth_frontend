import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./New.css";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);

  // function sendPasswordResetEmail(e) {
  //   e.preventDefault();

  //   emailjs.init("I_YxoiA552ESF4A1N"); // replace with your own public key

  //   emailjs
  //     .send("service_jqrmc5x", "template_56tkxi7", {
  //       //to_email have to write in the emailjs to_email option
  //       to_email: emailRef?.current?.value,
  //       password_reset_link: "http://localhost:3000/reset_password",
  //     })
  //     .then(
  //       (response) => {
  //         setMessage(
  //           "Password reset email sent! Please check your inbox or spam folder."
  //         );
  //         localStorage.setItem("reset_email", emailRef?.current?.value);
  //         emailRef.current.value = "";
  //         sessionStorage.setItem("data", JSON.stringify(""));
  //       },
  //       (error) => {
  //         setError("Something went wrong. Please try again later.");
  //       }
  //     );
  // }

  async function sendPasswordResetEmail(e) {
    e.preventDefault();

    const userEmail = emailRef?.current?.value;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000?email=" + userEmail);
      const data = await response.json();
      const firstEmail = data[0]?.email || "";

      if (userEmail === firstEmail) {
        emailjs.init("I_YxoiA552ESF4A1N"); // replace with your own public key

        emailjs
          .send("service_jqrmc5x", "template_56tkxi7", {
            to_email: userEmail,
            password_reset_link: "https://gynecologybooks.org/reset_password",
          })
          .then(
            (response) => {
              setMessage(
                "Password reset email sent! Please check your inbox or spam folder."
              );
              localStorage.setItem("reset_email", userEmail);
              emailRef.current.value = "";
              sessionStorage.setItem("data", JSON.stringify(""));
            },
            (error) => {
              setError("Something went wrong. Please try again later.");
            }
          );
      } else {
        setError("Invalid email address. Please try again.");
      }
    } catch (error) {
      console.log("err", error);
    }
    setLoading(false);
    // show success/error message for 3 seconds
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 30000);
  }

  return (
    <div className="container my-5">
      <div>
        <h4 className="text-center">Enter Your Gmail</h4>
        <form onSubmit={sendPasswordResetEmail}>
          <div className="forgotPassInput">
            <span className="atTheRate">@</span>
            <input
              type="email"
              ref={emailRef}
              required
              className="form-control forgotInput"
              placeholder="Your Email"
              aria-label="Your Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <button
            type="submit"
            value="Send Password Reset Email"
            className="btn auth_btn mt-2 d-grid mx-auto"
          >
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Send Password Reset Email"
            )}
          </button>
        </form>
      </div>

      {/* Message for user */}
      <p className="success">{message}</p>
      <p className="error">{error}</p>

      <div className="text-center">
        <p>Already have an account ?</p>
        <Link to="/login" className="btn auth_btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
