import React from 'react';

const ActionButton = ({ handleActionButtonPress }) => (
  <div>
    <button type="button" onClick={handleActionButtonPress}>
      +
    </button>
  </div>
);

export default ActionButton;
