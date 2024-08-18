import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiError } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRegistration() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);

    const firstNameRegex = /^[a-zA-Z.\s]+$/;
    if (value.length < 2) {
      setErrors({
        ...errors,
        firstname: "First name must be at least 2 characters long",
      });
    } else if (!firstNameRegex.test(value)) {
      setErrors({
        ...errors,
        firstname: "First name must contain only letters",
      });
    } else {
      setErrors({ ...errors, firstname: "" });
    }
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    setLastName(value);

    const lastNameRegex = /^[a-zA-Z.\s]+$/;

    if (value.length < 2) {
      setErrors({
        ...errors,
        lastname: "Last name must be at least 2 characters long",
      });
    } else if (!lastNameRegex.test(value)) {
      setErrors({ ...errors, lastname: "Last name must contain only letters" });
    } else {
      setErrors({ ...errors, lastname: "" });
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(value)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    // Validate password using regex
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors({
        ...errors,
        password:
          "Must have 8 char with UC, LC, digit, and special char",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setErrors("");
  };

  // submit function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check for errors before submitting the form
  //   if (Object.keys(errors).length === 0) {
  //     // Submit the form
  //     console.log("Form submitted successfully");
  //   } else {
  //     // Display error messages and prevent form submission
  //     console.log("Form submission prevented due to validation errors");
  //   }

  //   try {
  //     const response = await fetch(`${window.location.origin}/api/register`, {
  //       method: "POST",
  //       body: JSON.stringify({ firstname, lastname, email, password }),
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     });
  //     // Log the response status
  //     // console.log("Response Status:", response.status);
  //     const result = await response.json();
  //     console.log("Response Data:", result);

  //     if (response.ok) {
  //       toast.success(
  //         "Congratulations! You've registered to the portal successfully!"
  //       );

  //       // reset the fields on successful submission
  //       handleReset();

  //       // direct them to the login page now
  //       setTimeout(()=>{
  //         navigate("/login");
  //       }, 5000)
  //     } else if (response.status === 401) {
  //       console.error("error occured");
  //        handleReset();
  //     } else {
  //       // Handle other errors
  //       const errorMessage = await response.text();
  //       console.error("Error:", errorMessage);
  //       handleReset();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(errors).some(error => error !== "")) {
      toast.error("Please correct the errors before submitting.");
      return;
    }
  
    try {
      // const response = await fetch(`http://localhost:1000/api/register`,{
      // const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/register`,{
      const response = await fetch(`${window.location.origin}/api/register`,{
        method: "POST",
        body: JSON.stringify({ firstname, lastname, email, password }),
        headers: {
          "Content-type": "application/json", 
        },
      });
      console.log("API URL:", `${window.location.origin}/api/register`);
      const result = await response.json();
      console.log("Response Data:", result);
  
      if (response.ok) {
        toast.success("Congratulations! You've registered to the portal successfully!");
        handleReset();
        setTimeout(() => navigate("/login"), 3000);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message || 'An unexpected error occurred'}`);
      handleReset();
    }
  };

  return (
    <>
      <div className="container-fluid" id="register">
        <ToastContainer />
          <h1> User Registration</h1>
          <Link to="/">
            <button
              type="button"
              style={{ margin: "2px", fontSize: "small", padding: "5px" }}
            >
              Homepage
            </button>
          </Link>

        <div id="form">
          <form onSubmit={handleSubmit}>
            <div className="OneDiv">
              <label
                htmlFor="exampleInput"
                className="form-label fs-6 fs-lg-4 fs-md-3 fs-sm-2"
              >
                First Name
                <input
                  type="text"
                  className="form-control form-control-lg form-control-sm"
                  placeholder="Enter your name here"
                  value={firstname}
                  id="firstname"
                  required
                  autoComplete="off"
                  onChange={handleFirstNameChange}
                />
              </label>
              <p className="error one">
                {errors.firstname && (
                  <>
                    <BiError /> {errors.firstname}
                  </>
                )}
              </p>
            </div>

            <div className="TwoDiv">
              <label
                htmlFor="exampleInput"
                className="form-label fs-6 fs-lg-4 fs-md-3 fs-sm-2"
              >
                Last Name
                <input
                  type="text"
                  className="form-control form-control-lg form-control-sm"
                  placeholder="Enter your surname here"
                  value={lastname}
                  id="lastname"
                  required
                  autoComplete="off"
                  onChange={handleLastNameChange}
                />
              </label>
              <p className="error two">
                {errors.lastname && (
                  <>
                    <BiError /> {errors.lastname}
                  </>
                )}
              </p>
            </div>

            <div className="ThreeDiv">
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
              <p className="error three">
                {errors.email && (
                  <>
                    <BiError /> {errors.email}
                  </>
                )}
              </p>
            </div>

            <div className="FourDiv">
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

              <p style={{ marginTop: "12px" }} className="error four">
                {errors.password && (
                  <>
                    <BiError /> {errors.password}
                  </>
                )}
              </p>
            </div>

            <div id="userRegis-btncontainer">
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password-button"
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>{" "}
              &nbsp;
              <button
                style={{ marginRight: "11px" }}
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="Submit"> Register </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;

