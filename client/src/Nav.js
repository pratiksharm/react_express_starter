import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Anchor} from 'grommet'
import {
  Home, 
  Notification,
  Analytics,
  Login
} from 'grommet-icons';

const NavBar = () => {
    return (
      <Nav direction="row" background="white" pad="small" border="bottom">
        <Link to="/">
            <Anchor icon={<Login />} hoverIndicator />
        </Link>
        <Link to="/dashboard">
            <Anchor icon={<Home />} hoverIndicator/>
        </Link>
        <Link to="/form">
            <Anchor icon={<Notification />} hoverIndicator />
        </Link>
        <Link to="/analysis">
            <Anchor icon={<Analytics />} hoverIndicator />
        </Link>
  </Nav>
    )
}


export default NavBar;

