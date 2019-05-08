import React from 'react';
import { connect } from 'react-redux';
import { startLogout as startLogoutAction } from '../actions/auth';

const UserStatus = ({ startLogout }) => (
  <div className="loginbar">
    <div>Logged in.</div>

    <button type="button" onClick={startLogout}>
      Logout
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogoutAction())
});

export default connect(
  undefined,
  mapDispatchToProps
)(UserStatus);
