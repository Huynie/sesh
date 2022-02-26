import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default function Navigation () {
  return (
    <Navbar color="light" light>
      <NavbarBrand href="/">Home</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink href="/map">Map</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}