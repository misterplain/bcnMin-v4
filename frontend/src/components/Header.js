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


  return (
    <header>
      <Navbar key='sm' bg='light' expand='md' className='mb-3' collapseOnSelect>
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
              <Nav
                className='justify-content-end flex-grow-1 pe-3'
                collapseOnSelect
              >
                <Nav.Link as={Link} to='/' onClick={() => (this.expand = "")}>
                  Inform
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/connect'
                  onClick={() => (this.expand = "")}
                >
                  Connect
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/tech'
                  onClick={() => (this.expand = "")}
                >
                  Tech
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/rescue'
                  onClick={() => (this.expand = "")}
                >
                  Rescue
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/collab'
                  onClick={() => (this.expand = "")}
                >
                  Collab
                </Nav.Link>
                {authData ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/favorites'
                      onClick={() => (this.expand = "")}
                      style={{ color: "purple" }}
                    >
                      Favorites
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      to='/logout'
                      onClick={() => {
                        this.expand = "";
                        logoutAndRedirect();
                      }}
                      style={{ color: "purple" }}
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/login'
                      style={{ color: "purple" }}
                    >
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* <Navbar bg='light' expand={"sm"} className='mb-3' collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href='#'>Navbar Offcanvas</Navbar.Brand>
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
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link href='#action1'>Home</Nav.Link>
                <Nav.Link href='#action2'>Link</Nav.Link>
                <NavDropdown
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
                </NavDropdown>
              </Nav>
              <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-success'>Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar> */}
      <section>
        <Outlet></Outlet>
      </section>
    </header>
  );
};

export default Header;
