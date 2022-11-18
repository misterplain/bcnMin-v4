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
    setOpen(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { authData } = userLogin;

  const [open, setOpen] = useState(false);

  return (
    <header>
      <Navbar key='sm' bg='light' expand='sm' className='mb-3'>
        <Container fluid>
          <Navbar.Brand href='#'>bcnMinimalista</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-sm`}
            onClick={() => {
              open ? setOpen(false) : setOpen(true);
            }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement='end'
            show={open}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                bcnMinimalista
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link as={Link} to='/' onClick={() => setOpen(false)}>
                  Inform
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/connect'
                  onClick={() => setOpen(false)}
                >
                  Connect
                </Nav.Link>
                <Nav.Link as={Link} to='/tech' onClick={() => setOpen(false)}>
                  Tech
                </Nav.Link>
                <Nav.Link as={Link} to='/rescue' onClick={() => setOpen(false)}>
                  Rescue
                </Nav.Link>
                <Nav.Link as={Link} to='/collab' onClick={() => setOpen(false)}>
                  Collab
                </Nav.Link>
                {authData ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/favorites'
                      onClick={() => setOpen(false)}
                    >
                      Favorites
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      to='/logout'
                      onClick={logoutAndRedirect}
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/login'
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Nav.Link>
                  </>
                )}
                {/* <NavDropdown
                  title='Dropdown'
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action4'>
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action5'>
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-success'>Search</Button>
              </Form> */}
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
