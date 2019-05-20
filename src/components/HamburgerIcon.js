import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/appState';

const HamburgerSVG = () => (
  <svg
    className="hamburger-icon__svg"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const CloseSVG = () => (
  <svg
    className="hamburger-icon__svg"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const HamburgerIcon = ({ showDrawer, toggleMenu }) => (
  <div className="hamburger-icon" onClick={toggleMenu}>
    {showDrawer ? <CloseSVG /> : <HamburgerSVG />}
  </div>
);

const mapStateToProps = state => ({
  showDrawer: state.appState.showDrawer
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleDrawer())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HamburgerIcon);
