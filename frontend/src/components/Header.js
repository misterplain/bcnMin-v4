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
                <Nav.Link
                  href='/'
                  onClick={() => navigate("/", { replace: true })}
                >
                  Inform
                </Nav.Link>
                <Nav.Link
                  href='/connect'
                  onClick={() => navigate("/connect", { replace: true })}
                >
                  Connect
                </Nav.Link>
                <Nav.Link href='/tech' onClick={() => navigate("/tech", { replace: true })}>Tech</Nav.Link>
                <Nav.Link href='/rescue' onClick={() => navigate("/rescue", { replace: true })}>Rescue</Nav.Link>
                <Nav.Link href='/collab' onClick={() => navigate("/collab", { replace: true })}>Collab</Nav.Link>
                {authData ? (
                  <>
                    <Nav.Link href='/favorites'  onClick={() => navigate("/favorites", { replace: true })} style={{ color: "purple" }}>
                      Favorites
                    </Nav.Link>
                    <Nav.Link
                      href='/logout'
                      onClick={() => {
                        logoutAndRedirect();
                        navigate("/logout", { replace: true })
                      }}
                      style={{ color: "purple" }}
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                ) : (
                  <>
                    <Nav.Link href='/login' onClick={() => navigate("/login", { replace: true })} style={{ color: "purple" }}>
                      Login
                    </Nav.Link>
                  </>
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
