import Link from '@mui/material/Link';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import AuthService from "../services/auth.service";


function Register(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    try {
      await AuthService.register(email, password)
      props.history.push("/home");
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

  };

  return (

    <div className="signup-login__container" >
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Signup</Card.Title>

          <form id="loginform" className="signup-login__form" onSubmit={registerSubmit}>
            <div className="signup-login__form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small>
            </div>
            <div className="signup-login__form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <button type="submit" className="btn btn-primary signup-login__button">
              Signup
            </button>
          </form>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Card.Body>
      </Card>
    </div>

  );
}
export default Register;
