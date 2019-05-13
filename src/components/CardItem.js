import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Link } from 'react-router-dom';

const CardItem = ({ id, dateAdded, textFront, textBack }) => {
  return (
    <Link to={`/card/${id}`}>
      <div className="card card__clickable" id={id} role="button" tabIndex="0">
        <div className="card--top">
          {dateAdded && <div>Added: {moment(dateAdded).format('DD MMM YYYY hh:mm')}</div>}
        </div>

        <div className="card--content">
          <div className="card--content-text card--content-textfront">{textFront}</div>
          <div className="card--content-text card--content-textback">{textBack}</div>
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
