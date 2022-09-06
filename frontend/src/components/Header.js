import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { logout } from "../actions/userActions";

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
  const { userInfo } = userLogin;

  const [open, setOpen] = useState(false);

  return (
    <header>
      <Navbar bg='light' expand='md' expanded={open}>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            bcnMinimalista
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            onClick={() => {
              open ? setOpen(false) : setOpen(true);
            }}
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/' onClick={() => setOpen(false)}>
                Inform
              </Nav.Link>
              <Nav.Link as={Link} to='/connect' onClick={() => setOpen(false)}>
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
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                {userInfo ? (
                  <>
                    <NavDropdown.Item href='#action/3.4'>
                      <Nav.Link
                        as={Link}
                        to='/favorites'
                        onClick={() => setOpen(false)}
                      >
                        Favorites
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action/3.4'>
                      <Nav.Link
                        as={Link}
                        to='/logout'
                        onClick={logoutAndRedirect}
                      >
                        Logout
                      </Nav.Link>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href='#action/3.2'>
                      <Nav.Link
                        as={Link}
                        to='/login'
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action/3.2'>
                      <Nav.Link
                        as={Link}
                        to='/register'
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Nav.Link>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </header>
  );
};

export default Header;
