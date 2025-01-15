import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer, NavItem } from './NavbarStyle';

const Navigator: React.FC = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavItem to="/" active={location.pathname === '/'}>
        Main
      </NavItem>
      <NavItem
        to="/list"
        active={location.pathname === '/list'}
      >
        List
      </NavItem>
    </NavContainer>
  );
};

export default Navigator;
