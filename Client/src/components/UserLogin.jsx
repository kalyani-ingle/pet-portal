
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch(`http://localhost:1000/api/login`, {
      // const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`, {
      const response = await fetch(`${window.location.origin}/api/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        const token = Cookies.get("token")
        console.log(`Token cookie: ${token}`);
        setEmail("");
        setPassword("");
        navigate("/pet-register");
      } else {
        toast.error("Credentials do not match. Sign up and proceed!");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid" id="login">
        <Link to="/">
          <button
            className="loginPagebtn"
            type="button"
            style={{ marginTop: "55px", fontSize: "small", padding: "3px" }}
          >
            {" "}
            Homepage
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="exampleInput"
              className="form-label fs-6 fs-lg-4 fs-md-3 fs-sm-2"
            >
              Email
              <input
                type="email"
                className="form-control form-control-lg form-control-sm"
                placeholder="Enter your email here"
                value={email}
                id="email"
                required
                autoComplete="off"
                onChange={handleEmailChange}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="exampleInput"
              className="form-label fs-6 fs-lg-4 fs-md-3 fs-sm-2"
            >
              Password
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg form-control-sm"
                placeholder="Enter password here"
                value={password}
                id="password"
                required
                autoComplete="off"
                onChange={handlePasswordChange}
              />
            </label>
          </div>

          <label className="checkbox-label">
            <input type="checkbox" onClick={togglePassword} /> &nbsp;Show
            Password
          </label>

          <div className="login-btn">
            <button
              style={{ marginRight: "12px", opacity: "0.8" }}
              type="button"
              onClick={handleReset}
            >
              {" "}
              Reset{" "}
            </button>
            <button style={{ opacity: "0.8" }} type="Submit">
              {" "}
              Login{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
