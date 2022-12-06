import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
  Button,
  Form,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { logout } from "../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const userDetails = useSelector((state) => state.userDetails);
  const { userData } = userDetails;
  const { accessToken } = useSelector((state) => state.userLogin);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  //   const handleClose = () => setShow(false);

  const logoutAndRedirect = () => {
    dispatch(logout(accessToken));
    navigate("/login");
    setShow(false);
  };

  return (
    <header>
      <Navbar bg='light' expand={"sm"} className='mb-3' collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href='#'>bcnMinimalista</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-sm`}
            onSelect={handleShow}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                bcnMinimalista
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Link to='/' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/' style={{ color: "green" }}>
                    Inform
                  </Nav.Link>
                </Link>
                <Link to='/connect' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/connect' style={{ color: "green" }}>
                    Connect
                  </Nav.Link>
                </Link>
                <Link to='/tech' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/tech' style={{ color: "green" }}>
                    Tech
                  </Nav.Link>
                </Link>
                <Link to='/rescue' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/rescue' style={{ color: "green" }}>
                    Rescue
                  </Nav.Link>
                </Link>
                <Link to='/collab' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/collab' style={{ color: "green" }}>
                    Collab
                  </Nav.Link>
                </Link>
                {userData ? (
                  <>
                    <Link to='/favorites' style={{ textDecoration: "none" }}>
                      <Nav.Link href='/favorites' style={{ color: "purple" }}>
                        Favorites
                      </Nav.Link>
                    </Link>
                    <Link to='/logout' style={{ textDecoration: "none" }}>
                      <Nav.Link
                        href='/logout'
                        onClick={() => logoutAndRedirect()}
                        style={{ color: "purple" }}
                      >
                        Logout
                      </Nav.Link>
                    </Link>
                  </>
                ) : (
                  <Link to='/login' style={{ textDecoration: "none" }}>
                    <Nav.Link href='/login' style={{ color: "purple" }}>
                      Login
                    </Nav.Link>
                  </Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </header>
  );
};

export default Header;
