import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {" "}
            <Link
              to="/"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              E-Comm
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto nav_wrapper">
            {localStorage.getItem("user-info") ? (
              <>
                <Link to="/">Product List</Link>
                <Link to="/add">Add Product</Link>
                {/* <Link to="/update">Update Product</Link> */}
                <Link to="/search">Search Product</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </Nav>
          {localStorage.getItem("user-info") && (
            <Nav>
              <NavDropdown title={user && user.name}>
                {/* <NavDropdown.Item>Profile</NavDropdown.Item> */}
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
