import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import AppointmentForm from '../layouts/Appointment/AppointmentForm';
import RegisterForm from '../layouts/Register/RegisterForm';

const AppNavbar = () => {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
            React Bootstrap Navbar
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavItem>
                <NavLink as={Link} to="/appointment">
                    Appointment
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink as={Link} to="/register">
                    Register
                </NavLink>
                </NavItem>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Route exact path="/appointment" component={AppointmentForm} />
        <Route path="/register" component={RegisterForm} />
      </BrowserRouter>
    );
  };

export default AppNavbar;