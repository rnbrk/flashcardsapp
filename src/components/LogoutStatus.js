import React from 'react';
import { connect } from 'react-redux';
import { startLogout as startLogoutAction } from '../actions/auth';

const LogoutStatus = ({ startLogout }) => (
  <div>
    <button type="button" className="button" onClick={startLogout}>
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
)(LogoutStatus);
