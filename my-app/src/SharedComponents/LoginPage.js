import "../SharedCSS/LoginPage.css";
import loginImage from "../images/login_image.png";
import { AiOutlineUser } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../App";
import logoImage from "../images/kauSupportLogo.png";

import { Alert, Space } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [
    userID,
    setUserID,
    userPass,
    setuserPass,
    isLoggedIn,
    setIsLoggedIn,
    setUserRole,
    userRole,
  ] = useContext(LoginContext);

  const [showAlert, setShowAlert] = useState(false);
  const [ShowEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    console.log("inside handel login");
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/UserVerification_/LogIn?User_Id=${userID}&Password=${userPass}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setUserRole(result.role);
        setIsLoggedIn(true);
        navigate("/Home");
      } else if (response.status === 400) {
        setShowAlert(true);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  function checkUserData() {
    if (userPass !== "" && userID !== "") {
      handleLogin();
    } else {
      setShowEmptyFieldAlert(true);
    }
  }

  return (
    <div className="page-container">
      {showAlert && (
        <Alert
          className="report-alert-warning"
          message="Error"
          description="UserID or password is incorrect!"
          type="error"
          showIcon
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
      {ShowEmptyFieldAlert && (
        <Alert
          className="warning-alert"
          message="Please add your userID and password"
          type="warning"
          showIcon
          closable
          onClose={() => setShowEmptyFieldAlert(false)}
        />
      )}

      <div className="container">
        <div className="left">
          <div className="from">
            <h2>Login</h2>

            <label htmlFor="userId" className="userId-lable">
              <AiOutlineUser className="icon" size={24} />
            </label>

            <input
              onChange={(e) => {
                setUserID(e.target.value);
              }}
              type="text"
              className="user-input"
              placeholder="University ID"
            />

            <label htmlFor="userpass" className="userpass-lable">
              <br />
              <FaLock className="icon" size={24} />
            </label>

            <input
              onChange={(e) => {
                setuserPass(e.target.value);
              }}
              type="password"
              className="user-input"
              placeholder="Password"
            />
            <br />
            <a href="">forget password?</a>
            <br />
            <button className="submit-button" onClick={checkUserData}>
              Login
            </button>
          </div>
        </div>

        <div className="right">
          <h1 className="project-title">KAU Support</h1>
          <img src={loginImage} alt="Covering Image" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
