import React from "react";
import { Link } from "react-router-dom";
import "./New.css";

const FrontPage = () => {
  return (
    <section className="front_page_background">
      <div className="button_auth">
        <Link to="/login" className="btn auth_btn">
          Login/Register <i className="bi bi-chevron-double-right"></i>
        </Link>
      </div>
    </section>
  );
};

export default FrontPage;
