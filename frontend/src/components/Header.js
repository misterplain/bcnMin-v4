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

  const logoutAndRedirect = () => {
    dispatch(logout());
    navigate("/login");
    setShow(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { authData } = userLogin;

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  //   const handleClose = () => setShow(false);

  return (
    <header>
      {/* <Navbar key='sm' bg='light' expand='md' className='mb-3' collapseOnSelect>
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
            // expand={()=>setShow(true)}
            // onHide={handleClose}

          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                bcnMinimalista
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className='justify-content-end flex-grow-1 pe-3'
                
              >
                <Nav.Link as={Link} to='/' onClick={()=>setShow(false)}>
                  Inform
                </Nav.Link>
                <Nav.Link as={Link} to='/connect'>
                  Connect
                </Nav.Link>
                <Nav.Link as={Link} to='/tech'>
                  Tech
                </Nav.Link>
                <Nav.Link as={Link} to='/rescue'>
                  Rescue
                </Nav.Link>
                <Nav.Link as={Link} to='/collab'>
                  Collab
                </Nav.Link>
                {authData ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/favorites'
                      style={{ color: "purple" }}
                    >
                      Favorites
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      to='/logout'
                      onClick={() => {
                        logoutAndRedirect();
                      }}
                      style={{ color: "purple" }}
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to='/login' style={{ color: "purple" }}>
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar> */}
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
                  <Nav.Link href='/' style={{color: 'green'}}>Inform</Nav.Link>
                </Link>
                <Link to='/connect' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/connect' style={{color: 'green'}}>Connect</Nav.Link>
                </Link>
                <Link to='/tech' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/tech' style={{color: 'green'}}>Tech</Nav.Link>
                </Link>
                <Link to='/rescue' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/rescue' style={{color: 'green'}}>Rescue</Nav.Link>
                </Link>
                <Link to='/collab' style={{ textDecoration: "none" }}>
                  <Nav.Link href='/collab' style={{color: 'green'}}>Collab</Nav.Link>
                </Link>
                {authData ? (
                  <>
                    <Link to='/favorites' style={{ textDecoration: "none" }}>
                      <Nav.Link href='/favorites' style={{color: 'purple'}}>Favorites</Nav.Link>
                    </Link>
                    <Link to='/logout' style={{ textDecoration: "none" }}>
                      <Nav.Link
                        href='/logout'
                        onClick={() => logoutAndRedirect()}
                        style={{color: 'purple'}}
                      >
                        Logout
                      </Nav.Link>
                    </Link>
                  </>
                ) : (
                  <Link to='/login' style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href='/login'
                      style={{ color: "purple" }}
                    >
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
