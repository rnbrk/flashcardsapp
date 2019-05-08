import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Link } from 'react-router-dom';

const CardItem = ({ id, dateAdded, textFront, textBack }) => {
  return (
    <Link to={`/card/${id}`}>
      <div className="card-container" id={id} role="button" tabIndex="0">
        {dateAdded && <div>Added: {moment(dateAdded).format('DD MMM YYYY hh:mm')}</div>}
        <div>
          <div>{textFront}</div>
          <div>{textBack}</div>
        </div>
      </div>
    </Link>
  );
};

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
  dateAdded: PropTypes.number,
  textFront: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textBack: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CardItem.defaultProps = {
  dateAdded: undefined,
  textFront: '',
  textBack: ''
};

export default CardItem;
