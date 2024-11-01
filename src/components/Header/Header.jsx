import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import GenreDropdown from './GenreDropdown';
import SearchBar from './SearchBar';
import logo from '../../images/logo.png';
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';
import { PiUserRectangleThin } from "react-icons/pi";

const Header = () => {
  const { token, role, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-light shadow-sm head">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
          <img src={logo} alt="Логотип" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <SearchBar /> 
            <GenreDropdown /> 
          </Nav>
          {token ? (
            <>
              <Nav.Link as={Link} to="/user/profile" className="btn button-header">
                <PiUserRectangleThin className="user-logo" />
              </Nav.Link>
              <Nav.Link as={Link} to="/" onClick={logout} className="btn button-header">
                <IoLogOutOutline className='log-in' />
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login" className="btn button-header">
              <IoLogInOutline className='log-in' />
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
