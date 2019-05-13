import React from 'react';
import { connect } from 'react-redux';

const WrapperPageContent = ({ children, showDrawer }) => (
  <main className={`page-content ${showDrawer && 'checked'}`}>{children}</main>
);

const mapStateToProps = state => ({
  showDrawer: state.appState.showDrawer
});

export default connect(mapStateToProps)(WrapperPageContent);
