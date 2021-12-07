import { Form, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./LoginPage.scss";
import AccountAPI from "../../API/ModuleAPI/AccountAPI";
import * as AccountActions from "../../Redux/Actions/AccountActions";
import { connect } from "react-redux";

const LoginPage = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingClass, setIsLoadingClass] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    document.title = "Login to system";
    getAccountByToken(localStorage.token);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, [props.account]);

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

  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const sendLogin = async (e) => {
    e.preventDefault();
    const params = {
      emailAddress: emailAddress,
      password: password,
    };
    setIsLoadingClass("d-flex");
    setTimeout(() => {
      setIsLoadingClass("");
    }, 1000);
    try {
      const response = await AccountAPI.login(params);
      localStorage.token = response.token;
      props.setAccountFromToken(response.token);
      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    } catch (error) {
      window.alert("Login fail");
    }
  };

  return (
    <div className="login-wrapper">
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
      <Form onSubmit={sendLogin}>
        <div className="header-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={handleEmailAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={handlePassword}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </div>
        <div className="footer-form">
          <Button variant="" type="submit" className="btn btn-submit-login">
            Submit
          </Button>
          <Link
            to={`/register`}
            variant=""
            type="button"
            className="btn btn-redirect-register"
          >
            Register
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
export default connect(mapInProps, dispatchToProps)(LoginPage);
