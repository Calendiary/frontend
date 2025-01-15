import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer, NavItem } from './NavbarStyle';
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

const Navigator: React.FC = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavItem to="/" active={location.pathname === '/'}>
        <AiOutlineHome />
      </NavItem>
      <NavItem
        to="/list"
        active={location.pathname === '/list'}
      >
        <AiOutlineUnorderedList />
      </NavItem>
    </NavContainer>
  );
};

export default Navigator;
