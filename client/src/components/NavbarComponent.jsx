import { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "../public/profile.png";
import { Nav, Navbar, Image } from "react-bootstrap";

class NavbarComponent extends Component {
  state = {};
  render() {
    return (
      <div className="appNavbar">
        <Navbar expand="lg">
          <Navbar.Brand href="#home" className="logoName">
            SwiftDesk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              {/* <Link to="/invoices" className="nav-link">
                Invoices
              </Link> */}
              <Link to="/inventory" className="nav-link">
                Inventory
              </Link>
              <Image src={Avatar} className="avatar navbarItem" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
