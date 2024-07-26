// src/components/NavbarStyle.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiMenuAltRight, BiMenu } from 'react-icons/bi';

export const Nav = styled.nav`
  background-color: #004085; /* Navy blue color */
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${(props) => props.ss}px) {
    padding: 0 20px;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  column-gap: 20px;

  @media screen and (max-width: ${(props) => props.ss}px) {
    width: 100%;
    padding: 20px;
    flex-direction: column;
    background-color: #004085;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: ${(props) => (props.toggleMenu ? '1' : '-1')};
    transform: translateY(-100%) scale(0);
    transition: transform 0.3s ease-in-out, z-index 0.3s ease 0.5s;
    animation: ${(props) => (props.toggleMenu ? 'menuOpen 0.5s forwards' : '')};

    @keyframes menuOpen {
      0% {
        transform: translateY(-100%) scale(0);
      }
      50% {
        transform: translateY(-50%) scale(0.5);
      }
      100% {
        transform: translateY(0%) scale(1);
      }
    }
  }
`;

export const MenuItems = styled.li`
  @media screen and (max-width: ${(props) => props.ss}px) {
    opacity: ${(props) => (props.toggleMenu ? '1' : '0')};
    transition: opacity 1s ease-in;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc107; /* Amber color on hover */
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #ffc107;
    transition: transform 0.3s ease;
  }

  &:before {
    top: 0;
    left: 0;
    transform: scaleX(0);
  }

  &:after {
    bottom: 0;
    right: 0;
    transform: scaleX(0);
  }

  &:hover:before,
  &:hover:after {
    transform: scaleX(1);
  }
`;

export const MobileMenuContainer = styled.div`
  width: 22px;
  height: 28px;
  display: ${(props) => (props.menu ? 'grid' : 'none')};
  place-items: center;
  cursor: pointer;
`;

export const MobileMenu = styled(BiMenuAltRight)`
  font-size: 28px;
  color: #fff;
`;

export const MobileMenuHover = styled(BiMenu)`
  font-size: 28px;
  color: #ffc107;
  position: absolute;
  transform: translateX(50%);
  transform-origin: left;
  transition: transform 0.3s ease-out;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc107; /* Amber color on hover */
  }

  @media screen and (max-width: ${(props) => props.ss}px) {
    text-align: left;
  }
`;
