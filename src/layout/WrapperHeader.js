import React from 'react';
import { connect } from 'react-redux';

const WrapperHeader = ({ children, showDrawer }) => (
  <header className={`header material ${showDrawer && 'checked'}`}>{children}</header>
);

const mapStateToProps = state => ({
  showDrawer: state.appState.showDrawer
});

export default connect(mapStateToProps)(WrapperHeader);
