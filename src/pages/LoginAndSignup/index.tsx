import { Outlet } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <img
          src="/images/loginPage/login.jpg"
          alt="Illustration"
        />
        <div className="auth-form-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
