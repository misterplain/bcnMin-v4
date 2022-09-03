import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import {logout} from '../actions/userActions'



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const logoutAndRedirect = () => {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <header>
      <Navbar bg='light' expand='sm' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            bcnMinimalista
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto' style={{ marginRight: "0px" }}>
              <Nav.Link as={Link} to='/'>
                Inform
              </Nav.Link>
              <Nav.Link as={Link} to='/connect'>
                Connect
              </Nav.Link>
              <Nav.Link as={Link} to='/reduce'>
                Reduce
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
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.2'>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  <Nav.Link as={Link} to='/register'>
                    Register
                  </Nav.Link>
                </NavDropdown.Item>

                <NavDropdown.Item href='#action/3.4'>
                  <Nav.Link as={Link} to='/favorites'>
                    Favorite
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  <Nav.Link as={Link} to='/logout' onClick={logoutAndRedirect}>
                    Logout
                  </Nav.Link>
                </NavDropdown.Item>
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
