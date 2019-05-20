import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { withRouter } from 'react-router-dom';

const CardItem = ({ id, dateAdded, textFront, textBack, history }) => {
  return (
    <article
      className="card card--standard-size card--clickable"
      id={id}
      role="button"
      tabIndex="0"
      onClick={() => {
        history.push(`/card/${id}`);
      }}
    >
      <div className="card__top">
        {dateAdded && <div>Added: {moment(dateAdded).format('DD MMM YYYY hh:mm')}</div>}
      </div>

      <div className="card__content">
        <div className="card__content-text card__content-textfront">{textFront}</div>
        <div className="card__content-text card__content-textback">{textBack}</div>
      </div>
    </article>
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

export default withRouter(CardItem);
