import React from 'react';
import { connect } from 'react-redux';

const WrapperNavDrawer = ({ children, showDrawer }) => (
  <nav className={`drawer material ${showDrawer && 'drawer--checked'}`}>{children}</nav>
);

const mapStateToProps = state => ({
  showDrawer: state.appState.showDrawer
});

export default connect(mapStateToProps)(WrapperNavDrawer);
