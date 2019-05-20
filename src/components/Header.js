import React from 'react';
import HamburgerIcon from './HamburgerIcon';
import Logo from './Logo';
import LogoutStatus from './LogoutStatus';
import WrapperHeader from '../layout/WrapperHeader';

const Header = () => (
  <WrapperHeader>
    <HamburgerIcon />
    <Logo />
    <LogoutStatus />
  </WrapperHeader>
);

export default Header;
