import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  background-color: #f5f5f5;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000;
`;

export const NavItem = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.active ? '#007bff' : '#666')};
  font-size: 1rem;
  font-weight: ${(props) =>
    props.active ? 'bold' : 'normal'};
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;
