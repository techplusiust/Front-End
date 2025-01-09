import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./AuthPage.css";

const AuthPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <Link to="/" className="home-button" aria-label="بازگشت به صفحه اصلی">
          <FaHome size={20} />
        </Link>
        <img
          src="/images/loginPage/login.jpg"
          alt="Illustration"
          className="auth-image"
        />
        <div className="auth-form-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
