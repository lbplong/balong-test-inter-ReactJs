import "./RegisterPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/fontawesome-free-solid";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountAPI from "../../API/ModuleAPI/AccountAPI";
import * as AccountActions from "../../Redux/Actions/AccountActions";
import { connect } from "react-redux";

const RegisterPage = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [successPassword, setSuccessPassword] = useState(true);
  const [enable, setEnable] = useState(false);

  const [isLoadingClass, setIsLoadingClass] = useState("");

  useEffect(() => {
    document.title = "Register to system";
    getAccountByToken(localStorage.token);
  }, []);

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, [props.account]);

  useEffect(() => {
    registerEnable();
  }, [fullName, emailAddress, password, confirmPassword, username]);

  const checkLogin = () => {
    if (props.account.fullName) {
      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    }
  };

  const getAccountByToken = (token) => {
    if (token) {
      props.setAccountFromToken(token);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (confirmPassword === e.target.value) {
      setSuccessPassword(true);
    } else {
      setSuccessPassword(false);
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setSuccessPassword(true);
    } else {
      setSuccessPassword(false);
    }
  };

  const registerEnable = () => {
    if (
      username === "" ||
      fullName === "" ||
      emailAddress === "" ||
      password === "" ||
      !successPassword
    ) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const params = {
      username: username,
      fullName: fullName,
      emailAddress: emailAddress,
      password: password,
    };
    setIsLoadingClass("d-flex");
    setTimeout(() => {
      setIsLoadingClass("");
    }, 1000);
    try {
      const response = await AccountAPI.register(params);
      if (response.token == null) {
        const message = response.message;
        window.alert(message);
      } else {
        localStorage.token = response.token;
        props.setAccountFromToken(response.token);
        navigate(location.state?.from?.pathname || "/", {
          replace: true,
        });
      }
    } catch (error) {
      window.alert("Register fail");
    }
  };

  return (
    <div className="register-wrapper">
      <div className={`loading-page ${isLoadingClass}`}>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
      <Form onSubmit={register}>
        <div className="header-form">
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              onChange={handleFullName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={handleUsername}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleEmailAddress}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={handleConfirmPassword}
              required
            />
            {successPassword ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : (
              <FontAwesomeIcon icon={faTimes} color="red" />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </div>
        <div className="footer-form">
          <Button
            variant=""
            type="submit"
            className="btn btn-submit-register"
            disabled={enable ? "" : "disabled"}
          >
            Register
          </Button>
          <Link
            to={`/login`}
            variant=""
            type="button"
            className="btn btn-redirect-login"
          >
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};
const mapInProps = (state) => {
  return {
    account: state.AccountReducer,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    setAccountFromToken: (token) => {
      dispatch(AccountActions.setAccountFromToken(token));
    },
  };
};
export default connect(mapInProps, dispatchToProps)(RegisterPage);
