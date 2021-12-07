import "./HomePage.scss";
import { useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
  Form,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/fontawesome-free-solid";
import ListItems from "../../Components/ListItems/ListItems";
import * as TimeActions from "../../Redux/Actions/TimeActions";
import * as AccountActions from "../../Redux/Actions/AccountActions";
import { connect } from "react-redux";

const HomePage = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    document.title = "Home Page";
    getNowDate();
    getAccountByToken(localStorage.token);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, [props.account]);

  const checkLogin = () => {
    if (!props.account.fullName) {
      navigate(location.state?.from?.pathname || "/login");
    }
  };
  const getAccountByToken = (token) => {
    if (token) {
      props.setAccountFromToken(token);
    }
  };
  const getNowDate = () => {
    props.getCurrentDate();
  };

  const dateChange = (e) => {
    props.setSelectDate(e.target.value);
  };

  const sigOut = (e) => {
    localStorage.removeItem("token");
  };
  return (
    <div className="home-wrapper">
      <Navbar bg="" expand="" className="nav-color-bg">
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="btn btn-menu-top"
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Form>
            <Form.Group className="mb-3" controlId="formSortDate">
              <Form.Control
                type="date"
                value={props.nowDate}
                onChange={dateChange}
              />
            </Form.Group>
          </Form>
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-account">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                {props.account.fullName}
              </Dropdown.Item>
              <Dropdown.Item href="/" onClick={sigOut}>
                SigOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <ListItems />
    </div>
  );
};
const mapInProps = (state) => {
  return {
    account: state.AccountReducer,
    nowDate: state.TimeReducer,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    getCurrentDate: () => {
      dispatch(TimeActions.getCurrentDate());
    },
    setSelectDate: (date) => {
      dispatch(TimeActions.setSelectDate(date));
    },
    setAccountFromToken: (token) => {
      dispatch(AccountActions.setAccountFromToken(token));
    },
  };
};
export default connect(mapInProps, dispatchToProps)(HomePage);
