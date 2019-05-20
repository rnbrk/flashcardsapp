import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ displayText, numDone, numTotal, numFailed }) => {
  const percentageDone = (numDone / numTotal) * 100;
  const percentageFailed = (numFailed / numTotal) * 100;

  return (
    <div className="progress-bar" data-label={displayText}>
      <span className="progress-bar__done" style={{ width: `${percentageDone}%` }} />
      <span className="progress-bar__failed" style={{ width: `${percentageFailed}%` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numDone: PropTypes.number.isRequired,
  numTotal: PropTypes.number.isRequired,
  numFailed: PropTypes.number
};

ProgressBar.defaultProps = {
  displayText: '',
  numFailed: 0
};

export default ProgressBar;
