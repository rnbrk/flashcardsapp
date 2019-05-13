import React from 'react';
import HamburgerIcon from './HamburgerIcon';
import Logo from './Logo';
import LogoutStatus from './LogoutStatus';
import WrapperHeader from './WrapperHeader';

const Header = () => (
  <WrapperHeader>
    <HamburgerIcon />
    <Logo />
    <LogoutStatus />
  </WrapperHeader>
);

export default Header;
