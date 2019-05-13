import React from 'react';
import { connect } from 'react-redux';

const ActionButton = ({ handleActionButtonPress, hidden, materialIconName = 'add', ...props }) => (
  <div
    className={`actionbutton material-angle ${hidden && 'actionbutton--hidden'}`}
    role="button"
    onClick={handleActionButtonPress}
  >
    <i className="material-icons md-36">{materialIconName}</i>
  </div>
);

const mapStateToProps = state => ({
  hidden: state.appState.showDrawer
});

export default connect(mapStateToProps)(ActionButton);
